import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/:userId">
          <Dashboard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
