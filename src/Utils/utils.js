import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

export async function getProvider(isUsingWalletConnect) {
    try {
      if (isUsingWalletConnect) {
        console.log("Creating WalletConnect provider...");
        const provider = await EthereumProvider.init({
          projectId: "f05ef59c316622b2776ddebae412831b", // replace with your actual projectId
          chains: [137, 8453,324], // Add relevant chains
          methods: ["personal_sign", "eth_sendTransaction"],
          showQrModal: true,
          qrModalOptions: {
            themeMode: "light",
          },
        });
        const ethersProvider = new ethers.BrowserProvider(provider);
       return ethersProvider;
      } else {
        console.log("Creating BrowserProvider...");
        const provider = new ethers.BrowserProvider(window.ethereum); // Assuming window.ethereum exists
        return provider;
      }
    } catch (err) {
      console.error("[getProvider]:Something went wrong...", err);
      }
  } 