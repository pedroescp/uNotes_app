import TextEditor from "../TextEditor";

function Home() {
  return (
    <div className="App">
      <div className="flex items-center justify-center py-56">
        <div className="gap-7 flex items-center justify-center flex-col rounded-md border w-auto shadow-default border-default">
        <TextEditor />
        </div>
        
      </div>
    </div>
  );
}

export default Home;
