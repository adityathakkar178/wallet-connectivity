import { useState } from "react";

const Balance = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleChange = (e) => {
        setAddress(e.target.value)
    };

    const getBalance = () => {
        contract.balanceOf(address).then((balance) => {
            setBalance(balance.toString());
        }).catch((err) => {
            console.log("Error fetching balance", err);
        });
    };
    return (<div>
        <h1>Check Balance</h1>
        <label>Enter address
            <input type="test" value={address} onChange={handleChange}/>
        </label>
        <button onClick={getBalance}>Get balance</button>
        {balance !== null && <h1>Token Balance of {address}: {balance}</h1>}
    </div>);
};

export default Balance;