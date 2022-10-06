import "./app.css";
import Header from "./app/Header/Header";
import Sidebar from "./app/Sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
