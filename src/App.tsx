import React from "react";
import Home from "./components/pages/Home";
import { NavigationBar } from "./components/NavBar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <NavigationBar />
      <Header />
      <Home />
    </>
  );
}

export default App;
