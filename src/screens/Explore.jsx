import React from 'react';
import { Heading, HStack, Image, VStack, Box, Button } from '@chakra-ui/react';

import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import {
  IntellectualPropertySchema,
  IntellectualProperty,
  program_id,
  stringParser,
  sha256,
} from '../ipr';
import * as borsh from 'borsh';
import { Loader } from './Loader';

export const Explore = () => {
  const [nftDetails, setNftDetails] = useState(null);
  const { connection } = useConnection();
  let date=new Date();
console.log(date);
  useEffect(() => {
    async function getData() {
      const allAccounts = await connection.getProgramAccounts(program_id);
      console.log(allAccounts);
      if (allAccounts === null) {
        setNftDetails([]);
        return;
      }
      let arr = [];
      for (let i = 0; i < allAccounts.length; i++) {
        console.log(allAccounts[i]);
        console.log(allAccounts[i].account);
        var property;
        try {
          property = borsh.deserialize(
              IntellectualPropertySchema,
              IntellectualProperty,
              allAccounts[i].account.data
          );
        } catch (e) {
          continue;
        }
        const parsedData = stringParser(property.uri);
        const isPublic = property.is_public === '1';
        try {
          const obj = JSON.parse(parsedData);
          if (isPublic) {
            arr.push({
              public: isPublic,
              owner: property.property_owner,
              name: isPublic ? obj.name : '',
              description: isPublic ? obj.description : '',
              files: [],
              time: '2 September 2021',
              hash: property.hash,
              verified: isPublic
                  ? property.hash === sha256(JSON.parse(parsedData).description)
                  : false,
              publicKey: allAccounts[i].pubkey.toBase58(),
            });
            console.log(property);
          }
        } catch (e) {
          continue;
        }
      }
      setNftDetails(arr);
    }
    getData();
  }, [connection]);

  return (
      <Box p={10}>
        <HStack width="full" alignItems="center">
          <VStack
              width="full"
              alignItems="start"
              justify="space-between"
              spacing={10}
          >
            <Heading fontSize={50} fontWeight="bold" pb={50}>
              See what everyone is thinking!
            </Heading>
            {!nftDetails && <Loader />}
            {nftDetails &&
                nftDetails.map((v, i, a) => {
                  return (

                      <Button
                          _hover={{
                            background: "blue.500",
                          }}
                          width="100%"
                          variant="ghost"
                          height="400px"
                          bg='#1B2631'
                          backdropFilter='auto'
                          backdropBlur='18px'
                          backdropContrast='75%'
                          borderWidth={2}
                          borderColor='black'
                          borderRadius={10}
                          m={5}
                          key={v.publicKey}
                          onClick={() =>
                              (window.location.href = `/#/nft/${v.publicKey}`)
                          }
                      >
                        <VStack width="full" color="white"  >
                          <HStack pos="absolute" top="20">
                            <FaFile fontSize={30} />
                            <Text fontSize={40} fontWeight="extrabold" >{v.name}</Text>
                          </HStack>
                          <VStack pos="absolute" top="165" left="125">
                             <Text fontWeight="bold" fontSize={35} color="white" >Description</Text>
                            <Box pos="absolute" top="75" left="0" >
                              <Text fontWeight="normal" fontSize={30} color="#CCD1D1">{v.description}</Text>
                            </Box>
                          </VStack>
                        </VStack>
                      </Button>
                  );
                })}
          </VStack>
        </HStack>
      </Box>
  );
};