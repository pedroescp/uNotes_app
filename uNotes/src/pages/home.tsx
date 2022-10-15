import TextEditor from "../TextEditor";
import NavBar from "../components/Navbar";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <TextEditor />
      <button className="dark:text-white">+</button>
    </div>
  );
}

export default Home;
