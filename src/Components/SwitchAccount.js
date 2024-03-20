import { useState, useEffect } from 'react';
import Web3 from 'web3';

const AccountSwitcher = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);

    useEffect(() => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(() => {
                web3.eth.getAccounts().then((accounts) => {
                    setAccounts(accounts);
                    setCurrentAccountIndex(0);
                });
                window.ethereum.on('accountsChanged', (newAccounts) => {
                    setAccounts(newAccounts);
                    setCurrentAccountIndex(0);
                });
            });
        } else {
            console.log('MetaMask is not installed');
        }
    }, []);

    const switchAccount = () => {
        const newIndex = (currentAccountIndex + 1) % accounts.length;
        setCurrentAccountIndex(newIndex);
    };

    return (
        <div>
            <h1>Current Account: {accounts[currentAccountIndex]}</h1>
            {accounts.length > 0 && (
                <button onClick={switchAccount} disabled={accounts.length <= 1}>
                    Switch Account
                </button>
            )}
        </div>
    );
};

export default AccountSwitcher;
