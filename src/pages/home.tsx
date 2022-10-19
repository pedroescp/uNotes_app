import TextEditor from "../TextEditor";
import NavBar from "../components/Navbar";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <TextEditor />
      <div className="button-default-plus">
        <button className="button-default">
          +
        </button>
      </div>
    </div>
  );
}

export default Home;
