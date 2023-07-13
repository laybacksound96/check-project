import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import { router } from "./Router";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
