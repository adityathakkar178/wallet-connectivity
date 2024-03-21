import { useState } from 'react';

const AllownaceIncrease = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [amount, SetAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        SetAmount(e.target.value);
    };

    const increaseTokenAllowance = () => {
        contract
            .increaseAllowance(address, amount)
            .then((transaction) => {
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error increasing allowance');
            });
    };

    return (
        <div>
            <h1>Increase Allowance</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                Amount
                <input type="number" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={increaseTokenAllowance}>Increase Allowance</button>
        </div>
    );
};

export default AllownaceIncrease;
