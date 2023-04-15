import React, {useMemo, useEffect, useState} from 'react';
import {ChakraProvider, Box, extendTheme, theme} from '@chakra-ui/react';
import { Navbar } from './screens/Navbar';
import { NewForm } from './screens/Form';

// solana imports
import { useWallet } from '@solana/wallet-adapter-react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';

// react router dom imports
import { Switch, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { NFTPage } from './screens/NFTPage';
import { Explore } from './screens/Explore';
import { Pideas} from "./screens/private_ideas";




// const themee = extendTheme({
//   config: {
//     initialColorMode: 'dark',
//     useSystemColorMode: false,
//   },
//   components: {
//     Button: {
//       variants: {
//         // 4. We can override existing variants
//         solid: {
//           bg: '#3F51B5',
//           color:'#212F3C',
//           _hover: {
//             bg: '#3F51B5',
//           },
//         },
//         outline: {
//           borderWidth:'3px',
//           borderColor: '#212F3C',
//           color: '#212F3C',
//           _hover: {
//             borderColor: '#212F3C',
//           },
//         },
//       },
//     },
//   },
// });

function App() {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );
  const [publickey, setPublicKey] = useState("");
  // const checkIfWalletIsConnected = async () => {
  //   // We're using optional chaining (question mark) to check if the object is null
  //   if (window?.solana?.isPhantom) {
  //     console.log('Phantom wallet found!');
  //     const response = await window.solana.connect({ onlyIfTrusted: true });
  //
  //     setPublicKey(response.publicKey.toString());
  //   } else {
  //     alert('Solana object not found! Get a Phantom Wallet 👻');
  //   }
  // };
  // console.log(publickey)
  // useEffect(() => {
  //   const onLoad = async () => {
  //     await checkIfWalletIsConnected();
  //   };
  //   window.addEventListener('load', onLoad);
  //   return () => window.removeEventListener('load', onLoad);
  // }, []);

  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Box
              fontSize="xl"
              backgroundColor="#FFBF00 "
              width="full"
              height="100%"
              px={85}
              textColor="#212F3C"
            >
              {/* <ColorModeSwitcher /> */}
              <Switch>
                <Route path="/new">
                  <Navbar selected={3} />
                  <NewForm />
                </Route>
                <Route path="/nft/:addr">
                  <Navbar selected={3} />
                  <NFTPage />
                </Route>
                <Route path="/explore">
                  <Navbar selected={2} />
                  <Explore />
                </Route>
              <Route path="/priv">
                <Navbar selected={2} />
                <Explore />
              </Route>

                <Route path="/p_ideas">
                  <Navbar selected={4} />
                  <Pideas />
                </Route>

                <Route path="/">
                  <Navbar selected={1} />
                  <Home />
                </Route>
              </Switch>
            </Box>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>

    </ChakraProvider>
  );

}

export default App;
