import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Singleitem from "./Components/Singlanbum/Singleitem";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="singleitem" element={<Singleitem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
