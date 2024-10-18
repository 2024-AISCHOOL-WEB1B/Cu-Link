import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./page/Main";
import Baner from "./components/Baner";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import News from "./components/News";

function App() {
  return (
    <div>
      <Baner />
      <div className="app-container">
        <div className="search-bar-container">
          <SearchBar />
        </div>
        <div className="news-container">
          <News />
        </div>
      </div>
      <Modal />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
