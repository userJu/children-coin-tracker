import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { detailCoin, tickersCoin } from "../api";

interface ICoinState {
  state: { name: string; rank: number };
}

interface IDetail {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as ICoinState;
  const { isLoading: detailIsLoading, data: detailData } = useQuery<IDetail>(
    ["Detail", coinId],
    () => detailCoin(coinId!)
  );
  const { isLoading: tickersIsLoading, data: tickersData } = useQuery<ITickers>(
    ["Tickers", coinId],
    () => tickersCoin(coinId!)
  );

  return (
    <div>
      <h1>{state.name}</h1>
      {detailIsLoading || tickersIsLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div>
            <div>
              <span>Rank:</span>
              <span>{state.rank}</span>
            </div>
            <div>
              <span>Price:</span>
              <span>$ {tickersData?.quotes.USD.price}</span>
            </div>
          </div>
          <p>{detailData?.description}</p>
          <div>
            <div>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </div>
            <div>
              <span>Max Suply:</span>
              <span>{tickersData?.max_supply}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Coin;
