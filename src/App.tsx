import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Archive from "./pages/archive";
import Home from "./pages/home";
import Login from "./pages/login";
import Note from "./pages/note";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/profile";
import Trash from "./pages/trash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/note" element={<Note />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}

export default App;
