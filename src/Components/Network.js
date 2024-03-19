import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Network = () => {
    const [network, setNetwork] = useState();

    useEffect(() => {
        const fetchNetwork = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const network = await provider.getNetwork();
                setNetwork(`${network.chainId}: ${network.name}`);
            } else {
                setNetwork("Meta mask is not installed");
            }
        };
        fetchNetwork();
    }, []);

    return (
        <div>
            <h1>Network</h1>
            <h1>{network}</h1>
        </div>
    );
};

export default Network;