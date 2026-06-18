import { useEffect, useState } from "react";
import { Header } from "./components/organisms/header/";
import { currencyApi } from "./services/currencyApi";

function App() {
  const [latestRateData, setLatestRateData] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchRateData() {
      try {
        const response = await currencyApi.getLatestRates("USD");
        setLatestRateData(JSON.stringify(response, null, 2));
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      }
    }
    fetchRateData();
    console.log(latestRateData);
  });

  return (
    <>
      <Header />
      <h1 className="text-3xl font-bold underline">Clean app</h1>
      {error && <p className="text-red-500">{error}</p>}
      {/* {latestRateData && <pre>{latestRateData}</pre>} */}
    </>
  );
}

export default App;
