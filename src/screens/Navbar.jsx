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
        <Image src="/logo1.png" height={39} />
        <Text fontSize={25} fontWeight="bold">
          IdeaNFTs
        </Text>
      </HStack>
      <HStack justify="space-between" width="full">
        <Box borderBottomWidth={selected === 1 ? 2 : 0} borderColor="black"  >
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
            <Popup trigger={<Button bg="transparent" color="black" _hover={{bg:"transparent"}}>
            <Text fontSize={20}  fontWeight="bold">
              Create
            </Text>
              </Button>}position="bottom left">
              <Box h="275px" w="full" bg="orange" p={4} >
               <Button fontSize={20} fontWeight="bold" bg="transparent" mb={5} >
                 Patent
               </Button>
                <Button fontSize={20} fontWeight="bold"bg="transparent" mb={5} >
                  CopyWright
                </Button>
                <Button fontSize={20} fontWeight="bold" bg="transparent" mb={5} >
                  Trademark
                </Button>
                <Button fontSize={20} fontWeight="bold" bg="transparent" mb={10} p={5}  >
                  Intellectual <br/> property
                </Button>
              </Box>
            </Popup>
          </Link>
        </Box>
          <WalletMultiButton/>
      </HStack>
    </HStack>
  );
};
