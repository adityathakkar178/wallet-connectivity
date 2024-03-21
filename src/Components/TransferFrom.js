import { useState } from 'react';

const TransferTokens = ({ contract }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleFromAddress = (e) => {
        setFromAddress(e.target.value);
    };

    const handleToAddress = (e) => {
        setToAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const transferToken = () => {
        contract
            .transferFrom(fromAddress, toAddress, amount)
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
                From Address
                <input
                    type="text"
                    value={fromAddress}
                    onChange={handleFromAddress}
                />
            </label>
            <label>
                To Address
                <input
                    type="text"
                    value={toAddress}
                    onChange={handleToAddress}
                />
            </label>
            <label>
                Amount
                <input type="Number" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={transferToken}>Transfer</button>
        </div>
    );
};

export default TransferTokens;
