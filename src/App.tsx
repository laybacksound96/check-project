import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import Router from "./Router";
import { GlobalStyle } from "./Style/App";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
