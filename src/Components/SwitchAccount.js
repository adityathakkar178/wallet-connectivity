import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccountSwitcher = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
    const [currentAccount, setCurrentAccount] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const account = await provider.listAccounts();
                console.log(account);
                console.log(account);
                setAccounts(account);
                if (account.length > 0) {
                    setCurrentAccount(account[0]);
                    const balance = await provider.getBalance(account[0]);
                    const etherBalance = ethers.utils.formatEther(balance);
                    setBalance(etherBalance);
                }
            }
        };

        fetchAccounts();
    }, []);

    const switchAccount = () => {
        if (accounts.length > 1) {
            const newIndex = (currentAccountIndex + 1) % accounts.length;
            setCurrentAccountIndex(newIndex);
            setCurrentAccount(accounts[newIndex]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider
                .getBalance(accounts[newIndex])
                .then((balance) => {
                    const etherBalance = ethers.utils.formatEther(balance);
                    setBalance(etherBalance);
                })
                .catch((error) => {
                    console.error('Error switching account:', error);
                });
        }
    };

    return (
        <div>
            <h1>Current Account Address: {currentAccount}</h1>
            <h1>Balance: {balance}</h1>
            {accounts.length > 1 && (
                <button onClick={switchAccount}>Switch Account</button>
            )}
        </div>
    );
};

export default AccountSwitcher;
