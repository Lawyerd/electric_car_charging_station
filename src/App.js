import Header from "./components/Header.js";
import Map from "./components/Map";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Map />
      </BrowserRouter>
    </>
  );
}

export default App;
