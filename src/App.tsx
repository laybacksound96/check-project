import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import Router from "./Router";
import { GlobalStyle, Wrapper } from "./Style/App";
import { RecoilRoot } from "recoil";

import Footer from "./components/Ui/Footer";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <GlobalStyle />
        <Wrapper>
          <Router />
          <Footer />
        </Wrapper>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
