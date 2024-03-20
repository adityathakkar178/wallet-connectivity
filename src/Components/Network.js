import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Network = () => {
    const [network, setNetwork] = useState();

    useEffect(() => {
        const fetchNetwork = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const currentNetwork = await provider.getNetwork();
                console.log(currentNetwork);
                setNetwork(`${currentNetwork.chainId}: ${currentNetwork.name}`);
            } else {
                setNetwork('Meta mask is not installed');
            }
        };

        const handleChainChanged = () => {
            fetchNetwork();
        };

        if (window.ethereum) {
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        fetchNetwork();
    }, []);

    const switchNetwork = async () => {
        if (window.ethereum) {
            window.ethereum
                .request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                        {
                            chainId: `0x${Number(137).toString(16)}`,
                        },
                    ],
                })
                .then(() => {
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    provider
                        .send('wallet_addEthereumChain', [
                            {
                                chainId: `0x${Number(137).toString(16)}`,
                                chainName: 'Polygon Mainnet',
                                rpcUrls: ['https://polygon-rpc.com'],
                                blockExplorerUrls: ['https://polygonscan.com/'],
                                nativeCurrency: {
                                    name: 'MATIC',
                                    symbol: 'MATIC',
                                    decimals: 18,
                                },
                            },
                        ])
                        .then(async () => {
                            const currentNetwork = await provider.getNetwork();
                            console.log(currentNetwork);
                            setNetwork(
                                `${currentNetwork.chainId}: ${currentNetwork.name}`
                            );
                        })
                        .catch((error) => {
                            console.error(error);
                            setNetwork('Failed to add Polygon network');
                        });
                })
                .catch((error) => {
                    console.error(error);
                    setNetwork('Failed to switch network');
                });
        } else {
            setNetwork('MetaMask is not installed');
        }
    };

    return (
        <div>
            <h1>Network</h1>
            <h1>{network}</h1>
            <button onClick={switchNetwork}>Switch Network</button>
        </div>
    );
};

export default Network;
