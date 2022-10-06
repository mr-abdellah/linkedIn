import "./app.css";
import Header from "./app/Header/Header";
import Sidebar from "./app/Sidebar/Sidebar";
import Feed from "./app/Feed/Feed";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}

export default App;
