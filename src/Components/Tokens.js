import { useEffect, useState } from 'react';
import axios from 'axios';

const TokensTable = ({ contract }) => {
    const [mintedTokens, setMintedToknes] = useState([]);
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        const fetchMintedTokens = () => {
            axios
                .get('http://localhost:3003/tokens?sortBy=' + sortBy)
                .then((response) => {
                    setMintedToknes(response.data);
                })
                .catch((err) => {
                    console.error('error fetching data', err);
                });
        };
        fetchMintedTokens();
    }, [sortBy]);

    return (
        <div>
            <h1>Minted Tokens</h1>
            <label>
                Sort By:
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="date">Date</option>
                    <option value="balance">Highest Minted Tokens</option>
                </select>
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {mintedTokens.map((token, index) => (
                        <tr key={index}>
                            <td>{token.address}</td>
                            <td>{token.amount}</td>
                            <td>
                                {new Date(token.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TokensTable;
