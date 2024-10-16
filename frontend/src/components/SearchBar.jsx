import React, { useState } from 'react';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [conditions, setConditions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleConditionChange = (index, e) => {
    const newConditions = [...conditions];
    newConditions[index].value = e.target.value;
    setConditions(newConditions);
  };
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);
  const handleAddCondition = () => {
    if (conditions.length < 4) {
      setConditions([...conditions, { type: 'AND', value: '' }]);
    }
  };
  const handleSearch = () => {
    console.log("Searching with:", { keyword, conditions, startDate, endDate });
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="search-bar">
      <div className="search-buttons">
        <input
          type="text"
          placeholder="키워드를 입력해주세요"
          value={keyword}
          onChange={handleKeywordChange}
          className="search-input"
        />
        {conditions.map((condition, index) => (
          <div key={index} className="condition-input">
            <input
              type="text"
              placeholder={condition.type}
              value={condition.value}
              onChange={(e) => handleConditionChange(index, e)}
              className="search-input"
            />
          </div>
        ))}
        <div className="add-condition-button">
          <button onClick={handleAddCondition} className="and-or-button">
            +
          </button>
        </div>
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

      <button className="search-submit" onClick={handleSearch}>
        기사 찾기 ➨
      </button>
    </div>
  );
};

export default SearchBar;