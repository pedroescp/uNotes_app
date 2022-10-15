import { Routes, Route, redirect} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import PageNotFound from "./pages/PageNotFound";
import Password from "./pages/password";
import TextEditor from "./TextEditor";
import { v4 as uuidV4 } from "uuid";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          {/* {<Redirect to={`/document/${uuidV4()}`} />} */}
        </Route>
        <Route path="password" element={<Password />} />
{/* {        <Route path="/document:id">
          <TextEditor />
        </Route>} */}
      </Routes>
    </div>
  );
}

export default App;
