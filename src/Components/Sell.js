import { useState } from "react";

const SellToken = ({ contract }) => {
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [transaction, setTransaction] = useState('');

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const sell = () => {
        contract.sell(amount, price).then((transaction) => {
            setTransaction(transaction.hash);
        }).catch((err) => {
            console.error("Error selling token", err);
        });;
    };

    return (<div>
        <h1>Sell Tokens</h1>
        <label>
            Amount
            <input type="number" value={amount} onChange={handleAmount} /> 
        </label>
        <label>
            Price
            <input type="number" value={price} onChange={handlePrice} /> 
        </label>
        <button onClick={sell}>Sell</button>
    </div>);
};

export default SellToken;