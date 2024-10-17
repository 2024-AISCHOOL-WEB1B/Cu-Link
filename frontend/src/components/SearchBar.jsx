import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  // 상태 관리 부분: 키워드, 조건, 체크박스, 날짜 범위 설정
  const [keyword, setKeyword] = useState('');
  const [conditions, setConditions] = useState([]);
  const [checkedConditions, setCheckedConditions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 키워드 입력 변경 핸들러
  const handleKeywordChange = (e) => setKeyword(e.target.value);
  
  // 조건 입력 변경 핸들러
  const handleConditionChange = (index, e) => {
    const newConditions = [...conditions];
    newConditions[index] = e.target.value;
    setConditions(newConditions);
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (index) => {
    const newCheckedConditions = [...checkedConditions];
    newCheckedConditions[index] = !newCheckedConditions[index];
    setCheckedConditions(newCheckedConditions);
  };

  // 시작 날짜와 종료 날짜 변경 핸들러
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

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

  // 날짜 문자열을 MySQL DATETIME 형식으로 변환하는 함수
  const convertToMySQLDatetime = (dateStr) => {
    try {
      if (!dateStr) return null;
      const dateObj = new Date(dateStr);
      return dateObj.toISOString().slice(0, 19).replace('T', ' ');
    } catch (e) {
      console.error("날짜 변환 오류:", e);
      return null;
    }
  };

  // 검색 버튼 클릭 시 조건 분류 및 백엔드에 요청
  const handleSearch = async () => {
    const andConditions = conditions.filter((_, index) => checkedConditions[index]).map(cond => cond);
    const orConditions = conditions.filter((_, index) => !checkedConditions[index]).map(cond => cond);
    const formattedStartDate = convertToMySQLDatetime(startDate);
    const formattedEndDate = convertToMySQLDatetime(endDate);

    const requestData = {
      keyword,
      conditions: {
        and: andConditions,
        or: orConditions
      },
      dateRange: {
        start: formattedStartDate,
        end: formattedEndDate
      }
    };

    console.log('전달할 데이터:', requestData);
    try {
      const response = await axios.post('http://localhost:3000/search', requestData);
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('서버 요청 오류:', error);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="search-bar">
      <div className="keyword-inputs">
        {conditions.length > 0 && (
          <p className="include-title">포함</p>
        )}
        <div className="condition-input">
          <input
            type="text"
            placeholder="키워드를 입력해주세요"
            value={keyword}
            onChange={handleKeywordChange}
            className="search-input keyword-first"
          />
        </div>
        {conditions.map((condition, index) => (
          <div key={index} className="condition-input condition-animated">
            <input
              type="checkbox"
              checked={checkedConditions[index] || false}
              onChange={() => handleCheckboxChange(index)}
              className="condition-checkbox"
            />
            <input
              type="text"
              placeholder="키워드를 입력해주세요"
              value={condition}
              onChange={(e) => handleConditionChange(index, e)}
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
          onChange={handleStartDateChange}
          max={currentDate}
          className="date-input"
        />
        <span> - </span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
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
