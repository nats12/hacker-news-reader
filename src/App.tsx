import React from "react";
import Header from "./components/Header";
import StoriesList from "./components/StoriesList";

function App() {
  return (
    <div className="App" data-test="component-app">
      <Header />
      <StoriesList />
    </div>
  );
}

export default App;
