import { Header } from "./components/organisms/header/";
import { MarketTicker } from "./components/organisms/market-ticker";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <MarketTicker />
    </div>
  );
}

export default App;
