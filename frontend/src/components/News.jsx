import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  // 데이터를 저장할 상태 정의
  const [newsData, setNewsData] = useState([]);

  // 데이터를 백엔드에서 가져오기 위한 useEffect 사용
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/'); // 백엔드에서 데이터를 GET 요청
        console.log(response.data); // 데이터 확인용 로그
        setNewsData(response.data); // 데이터 저장
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  // 데이터를 화면에 표시
  return (
    <div>
      <h1>News Articles</h1>
      {Array.isArray(newsData) && newsData.length > 0 ? (
        newsData.map((news) => (
          <div key={news.art_id}>
            <h2>{news.art_title}</h2>
            <p>{news.art_content}</p>
            <img src={news.art_img} alt={news.art_title} style={{ maxWidth: '100%' }} />
            <p>출처: <a href={news.art_url} target="_blank" rel="noopener noreferrer">{news.art_company}</a></p>
            <p>게시 날짜: {new Date(news.art_date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default News;
