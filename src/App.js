import { useState } from 'react';
import Connect from './Components/Connect';
import AccountSwitcher from './Components/SwitchAccount';
import Network from './Components/Network';

function App() {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        setIsConnected(true);
    };

    return (
        <div>
            {!isConnected && (
                <Connect
                    buttontext="Connect to MetaMask"
                    onConnect={handleConnect}
                />
            )}
            {isConnected && <Network />}
            {isConnected && <AccountSwitcher />}
        </div>
    );
}

export default App;
