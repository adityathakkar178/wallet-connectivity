import { useState } from "react";

const ViewAllowance = ({ contract }) => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [spenderAddress, setSpenderAddress] = useState('');
    const [allowanceAmount, setAllowanceAmount] = useState('');

    const handleOwnerAddress = (e) => {
        setOwnerAddress(e.target.value);
    };

    const handleSpenderAddress = (e) => {
        setSpenderAddress(e.target.value);
    };

    const viewAllowance = async () => {
        try {
            const amount = await contract.allowance(ownerAddress, spenderAddress);
            setAllowanceAmount(amount.toString()); // Convert to string
        } catch (error) {
            console.error('Error fetching allowance:', error);
        }
    };

    return (
        <div>
            <h1>View Allowance</h1>
            <label>
                Owner Address
                <input
                    type="text"
                    value={ownerAddress}
                    onChange={handleOwnerAddress}
                />
            </label>
            <label>
                Spender Address
                <input
                    type="text"
                    value={spenderAddress}
                    onChange={handleSpenderAddress}
                />
            </label>
            <p>Allowance Amount: {allowanceAmount}</p>
            <button onClick={viewAllowance}>View Allowance</button>
        </div>
    );
};

export default ViewAllowance;
