import { useState } from 'react';

const Mint = ({ contract, updateTotalSupply }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const mintTokens = () => {
        contract
            .mint(address, amount)
            .then((transaction) => {
                setTransaction(transaction.hash);
                updateTotalSupply();
            })
            .catch((err) => {
                console.error('Error Minitng Tokens', err);
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
            {/* {transaction && <h1>Transaction : {transaction}</h1>} */}
        </div>
    );
};

export default Mint;
