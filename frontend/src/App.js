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
      <SearchBar />
      <News />
      <Modal />
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
      <Main />
    </div>
  );
}

export default App;
