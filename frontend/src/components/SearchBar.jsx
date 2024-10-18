import React, { useState } from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ articles, setFilteredArticles }) => {
  // 상태 관리 부분: 키워드, 조건, 체크박스, 날짜 범위 설정
  const [keyword, setKeyword] = useState('');
  const [conditions, setConditions] = useState([]);
  const [checkedConditions, setCheckedConditions] = useState([]); // AND/OR 구분
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 조건 추가 버튼 핸들러 (최대 4개의 조건)
  const handleAddCondition = () => {
    if (conditions.length < 4) {
      setConditions([...conditions, '']);
      setCheckedConditions([...checkedConditions, false]);
    }
  };

  // 조건 삭제 핸들러
  const handleDeleteCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
    const newCheckedConditions = checkedConditions.filter((_, i) => i !== index);
    setCheckedConditions(newCheckedConditions);
  };

  // 필터링 로직
  const filterArticles = () => {
    let filtered = articles;

    // 키워드 필터링 (본문에서만 검색)
    if (keyword) {
      filtered = filtered.filter(article =>
        article.art_content.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // AND 조건 필터링
    conditions.forEach((condition, index) => {
      if (checkedConditions[index]) { // AND 조건일 때
        filtered = filtered.filter(article =>
          article.art_content.toLowerCase().includes(condition.toLowerCase())
        );
      }
    });

    // OR 조건 필터링
    const orConditions = conditions.filter((_, index) => !checkedConditions[index]);
    if (orConditions.length > 0) {
      filtered = filtered.filter(article =>
        orConditions.some(condition =>
          article.art_content.toLowerCase().includes(condition.toLowerCase())
        )
      );
    }

    // 날짜 필터링
    if (startDate && endDate) {
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.art_date);
        return articleDate >= new Date(startDate) && articleDate <= new Date(endDate);
      });
    }

    // 필터링된 결과를 App.js로 전달
    setFilteredArticles(filtered);
  };

  // 검색 버튼 클릭 시 필터링 실행
  const handleSearch = () => {
    filterArticles();
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="search-bar">
      {/* 키워드와 조건 UI */}
      <div className="keyword-inputs">
        <div className="condition-input">
          <input
            type="text"
            placeholder="키워드를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input keyword-first"
          />
        </div>
        {conditions.map((condition, index) => (
          <div key={index} className="condition-input condition-animated">
            <input
              type="checkbox"
              checked={checkedConditions[index] || false}
              onChange={() => {
                const newChecked = [...checkedConditions];
                newChecked[index] = !newChecked[index];
                setCheckedConditions(newChecked);
              }}
              className="condition-checkbox"
            />
            <input
              type="text"
              placeholder="키워드를 입력해주세요"
              value={condition}
              onChange={(e) => {
                const newConditions = [...conditions];
                newConditions[index] = e.target.value;
                setConditions(newConditions);
              }}
              className="search-input"
            />
            <button onClick={() => handleDeleteCondition(index)} className="delete-condition-button">X</button>
          </div>
        ))}
        <button onClick={handleAddCondition} className="add-condition-button">+</button>
      </div>

      <div className="separator"></div>
      <p className="time-title">기간</p>
      <div className="date-range">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={currentDate}
          className="date-input"
        />
        <span> - </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={currentDate}
          className="date-input"
        />
      </div>

      <div className="separator"></div>
      <div className='space'></div>

      <button className="search-submit" onClick={handleSearch}>
        기사 찾기 ➨
      </button>
    </div>
  );
};

export default SearchBar;
