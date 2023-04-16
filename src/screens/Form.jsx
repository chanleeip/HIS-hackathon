import React, {useCallback, useEffect} from 'react';
import {
  Button,
  Heading,
  HStack,
  Text,
  Image,
  Textarea,
  VStack,
  useToast,
  Link as NativeLink,
} from '@chakra-ui/react';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import marni from './undraw_fingerprint_login_re_t71l.svg';
import hands from './hands.png';

import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  TransactionInstruction,
  Transaction,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';
import {
  IntellectualProperty_Size,
  program_id,
  sha256,
  underscoreGenerator,
} from '../ipr';
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import {Pideas} from "./private_ideas";

export const NewForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [description, setDescription] = useState('');
  const [newNftAddr, setNewNftAddr] = useState(null);
  const [submitting, setSubmitting] = useState(false);;
  const toast = useToast();
  const [the_original_public_key, setPublicKey] = useState("");


// Get the public key for the connected wallet
  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
      );
      setPublicKey(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };
  console.log(the_original_public_key)
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    setSubmitting(true);
    const hash = await sha256(description);
    console.log(hash+"The discription hashing");

    const newAccountPubkey = await PublicKey.createWithSeed(
      publicKey,
      hash.substr(0, 10),
      program_id
    );

    const lamports = await connection.getMinimumBalanceForRentExemption(
      IntellectualProperty_Size
    );

    const instruction = SystemProgram.createAccountWithSeed({
      fromPubkey: publicKey,
      basePubkey: publicKey,
      seed: hash.substr(0, 10),
      newAccountPubkey: newAccountPubkey,
      lamports: lamports,
      space: IntellectualProperty_Size,
      programId: program_id,
    });


    const transaction = new Transaction().add(instruction);
    try {
      const signature = await sendTransaction(transaction, connection);
      console.log('created nft account');
      await connection.confirmTransaction(signature, 'processed');
    } catch (e) {
      toast({
        title: (
          <Text>
            Same idea made by you already exists. Visit{' '}
            <NativeLink href={`/#/nft/${newAccountPubkey.toBase58()}`}>
              here
            </NativeLink>{' '}
            to see your existing NFT.
          </Text>
        ),
        status: 'error',
        isClosable: true,
      });
      setSubmitting(false);
      return;
    }

    const initAccount = new TransactionInstruction({
      programId: program_id,
      keys: [
        { pubkey: newAccountPubkey, isSigner: false, isWritable: true },
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
      ],
      data: Buffer.from(
        Uint8Array.of(
          0,
          ...Array.from(
            new TextEncoder().encode(hash + underscoreGenerator(500))
          )
        )
      ),
    });

    const transaction2 = new Transaction().add(initAccount);
    try {
      const signature2 = await sendTransaction(transaction2, connection);
      await connection.confirmTransaction(signature2, 'processed');
    } catch (e) {
      toast({
        title: (
          <Text>
            Same idea made by you already exists. Visit{' '}
            <NativeLink href={`/#/nft/${newAccountPubkey.toBase58()}`}>
              here
            </NativeLink>{' '}
            to see your existing NFT.
          </Text>
        ),
        status: 'error',
        isClosable: true,
      });
      setSubmitting(false);
      return;
    }

    setNewNftAddr(newAccountPubkey.toBase58());
    console.log(newAccountPubkey.toBase58()+"The original NFT key");
    const better_key = newAccountPubkey.toBase58();
    onOpen();
    setSubmitting(false);

    //For backend
    const response = await fetch('/send_data',{
      method : 'POST',
      headers :{'Content-Type':'application/json'},
      body:JSON.stringify({the_original_public_key, description, better_key})
    });
    const data = await response.json();
    if (data.success){
      console.log("Added Successfully");
    } else{
      console.log("passing Error from Backend");
    }


  }, [publicKey, sendTransaction, connection, description, onOpen, toast]);
  return (
      <>
      <VStack alignItems="start" spacing={20} >
        <HStack width="full" height="full">
          <VStack
            width="full"
            height="full"
            spacing={10}
            alignItems="start"
            alignContent="start"
          >
            <FormControl id="contents" isRequired>
              <FormLabel color="#1B2631" fontSize={35} fontWeight="bold" mb={10} >
                Enter IPR Text to store in your NFT
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Write information to store in NFT.       *** Let the First Line Be Title Always ***"
                fontSize={25}
                value={description}
                onChange={e => {
                  setDescription(e.target.value);
                }}
                height={300}
                width={1000}
                bg="#1B2631"
                color="#D5D8DC"
                fontWeight="bold"
              />
            </FormControl>

            <HStack justify="space-between" width="full">
              <Button
                bg="#1B2631"
                color="white"
                fontSize={20}
                fontWeight="bold"
                p={2}
                _hover={{color:"#1B2631",bg:"white"}}
                onClick={onClick}
                isDisabled={!publicKey || description === '' || submitting}
                isLoading={submitting}
                width='10%'>
                Mint NFT
              </Button>
              <HStack>
                {description === '' && (
                  <HStack
                    p={2}
                    borderColor="#FF5B37"
                    borderWidth={1}
                    borderRadius={10}
                  >
                    <FaExclamationCircle color="#FF5B37" />
                    <Text fontSize="md" color="#FF5B37">
                      Empty description
                    </Text>
                  </HStack>
                )}
                {!publicKey && (
                  <HStack
                    p={2}
                    borderColor="#FF5B37"
                    borderWidth={1}
                    borderRadius={10}
                  >
                    <FaExclamationCircle color="#FF5B37" />
                    <Text fontSize="x-large" color="#FF5B37">
                      Wallet not connected
                    </Text>
                  </HStack>
                )}
              </HStack>
            </HStack>
          </VStack>
          <Image  src={marni}/>
        </HStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="white">
          <ModalBody>
            <VStack py={10} alignItems="start">
              <Text color="black">
                Your NFT Token was successfully created.
              </Text>
              <FormControl
                id="wallet"
                isRequired
                isReadOnly={true}
                borderColor="gray.700"
                width="70%"
              >
                <Input type="email" value={newNftAddr} color="red" />
              </FormControl>
              <HStack width="70%" justify="space-between">
                <Button
                  colorScheme="orange"
                  variant="outline"
                  as={NativeLink}
                  download={newNftAddr + '.json'}
                  href={
                    'data:text/json;charset=utf-8,' +
                    encodeURIComponent(JSON.stringify({description }))
                  }
                >
                  Download Keyfile
                </Button>
                <Button
                  variant="solid"
                  colorScheme="orange"
                  as={Link}
                  to={`/nft/${newNftAddr}`}
                  color="white"
                >
                  See NFT Page
                </Button>
              </HStack>
            </VStack>
            <Image src={hands} position="absolute" right={0} bottom={0} p={2} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <pideas public_key ={the_original_public_key} />
    </>
  );
};

