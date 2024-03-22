import { useState } from 'react';

const BuyTokens = ({ contract, price }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const buy = () => {
        contract
            .buy(address, amount, { value: amount * price })
            .then((transaction) => {
                console.log(amount * price);
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error buying tokens');
            });
    };

    return (
        <div>
            <h1>Buy Tokens</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                Amount
                <input type="text" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={buy}>Buy Tokens</button>
        </div>
    );
};

export default BuyTokens;
