import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Balance = ({ contract }) => {
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleChange = (e) => {
        setAddress(e.target.value);
    };

    const getBalance = () => {
        contract
            .balanceOf(address)
            .then((balance) => {
                setBalance(balance.toString());
            })
            .catch((err) => {
                console.log('Error fetching balance', err);
            });
    };
    return (
        <div>
            <h1>Check Balance</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Enter address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" onClick={getBalance}>
                    Get balance
                </Button>
            </Form>
            {balance !== null && (
                <h1>
                    Token Balance of {address}: {balance}
                </h1>
            )}
        </div>
    );
};

export default Balance;
