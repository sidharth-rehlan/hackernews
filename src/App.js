import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Switch>
        {/* Do we really need a switch? */}
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
