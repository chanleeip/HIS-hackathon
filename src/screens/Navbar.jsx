import {
  Button,
  HStack,
  Text,
  Link as NativeLink,
  Image,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';

export const Navbar = ({ selected }) => {
  const history = useHistory();
  const path = history.location.pathname;
  console.log(path);
  return (
    <HStack justify="space-between" py={55} bg="#212F3C" bgClip="text" >
      <HStack pr={300} >
        <Image src="/logo.png" height={39} />
        <Text fontSize={25} fontWeight="bold">
          IdeaNFTs
        </Text>
      </HStack>
      <HStack justify="space-between" width="full">
        <Box borderBottomWidth={selected === 1 ? 2 : 0} borderColor="black" >
          <Link to="/">
            <Text fontSize={20} fontWeight="bold">
              Home
            </Text>
          </Link>
        </Box>
        <Box borderBottomWidth={selected === 2 ? 2 : 0} borderColor="black">
          <Link to="/priv">
            <Text fontSize={20} fontWeight="bold">
              Explore
            </Text>
          </Link>
        </Box>
        <Box borderBottomWidth={selected === 4 ? 2 : 0} borderColor="black">
          <Link to="/p_ideas">
          <Text fontSize={20} fontWeight="bold">
            My Ideas
          </Text>
            </Link>
      </Box>
        <Box borderBottomWidth={selected === 3 ? 2 : 0} borderColor="black">
          <Link to="/new">
            <Text fontWeight="bold">
              Create
            </Text>
          </Link>
        </Box>
          <WalletMultiButton/>
      </HStack>
    </HStack>
  );
};
