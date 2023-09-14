import Accordion from "./components/Accordion/Accordion";
import DeleteBox from "./components/DeleteBox/DeleteBox";
import data from "./celebrities.json";

function App() {
  return (
    <div className="App">
      <DeleteBox />
      {data.map((data) => (
        <Accordion user={data} />
      ))}
    </div>
  );
}

export default App;
