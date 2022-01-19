import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

interface ICoins {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("coins", fetchCoins);
  return (
    <Container>
      <h1>Coins</h1>
      <div>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <ul>
            {data?.slice(0, 100).map((coin) => (
              <li key={coin.id}>
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name, rank: coin.rank }}
                >
                  <img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                </Link>
                {coin.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

export default Coins;
