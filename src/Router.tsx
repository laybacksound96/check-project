import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import AddAccount from "./components/Ui/Modal/ModalContents/AddAccount";

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
