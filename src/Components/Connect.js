import { useState } from 'react';
import { ethers } from 'ethers';
import classes from './Connect.module.css';

const Connect = (props) => {
    const [connect, setConnect] = useState('');
    const [balance, setBalance] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            await window.ethereum
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
                                provider
                                    .getBalance(accounts[0])
                                    .then((balance) => {
                                        const etherBalance =
                                            ethers.utils.formatEther(balance);
                                        setBalance(etherBalance);
                                        props.onConnect();
                                    })
                                    .catch((error) => {
                                        setBalance('Error getting balance');
                                    });
                            } else {
                                setConnect('No accounts found');
                            }
                        })
                        .catch((error) => {
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
        <div className={classes.container}>
            <h1 className={classes.title}>Connect Metamask wallet</h1>
            {/* <h1>address : {connect}</h1>
            <h1>Balance : {balance}</h1> */}
            <button onClick={connectWallet} className={classes.button}>{props.buttontext}</button>
        </div>
    );
};

export default Connect;
