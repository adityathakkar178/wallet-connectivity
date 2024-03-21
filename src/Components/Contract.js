import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import Balance from './Balance';
import MintBurn from './MintBurn';
import Transfer from './Transfer';
import Approve from './Approve';
import TransferTokens from './TransferFrom';
import AllownaceIncrease from './Allowance';

const Contract = () => {
    const [abi, setAbi] = useState('');
    const [contract, setContract] = useState('');
    const [totalTokenSupply, setTotalTokenSupply] = useState('');

    useEffect(() => {
        const fetchContractABI = () => {
            axios
                .get('http://localhost:3003/contract-abi')
                .then((response) => {
                    const abi = response.data.abi;
                    console.log(abi);
                    setAbi(abi);
                })
                .catch((error) => {
                    console.error('Error fetching contract ABI:', error);
                });
        };

        fetchContractABI();
    }, []);

    useEffect(() => {
        if (abi) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(() => {
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    const signer = provider.getSigner();
                    console.log(signer.getAddress());
                    const contractAddress =
                        '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
                    const contract = new ethers.Contract(
                        contractAddress,
                        abi,
                        signer
                    );
                    console.log(contract);
                    setContract(contract);
                    contract.totalSupply().then((supply) => {
                        setTotalTokenSupply(supply.toString());
                    });
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                });
        }
    }, [abi]);

    const updateTokenSupply = () => {
        contract.totalSupply().then((supply) => {
            setTotalTokenSupply(supply.toString());
        });
    };

    return (
        <div>
            <h1>Total Supply: {totalTokenSupply}</h1>
            <Balance contract={contract} />
            <MintBurn
                contract={contract}
                updateTotalSupply={updateTokenSupply}
            />
            <Transfer contract={contract} />
            <Approve contract={contract} />
            <TransferTokens contract={contract} />
            <AllownaceIncrease contract={contract} />
        </div>
    );
};

export default Contract;
