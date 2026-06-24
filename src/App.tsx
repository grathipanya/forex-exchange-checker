import { Converter } from "./components/organisms/converter";
import { CurrencyDetails } from "./components/organisms/currency-details";
import { Header } from "./components/organisms/header/";
import { MarketTicker } from "./components/organisms/market-ticker";
import { Layout } from "./components/templates/layout";

function App() {
  return (
    <>
      <Header />
      <MarketTicker />

      <Layout>
        {/* Main content goes here */}
        <Converter />
        <CurrencyDetails />
      </Layout>
    </>
  );
}

export default App;
