import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import PageNotFound from "./pages/PageNotFound";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
