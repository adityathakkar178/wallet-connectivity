import { useState, useEffect } from 'react';
import Web3 from 'web3';

const AccountSwitcher = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(() => {
                web3.eth.getAccounts().then(async (accounts) => {
                    setAccounts(accounts);
                    setCurrentAccountIndex(0);
                    const accountBalances = await Promise.all(
                        accounts.map(async (account) => {
                            const balance = await web3.eth.getBalance(account);
                            return web3.utils.fromWei(balance, 'ether');
                        })
                    );
                    setBalances(accountBalances);
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
            <h1>Balance: {balances[currentAccountIndex]} ETH</h1>
            {accounts.length > 0 && (
                <button onClick={switchAccount}>
                    Switch Account
                </button>
            )}
        </div>
    );
};

export default AccountSwitcher;
