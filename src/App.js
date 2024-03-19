import Connect from './Components/Connect';
import AccountSwitcher from "./Components/SwitchAccount";
import Network from './Components/Network';

function App() {
    return (
      <div>
        <Connect buttontext="Connect wallet"/>;
        <AccountSwitcher />
        <Network />
      </div>
    );
}

export default App;
