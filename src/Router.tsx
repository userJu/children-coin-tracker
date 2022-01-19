import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./components/Coin";
import Coins from "./components/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
