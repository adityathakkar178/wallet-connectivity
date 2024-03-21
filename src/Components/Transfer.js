import { useState } from 'react';

const Transfer = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const transfertoken = () => {
        contract
            .transfer(address, amount)
            .then((transaction) => {
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error transfering tokens', err);
            });
    };

    return (
        <div>
            <h1>Transfer Tokens</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                amount
                <input type="number" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={transfertoken}>Transfer</button>
        </div>
    );
};

export default Transfer;
