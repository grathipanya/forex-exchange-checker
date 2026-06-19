import { Converter } from "./components/organisms/converter";
import { Header } from "./components/organisms/header/";
import { MarketTicker } from "./components/organisms/market-ticker";
import { Layout } from "./components/templates/layout";

function App() {
  return (
    <div>
      <Header />
      <MarketTicker />

      <Layout>
        {/* Main content goes here */}
        <Converter />
      </Layout>
    </div>
  );
}

export default App;
