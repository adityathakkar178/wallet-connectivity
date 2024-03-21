import { useState } from 'react';

const Approve = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const allow = () => {
        contract
            .approve(address, amount)
            .then((transaction) => {
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error giving approval', err);
            });
    };

    return (
        <div>
            <h1>Approve</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                Amount
                <input type="text" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={allow}>Approve</button>
        </div>
    );
};

export default Approve;
