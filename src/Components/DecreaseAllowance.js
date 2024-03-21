import { useState } from 'react';

const AllownaceDecrease = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [amount, SetAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        SetAmount(e.target.value);
    };

    const decreaseTokenAllowance = () => {
        contract
            .decreaseAllowance(address, amount)
            .then((transaction) => {
                setTransaction(transaction.hash);
            })
            .catch((err) => {
                console.error('Error increasing allowance');
            });
    };

    return (
        <div>
            <h1>Decrease Allowance</h1>
            <label>
                Address
                <input type="text" value={address} onChange={handleAddress} />
            </label>
            <label>
                Amount
                <input type="number" value={amount} onChange={handleAmount} />
            </label>
            <button onClick={decreaseTokenAllowance}>Decrease Allowance</button>
        </div>
    );
};

export default AllownaceDecrease;
