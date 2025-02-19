
import {  ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';

import Head from 'next/head';

import styles from '../styles/Home.module.css';

import { useState, useEffect } from 'react';

import { useApprovePointless, useBridgeFromPolygonToBase, useBridgeFromBaseToPolygon, 
   useBridgeFromBaseToZkSync, useBridgeFromZksyncToBase, useBridgeFromPolygonToZksync, useBridgeFromZksyncToPolygon } 
  from '../hooks/useBridgePointless';

  import { useStorageAt } from 'wagmi';

export
  default function
  Home() {

  const [number,setNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [sourceChain, setSourceChain] = useState('');
  const [destinationChain, setDestinationChain] = useState('');
  const [isUsingWalletConnect, setIsUsingWalletConnect] = useState<boolean>(false);

  
  const { isConnected } = useAccount(); // Check if wallet is connected
  //const { connector } = useConnect();

  //const { switchChain } = useSwitchChain();

  const bridgeFromPolygonToBase = useBridgeFromPolygonToBase(number, isUsingWalletConnect);

  const bridgeFromBaseToPolygon = useBridgeFromBaseToPolygon(number, isUsingWalletConnect);
  
  const bridgeFromBaseToZkSync = useBridgeFromBaseToZkSync(number, isUsingWalletConnect);

  const bridgeFromZkSyncToBase = useBridgeFromZksyncToBase(number, isUsingWalletConnect);
  //const totalCustomFees = useTotalCustomFees();
  const bridgeFromPolygonToZksync = useBridgeFromPolygonToZksync(number, isUsingWalletConnect);
  
  const bridgeFromZksyncToPolygon = useBridgeFromZksyncToPolygon(number, isUsingWalletConnect);

  const approvePointless = useApprovePointless(number,isUsingWalletConnect);
  
  // Options for the dropdown
  const chainOptions = ['Base', 'Polygon', 'zkSync'];

  useEffect(() => {
    console.log('isUsingWalletConnect value:', isUsingWalletConnect);
  }, [isUsingWalletConnect]);
  // Function to handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setIsUsingWalletConnect(e.target.checked);
  };

  // Handle change for source chain
  const handleSourceChange = (e: React.ChangeEvent<any>) => {
    const selectedChain = e.target.value;
    setSourceChain(e.target.value);
    if (isConnected) {
      if(selectedChain === "Base")
      {
        //switchChain(connector,8453);
      }
      else if(selectedChain === "Polygon")
      {
        //switchChain(connector, 137);
      }
    }
  };

  // Handle change for destination chain
  const handleDestinationChange = (e: React.ChangeEvent<any>) => {
    setDestinationChain(e.target.value);
  };

  const
    handleChange = (e: React.ChangeEvent<any>) => {
      //console.log(e.target.value);
      setNumber(e.target.value);
    };



  const
    handleSubmit = async () => {
        setLoading(true);
        try {
          console.log(Number(number));
          if(number === '')
          {
            alert("please enter the amount to transfer");
          }
          if(sourceChain === '' || destinationChain === '' )
          {
            alert("please select the source and destination chains...");
          }
          else if(sourceChain === destinationChain)
          {
            alert('Select different source and destination chains...');
          }
          // else if(sourceChain === 'zkSync' || destinationChain === 'zkSync') 
          // {
          //   alert('The bridging from/To zkSync is not currently available, it will be added in coming weeks...');
          // }
          else if(sourceChain === 'Base' && destinationChain === 'Polygon')
          {
            await bridgeFromBaseToPolygon(Number(number),isUsingWalletConnect);
          }
          else if(sourceChain === 'Base' && destinationChain === 'zkSync')
          {
            await bridgeFromBaseToZkSync(Number(number),isUsingWalletConnect);
          }
          else if(sourceChain === 'zkSync' && destinationChain === 'Base')
          {
            await bridgeFromZkSyncToBase(Number(number),isUsingWalletConnect);
          }
          else if(sourceChain === 'Polygon' && destinationChain === 'Base') 
          {
            //console.log(await totalCustomFees());
            await bridgeFromPolygonToBase(Number(number),isUsingWalletConnect);
          }
          else if(sourceChain === 'Polygon' && destinationChain === 'zkSync') 
          {
            await bridgeFromPolygonToZksync(Number(number),isUsingWalletConnect);
          }
          else if(sourceChain === 'zkSync' && destinationChain === 'Polygon') 
          {
            await bridgeFromZksyncToPolygon(Number(number),isUsingWalletConnect);
          }
        } catch (err) {
          alert(err)
        } finally {
          setLoading(false);
        }

      };

  const
    handleApprove = async () => {
        setLoading(true);
        try {
          console.log(Number(number));
          console.log(isUsingWalletConnect);
          console.log(sourceChain);
          if(sourceChain === "" || destinationChain === "")
          {
            alert("please select the source and destination chains...");
          }

          await approvePointless(Number(number), isUsingWalletConnect);
          
        } catch (err) {
          //console.error(err);
        } finally {
          setLoading(false);
        }

      };
  return (

    <div
      className={styles.container}>

      <Head>
        <title>pointless test bridge</title>

        <meta

          content="Generated by @rainbow-me/create-rainbowkit"

          name="pointless test bridge"

        />

        <link
          href="/favicon.ico"
          rel="icon"
        />

      </Head>

      <main
        className={styles.main}>
        <ConnectButton
        />
        {/* <aside className="side-panel">
                <p>
                  Important:<br/>
                  - Please make sure you are on the right network, for example: if bridging from base, select base network in your wallet.<br />
                  - Ensure you have enough $pointless balance. <br />
                  - Approval is required only when bridging from Polygon
                  </p>
      </aside>  */}
        
        <div>

          <h1>Pointless bridge</h1>
          <aside className="side-panel">
                <p>
                  Important:<br/>
                  - Please make sure you are on the right network, for example: if bridging from base, select base network in your wallet.<br />
                  - Ensure you have enough $pointless balance. <br />
                  - Approval is required only when bridging from Polygon
                  </p>
      </aside>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <input
              id="wallet-connect"
              type="checkbox"
              checked={isUsingWalletConnect}
              onChange={handleCheckboxChange}
              style={{ margin: 0, padding: 0, width: '16px', height: '16px', border: '1px solid #000'}}
              />
              <label htmlFor="wallet-connect">I'm using wallet-connect</label>
              </div>
        <div>
        <label htmlFor="source-chain">Source Chain:</label>
        <select
          id="source-chain"
          value={sourceChain}
          onChange={handleSourceChange}
        >
          <option value="">Select Source Chain</option>
          {chainOptions.map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="destination-chain">Destination Chain:</label>
        <select
          id="destination-chain"
          value={destinationChain}
          onChange={handleDestinationChange}
        >
          <option value="">Select Destination Chain</option>
          {chainOptions.map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
        </select>
      </div>
          <input

            type="number"

            value={number}

            onChange={handleChange}

            placeholder="Amount to send"

          />

          {sourceChain === 'Polygon' && (
          <button
            onClick={handleApprove}
            className={styles.customButton}
            disabled={loading}>

            {loading
              ?
              'Processing...' :
              'Approve'}

          </button>)}

          <button
            onClick={handleSubmit}
            className={styles.customButton}
            disabled={loading}>

            {loading
              ?
              'Processing...' :
              'Send'}

          </button>
          
         
        </div>


      </main>



      <footer
        className={styles.footer}>

        <a
          href="https://rainbow.me"
          rel="noopener noreferrer"
          target="_blank">

          Made with ❤️ by @sydney-bro

        </a>

      </footer>

    </div>

  );

};



//export default Home;
