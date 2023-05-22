import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import Router from "./Router";
import { Body, GlobalStyle } from "./Style/App";
import { RecoilRoot } from "recoil";
import Footer from "./components/Ui/Footer";
import Modal from "./components/Ui/Modal";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <GlobalStyle />
        <Modal />
        <Body>
          <Router />
          <Footer />
        </Body>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
