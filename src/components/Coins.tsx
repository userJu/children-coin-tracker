import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: auto;
  background-color: ${(props) => props.theme.bgColor};
`;

const Header = styled.div`
  width: 100%;
  height: 20vh;
  h1 {
    font-size: 3rem;
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CoinsBar = styled.ul`
  width: 100%;
`;
const CoinBar = styled.li`
  background-color: ${(props) => props.theme.mainColor};
  width: 70%;
  margin: auto;
  margin-bottom: 0.5rem;
  padding: 0.6rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  img {
    width: 3rem;
    height: 3rem;
  }
  span {
    font-size: 1.1rem;
    color: black;
  }
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
      <Header>
        <h1>Coins</h1>
      </Header>
      <div>
        <button>상승률</button>
        <button>가격</button>
        <button>관심</button>
      </div>
      <Main>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <CoinsBar>
            {data?.slice(0, 100).map((coin) => (
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name, rank: coin.rank }}
              >
                <CoinBar key={coin.id}>
                  <img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <span>{coin.name}</span>
                </CoinBar>
              </Link>
            ))}
          </CoinsBar>
        )}
      </Main>
    </Container>
  );
}

export default Coins;
