import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import Balance from './Balance';
import MintBurn from './MintBurn';
import Transfer from './Transfer';
import Approve from './Approve';
import TransferTokens from './TransferFrom';
import AllownaceIncrease from './Allowance';
import AllownaceDecrease from './DecreaseAllowance';
import ViewAllowance from './ViewAllowance';
import SellToken from './Sell';
import BuyTokens from './Buy';
import classes from './Contract.module.css';
import TokensTable from './Tokens';

const Contract = () => {
    const [abi, setAbi] = useState('');
    const [contract, setContract] = useState('');
    const [totalTokenSupply, setTotalTokenSupply] = useState('');
    const [price, setPrice] = useState(0);

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
                        '0x5fbdb2315678afecb367f032d93f642f64180aa3';
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

    const updatePrice = (newPrice) => {
        setPrice(newPrice);
        console.log(newPrice);
    };

    return (
        <div className={classes.contractcontainer}>
            <h1 className={classes.contracttitle}>ERC20 Contract</h1>
            <div className={classes.contractinfo}>
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
                <AllownaceDecrease contract={contract} />
                <ViewAllowance contract={contract} />
                <SellToken contract={contract} updatePrice={updatePrice} />
                <BuyTokens contract={contract} price={price} />
                <TokensTable />
            </div>
        </div>
    );
};

export default Contract;
