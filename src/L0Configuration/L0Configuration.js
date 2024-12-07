import { getProvider } from "../Utils/utils.js"
import { Options } from '@layerzerolabs/lz-v2-utilities';
import { ethers, getBytes, zeroPadValue } from 'ethers';
import { useAccount } from 'wagmi';

import 
{ pointlessTokenBaseContract, pointlessTokenBaseABI, pointlessTokenZkContract, pointlessTokenZkABI, 
  pointlessBridgeContract, pointlessBridgeContractABI } 
from '../contractABIs/pointlessAbis.js'

export async function setBaseEnforcedOptions()
{
  try {
      const provider = await getProvider(false);
      const signer = await provider.getSigner();  
      
      const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
      const contract = new ethers.Contract(pointlessTokenBaseContract, pointlessTokenBaseABI, signer);
          
          if(contract){
            const tx = await contract.setEnforcedOptions([{eid: 30165,msgType: 1,options: options}]);
            console.log('Transaction sent: ' + tx.hash);
            const receipt = await tx.wait();
            console.log('Transaction confirmed: ' + receipt);
          }
          else {
            console.log('Some problem with contract initialization');
        }
    
  }
  catch (err) {
    console.error("[setBaseEnforcedOptions]:Something went wrong...", err);
    }
}

export async function setZkEnforcedOptions()
{
  try {
      const provider = await getProvider(false);
      const signer = await provider.getSigner();  
      
      const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
      const contract = new ethers.Contract(pointlessTokenZkContract, pointlessTokenZkABI, signer);
      //const contract = new ethers.Contract("0x1925505972D63b69212B6021C2dBe6bA794222F3", pointlessTokenZkABI, signer);
          if(contract){
            const tx = await contract.setEnforcedOptions([{eid: 30109,msgType: 1,options: options}]);
            console.log('Transaction sent: ' + tx.hash);
            const receipt = await tx.wait();
            console.log('Transaction confirmed: ' + receipt);
          }
          else {
            console.log('Some problem with contract initialization');
        }
    
  }
  catch (err) {
    console.error("[setZkEnforcedOptions]:Something went wrong...", err);
    }
}

export async function setPolygonEnforcedOptions()
{
  try {
      const provider = await getProvider(false);
      const signer = await provider.getSigner();  
      
      const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
      //const contract = new ethers.Contract(pointlessTokenZkContract, pointlessTokenZkABI, signer);
      const contract = new ethers.Contract("0x2870517810d1B832942616F8A59Fc6f78C8F7D29", pointlessBridgeContractABI, signer);
          if(contract){
            const tx = await contract.setEnforcedOptions([{eid: 30165,msgType: 1,options: options}]);
            console.log('Transaction sent: ' + tx.hash);
            const receipt = await tx.wait();
            console.log('Transaction confirmed: ' + receipt);
          }
          else {
            console.log('Some problem with contract initialization');
        }
    
  }
  catch (err) {
    console.error("[setZkEnforcedOptions]:Something went wrong...", err);
    }
}

export async function setPeerOnPolygon()
{
  try {
      const provider = await getProvider(false);
      const signer = await provider.getSigner();  
      
      const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString();
      const contract = new ethers.Contract(pointlessBridgeContract, pointlessBridgeContractABI, signer);
      const paddedAddress = zeroPadValue('0xFD21D5E148dF3B93AE6deC416544Fb3d3E21260C', 32)          
          if(contract){
            const tx = await contract.setEnforcedOptions([{eid: 30165,msgType: 1,options: options}]);
            console.log('Transaction sent: ' + tx.hash);
            const receipt = await tx.wait();
            console.log('Transaction confirmed: ' + receipt);
          }
          else {
            console.log('Some problem with contract initialization');
        }
    
  }
  catch (err) {
    console.error("[setPolygonEnforcedOptions]:Something went wrong...", err);
    }
}

export async function setBaseL0Config()
{
  try {
    const provider = await getProvider(false);
    const signer = await provider.getSigner();  

    const encodedConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["tuple(uint64,uint8,uint8,uint8,address[],address[])"],
      [[
        10,
        2, // uint8
        1, // uint8
        0, // uint8
        ["0x9e059a54699a285714207b43b055483e78faac25","0xa7b5189bcA84Cd304D8553977c7C614329750d99"], // address[]
        ["0x41ef29f974fc9f6772654f005271c64210425391"],
      ]]
    );
    console.log(encodedConfig);
    const contract = new ethers.Contract(layerzeroBaseEndpoint, layerzeroBaseABI, signer);
    console.log(contract);
    if(contract) {
          const tx = await contract.setConfig('0x9c6d4496bDc6312AB94F1FD4295F59DF6Ed8EeE3','0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',[{eid:30165,configType: 2,config: encodedConfig}]);
          console.log('Transaction sent: ' + tx.hash);
          const receipt = await tx.wait();
          console.log('Transaction confirmed: ' + receipt);
        }
        else {
          console.log('Some problem with contract initialization');
      }
  
    }
catch (err) {
  console.error("[setBaseL0Config]:Something went wrong...", err);
  }

}

export async function setPolygonL0Config()
{
  try {
    const provider = await getProvider(false);
    const signer = await provider.getSigner();  

    const encodedConfig = ethers.AbiCoder.defaultAbiCoder().encode(
      ["tuple(uint64,uint8,uint8,uint8,address[],address[])"],
      [[
        512,
        2, // uint8
        1, // uint8
        0, // uint8
        ["0x23de2fe932d9043291f870324b74f820e11dc81a","0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"], // address[]
        ["0x25e0e650a78e6304a3983fc4b7ffc6544b1beea6"],
      ]]
    );
    console.log(encodedConfig);
    const contract = new ethers.Contract(layerzeroPolygonEndpoint, endpointAbi, signer);
    console.log(contract);
    if(contract) {
          //const tx = await contract.setConfig('0xa1EfA1afdCEF2DB851042c6c6FD4Cffb8Fbc7DB0','0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',[{eid:30165,configType: 2,config: encodedConfig}]);
          const tx = await contract.setConfig('0xa1EfA1afdCEF2DB851042c6c6FD4Cffb8Fbc7DB0','0x1322871e4ab09Bc7f5717189434f97bBD9546e95',[{eid:30165,configType: 2,config: encodedConfig}]);
          console.log('Transaction sent: ' + tx.hash);
          const receipt = await tx.wait();
          console.log('Transaction confirmed: ' + receipt);
        }
        else {
          console.log('Some problem with contract initialization');
      }
  
    }
catch (err) {
  console.error("[setPolygonL0Config]:Something went wrong...", err);
  }

}