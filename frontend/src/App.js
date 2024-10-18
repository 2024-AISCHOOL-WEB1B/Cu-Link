import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./page/Main";
import Baner from "./components/Baner";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import News from "./components/News";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // 모든 기사를 저장할 상태
  const [articles, setArticles] = useState([]);
  // 필터링된 기사를 관리할 상태
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    // 페이지 로드 시 모든 기사를 가져오는 함수
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/'); // DB에서 모든 기사 가져오기
        setArticles(response.data); // 모든 기사를 상태에 저장
        setFilteredArticles(response.data); // 초기에는 필터링된 기사도 전체 기사로 설정
      } catch (error) {
        console.error('뉴스 데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchArticles();
  }, []); // 페이지 로드 시 한 번만 실행

  return (
    <div>
      <Baner />
      <div className="app-container">
        <div className="search-bar-container">
          {/* 필터링된 결과를 설정하는 함수를 전달 */}
          <SearchBar articles={articles} setFilteredArticles={setFilteredArticles} />
        </div>
        <div className="news-container">
          {/* 필터링된 결과를 News 컴포넌트에 전달 */}
          <News articles={filteredArticles} />
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
