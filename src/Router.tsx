import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./page/Home";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app">
          <div>asdasd</div>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
