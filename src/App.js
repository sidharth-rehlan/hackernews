import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
