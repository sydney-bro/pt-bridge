import { Options } from '@layerzerolabs/lz-v2-utilities';
import { ethers, getBytes, zeroPadValue } from 'ethers';
import { useAccount } from 'wagmi';
import 
{ pointlessTokenBaseContract, pointlessTokenBaseABI, pointlessTokenZkContract, pointlessTokenZkABI, 
  pointlessBridgeContract, pointlessBridgeContractABI, pointlessTokenPolygonContract, pointlessTokenPolygonABI,
  pointlessTokenLensContract, pointlessTokenLensABI } 
  from '../contractABIs/pointlessAbis.js'

import { getProvider } from "../Utils/utils.js"

import { setLensEnforcedOptions,getPaddedAddress, setPeerBaseToLens, setPeerLensToBase, setBaseToLensEnforcedOptions } from "../L0Configuration/L0Configuration.js"

export function useBridgeFromBaseToPolygon(amountToSend, isUsingWalletConnect) {
    
  const { address, isConnected } = useAccount();
  // setPeerBaseToLens();
  // return;

  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          //setBaseToLensEnforcedOptions();
          //return;
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  
          
          
          console.log('Amount to send: ' + amountToSend);
          const eidB = 30109;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive: ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenBaseContract, pointlessTokenBaseABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         //alert('Transaction failed');
    }
  };
}

export function useBridgeFromBaseToZkSync(amountToSend, isUsingWalletConnect) {
  

  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  

          console.log('Amount to send: ' + amountToSend);
          const eidB = 30165;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive(18 decimals): ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
          console.log(options);
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenBaseContract, pointlessTokenBaseABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         //alert('Transaction failed');
    }
  };
}

export function useBridgeFromZksyncToBase(amountToSend, isUsingWalletConnect) {
  

  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  

          console.log('Amount to send: ' + amountToSend);
          const eidB = 30184;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive(18 decimals): ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();

          console.log(options);
          console.log(ethers);
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenZkContract, pointlessTokenZkABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         //alert('Transaction failed');
    }
  };
}

export function useBridgeFromZksyncToPolygon(amountToSend, isUsingWalletConnect) {
  

  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  

          console.log('Amount to send: ' + amountToSend);
          const eidB = 30109;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive(18 decimals): ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();

          console.log(options);
          console.log(ethers);
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenZkContract, pointlessTokenZkABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         //alert('Transaction failed');
    }
  };
}

export function useBridgeFromPolygonToBase(amountToSend, isUsingWalletConnect) {
    
    const { address, isConnected } = useAccount();
    //const { data: signer } = useSigner(); 
    //const { provider } = useProvider();
    const totalCustomFees = useTotalCustomFees();
    //const { data: walletClient, isError, isLoading } = useWalletClient();
    
    return async (value, isUsingWalletConnect) => {
        try {
        
          if(isConnected){
            const provider = await getProvider(isUsingWalletConnect);
            const signer = await provider.getSigner();  

            console.log('Amount to send: ' + amountToSend);
            const eidB = 30184;
            const tokensToSend = ethers.parseEther(amountToSend);
            const customFees = await totalCustomFees(provider);
            
            const tokensToReceive = tokensToSend - customFees;
            console.log('Amount to receive: ' + tokensToReceive);
            
            const addressBytes = getBytes(signer.address);
            const paddedAddress = zeroPadValue(addressBytes, 32);
            // Defining extra message execution options for the send operation
            const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
            const sendParam = [
                eidB,
                paddedAddress,
                tokensToSend,
                tokensToReceive,
                options,
                '0x',
                '0x',
            ]

            const contract = new ethers.Contract(pointlessBridgeContract, pointlessBridgeContractABI, signer);
            
            if(contract){
                const [nativeFee] = await contract.quoteSend(sendParam, false);
                console.log('native fee: ' + nativeFee);
                const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
                console.log('Transaction sent: ' + tx.hash);
                const receipt = await tx.wait();
                console.log('Transaction confirmed: ' + receipt);
            }
            else {
                console.log('Some problem with contract initialization');
            }
        }
        else
        {
          console.log('Wallet not connected');
        }
        
        } catch (err) {
        
           console.error('Transaction failed', err);
           //alert('Transaction failed');
      }
    };
  }


export function useBridgeFromPolygonToZksync(amountToSend, isUsingWalletConnect) {

  const { address, isConnected } = useAccount();
  const totalCustomFees = useTotalCustomFees();
    
    return async (value, isUsingWalletConnect) => {
        try {
        
          if(isConnected){
            const provider = await getProvider(isUsingWalletConnect);
            const signer = await provider.getSigner();  
  
            console.log('Amount to send: ' + amountToSend);
            const eidB = 30165;
            const tokensToSend = ethers.parseEther(amountToSend);
            //const customFees = await totalCustomFees();
            
            const customFees = await totalCustomFees(provider);
            
            const tokensToReceive = tokensToSend - customFees;

            console.log('Amount to receive(18 decimals): ' + tokensToReceive);
            
            const addressBytes = getBytes(signer.address);
            const paddedAddress = zeroPadValue(addressBytes, 32);
            // Defining extra message execution options for the send operation
            const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
  
            console.log(options);
            console.log(ethers);
            const sendParam = [
                eidB,
                paddedAddress,
                tokensToSend,
                tokensToReceive,
                options,
                '0x',
                '0x',
            ]
  
            const contract = new ethers.Contract(pointlessBridgeContract, pointlessBridgeContractABI, signer);
            
            if(contract){
                const [nativeFee] = await contract.quoteSend(sendParam, false);
                console.log('native fee: ' + nativeFee);
                const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
                console.log('Transaction sent: ' + tx.hash);
                const receipt = await tx.wait();
                console.log('Transaction confirmed: ' + receipt);
            }
            else {
                console.log('Some problem with contract initialization');
            }
        }
        else
        {
          console.log('Wallet not connected');
        }
        
        } catch (err) {
        
           console.error('Transaction failed', err);
           //alert('Transaction failed');
      }
    };
  }

export function useBridgeFromBaseToLens(amountToSend, isUsingWalletConnect) {
  

  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  

          console.log('Amount to send: ' + amountToSend);
          const eidB = 30373;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive(18 decimals): ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
          console.log(options);
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenBaseContract, pointlessTokenBaseABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         //alert('Transaction failed');
    }
  };
}

export function useBridgeFromLensToBase(amountToSend, isUsingWalletConnect) {
  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
      try {
      
        if(isConnected){
          
          const provider = await getProvider(isUsingWalletConnect);
          const signer = await provider.getSigner();  

          console.log('Amount to send: ' + amountToSend);
          const eidB = 30184;
          const tokensToSend = ethers.parseEther(amountToSend);
          //const customFees = await totalCustomFees();
          
          //const tokensToReceive = tokensToSend - customFees;
          const tokensToReceive = tokensToSend;
          console.log('Amount to receive(18 decimals): ' + tokensToReceive);
          
          const addressBytes = getBytes(signer.address);
          const paddedAddress = zeroPadValue(addressBytes, 32);
          // Defining extra message execution options for the send operation
          const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
          console.log(options);
          const sendParam = [
              eidB,
              paddedAddress,
              tokensToSend,
              tokensToReceive,
              options,
              '0x',
              '0x',
          ]

          const contract = new ethers.Contract(pointlessTokenLensContract, pointlessTokenLensABI, signer);
          
          if(contract){
              const [nativeFee] = await contract.quoteSend(sendParam, false);
              console.log('native fee: ' + nativeFee);
              const tx = await contract.send(sendParam, [nativeFee,0], signer.address , { value: nativeFee});
              console.log('Transaction sent: ' + tx.hash);
              const receipt = await tx.wait();
              alert('Transaction sent: https://layerzeroscan.com/tx/' + tx.hash);
              console.log('Transaction confirmed: ' + receipt);
          }
          else {
              console.log('Some problem with contract initialization');
          }
      }
      else
      {
        console.log('Wallet not connected');
      }
      
      } catch (err) {
      
         console.error('Transaction failed', err);
         alert('Transaction failed, please check instructions and try again');
    }
  };
}

 export function useTotalCustomFees(provider) {
  
  return async (provider) => {
    try {
      //const provider = await getProvider(isUsingWalletConnect);
      const signer = await provider.getSigner();  
      const contract = new ethers.Contract(pointlessBridgeContract, pointlessBridgeContractABI, signer);
      const bridgeFeeBurned = await contract.bridgeFeeBurned();
      const bridgeFeeTreasury = await contract.bridgeFeeTreasury();
      const totalFees = bridgeFeeBurned + bridgeFeeTreasury;
      return totalFees;

    }
    catch (err) {
        
      console.error('Something went horribly wrong...', err);
      //alert('Transaction failed');
    }
  }
}

export function useApprovePointless(amountToApprove, isUsingWalletConnect) {

  const { address, isConnected } = useAccount();
  
  return async (value, isUsingWalletConnect) => {
    try {
      if(isConnected) {
        console.log(isUsingWalletConnect);
        const provider = await getProvider(isUsingWalletConnect);
        //console.log(provider);
        const signer = await provider.getSigner();
        //console.log(signer);
        //console.log(pointlessTokenPolygonContract);
        const contract = new ethers.Contract(pointlessTokenPolygonContract, pointlessTokenPolygonABI, signer);
        
        console.log(amountToApprove);
        const tokensToApprove = ethers.parseEther(amountToApprove);
        contract.approve(pointlessBridgeContract,tokensToApprove);
      }
      else {
        console.log('Wallet not connected');
      }
      

    }
    catch (err) {
        
      console.error('Something went horribly wrong...', err);
      //alert('Transaction failed');
    }
  }
}