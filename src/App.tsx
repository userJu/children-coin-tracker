import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./Globalstyles";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </>
  );
}

export default App;
