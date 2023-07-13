import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import { useEffect } from "react";

function Router() {
  useEffect(() => {
    if (!document.cookie) return;
    const tokenParts = document.cookie.split("=");
    localStorage.setItem(tokenParts[0], tokenParts[1]);
  }, []);
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
