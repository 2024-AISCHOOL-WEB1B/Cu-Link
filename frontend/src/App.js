import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./page/Main";
import Baner from "./components/Baner";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div>
      <Baner />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
      <Main />
    </div>
  );
}

export default App;
