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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import {orange} from "@material-ui/core/colors";

export const Navbar = ({ selected }) => {
  const history = useHistory();
  const path = history.location.pathname;
  console.log(path);
  return (
    <HStack justify="space-between" py={55} bg="#212F3C" bgClip="text" >
      <HStack pr={300} >
        <Image src="/logo1.png" height={50} />
        <Text fontSize={50} fontWeight="bold">
          IdeaNFT
        </Text>
      </HStack>
      <HStack justify="space-between" width="full">
        <Box borderBottomWidth={selected === 1 ? 2 : 0} borderColor="black"  >
          <Link to="/">
            <Text fontSize={35} fontWeight="bold">
              Home
            </Text>
          </Link>
        </Box>
        <Box borderBottomWidth={selected === 2 ? 2 : 0} borderColor="black">
          <Link to="/priv">
            <Text fontSize={35} fontWeight="bold">
              Explore
            </Text>
          </Link>
        </Box>
        <Box borderBottomWidth={selected === 4 ? 2 : 0} borderColor="black">
          <Link to="/p_ideas">
          <Text fontSize={35} fontWeight="bold">
            My Private Ideas
          </Text>
            </Link>
      </Box>
        <Box borderBottomWidth={selected === 3 ? 2 : 0} borderColor="black">
          <Link to="/new">
            <Text fontSize={35}  fontWeight="bold">
              Create
            </Text>
          </Link>
        </Box>
          <WalletMultiButton />
      </HStack>
    </HStack>
  );
};
