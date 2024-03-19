import { useState } from 'react';
import { ethers } from 'ethers';

const Connect = () => {
    const [connect, setConnect] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(() => {
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    provider
                        .listAccounts()
                        .then((accounts) => {
                            if (accounts.length > 0) {
                                setConnect(accounts[0]);
                            } else {
                                setConnect('No accounts found');
                            }
                        })
                        .catch((error) => {
                            console.error('Error getting accounts:', error);
                            setConnect('Error getting accounts');
                        });
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                    setConnect('Error connecting to MetaMask');
                });
        } else {
            setConnect('MetaMask not installed');
        }
    };

    return (
        <div>
            <h1>Connect Metamask wallet</h1>
            <h1>{connect}</h1>
            <h1>{balance}</h1>
            <h1>Balance :- {setBalance}</h1>
            <button onClick={connectWallet}>Connect wallet</button>
        </div>
    );
};

export default Connect;
