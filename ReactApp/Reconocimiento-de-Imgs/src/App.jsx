
import { ReactP5Wrapper } from "react-p5-wrapper";
import { LabelsList } from "./components/LabelsList";
import { sketch } from "./components/sketch";
import { Sketchcontainer } from './components/Sketchcontainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";




function App() {
  /*return */
  return (
  <BrowserRouter>
    
      <Header />
    
    <Routes>
      <Route path="/" element={<LabelsList />} />

      <Route path="/historia/:indice1" element={<Sketchcontainer></Sketchcontainer>} />

    </Routes>
  </BrowserRouter>)

}
export default App;
