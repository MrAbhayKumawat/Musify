import { BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>{/* <Route path='/' Component={Home}/> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
