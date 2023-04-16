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
              <Box h="320px" w="full" bg="orange" p={4} >
                <Text fontSize={20} fontWeight="bold" mb={5} >For Docs :</Text>
               <Button fontSize={20} fontWeight="bold" bg="transparent" mb={5} >
                 <a href="https://ipindia.gov.in/guidelines-patents.htm">Patent</a>
               </Button>
                <Button fontSize={20} fontWeight="bold"bg="transparent" mb={5} >
                  <a href="https://www.copyright.gov.in/documents/handbook.html">CopyWright</a>
                </Button>
                <Button fontSize={20} fontWeight="bold" bg="transparent" mb={5} >
                  <a href="https://ipindia.gov.in/trade-marks.htm">Trademark</a>
                </Button>
                <Button fontSize={20} fontWeight="bold" bg="transparent" mb={10} p={5}  >

                  <a href="https://www.uscib.org/docs/BASCAP_IP_Guidelines.pdf#:~:text=Business%20Action%20to%20Stop%20Counterfeiting%20and%20Piracy%20%28BASCAP%29%2C,sourcing%2C%20manufacturing%2C%20wholesaling%2C%20retailing%20and%20internal%20corporate%20use">Intellectual <br/> property</a>
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
