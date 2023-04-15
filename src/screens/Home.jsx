import React from 'react';
import { Button, Heading, HStack, Image, VStack, Box} from '@chakra-ui/react';
import ikbal from './undraw_mobile_search_p2ka.svg';
import '../index.css'

import { Link } from 'react-router-dom';
import {WalletMultiButton} from "@solana/wallet-adapter-material-ui";

export const Home = () => {
  return (
    <Box p={10}  >
      <HStack width="full">
        <VStack
          width="full"
          alignItems="start"
          justify="space-between"
          spacing={0}
        >
          <Heading fontSize={50}  pb={50} >
            Protect your Intellectual Property Rights using Blockchain. Create
            Patents/Ideas as NFTs on Solana.

          </Heading>
        </VStack>
        <Image src={ikbal} />
      </HStack>
    </Box>
  );
};
