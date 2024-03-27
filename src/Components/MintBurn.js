import { useState } from 'react';
import axios from 'axios';

const MintBurn = ({ contract, updateTotalSupply }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [burnAmount, setBurnAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleBurnAmount = (e) => {
        setBurnAmount(e.target.value);
    };

    const mintTokens = async () => {
        contract
            .mint(address, amount)
            .then((transaction) => {
                axios.post('http://localhost:3003/mint', {
                    address,
                    amount,
                    transactionHash: transaction.hash,
                });
            })
            .then(() => {
                setTransaction(transaction.hash);
                updateTotalSupply();
            })
            .catch((err) => {
                console.error('Error Minting Tokens', err);
            });
    };

    const burnTokens = () => {
        contract
            .burn(burnAmount)
            .then((transaction) => {
                setTransaction(transaction.hash);
                updateTotalSupply();
            })
            .catch((err) => {
                console.error('Error burning tokens', err);
            });
    };

    return (
        <div>
            <h1>Mint Tokens</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                amount
                <input type="number" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={mintTokens}>Mint</button>
            <h1>Burn Tokens</h1>
            <label>
                amount
                <input
                    type="number"
                    value={burnAmount}
                    onChange={handleBurnAmount}
                />
            </label>
            <button onClick={burnTokens}>Burn</button>
        </div>
    );
};

export default MintBurn;
