import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import Router from "./Router";
import { Body, GlobalStyle } from "./Style/App";
import { RecoilRoot } from "recoil";
import Footer from "./components/Ui/Footer";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <GlobalStyle />
        <Body>
          <Router />
          <Footer />
        </Body>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
