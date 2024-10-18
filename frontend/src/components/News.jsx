import React, { useState } from 'react';
import '../css/News.css'; // 필요한 CSS 파일 import

const News = ({ articles }) => {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const pageRange = 5; // 페이지 네이션에서 보여줄 페이지 수

  // 현재 페이지에 맞는 기사를 반환하는 함수
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (article) => {
    if (selectedArticles.includes(article)) {
      setSelectedArticles(selectedArticles.filter(item => item !== article));
    } else {
      setSelectedArticles([...selectedArticles, article]);
    }
  };

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (selectedArticles.length === currentArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(currentArticles);
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // 현재 페이지 범위에서 보여줄 페이지네이션 버튼 생성
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  return (
    <div className="news-container">
      <div className="select-all">
        <button onClick={handleSelectAll}>전체선택</button>
        <span>{`선택된 기사 ${selectedArticles.length}개 / 총 ${articles.length}개`}</span>
      </div>
      <div className="articles">
        {currentArticles.map((news) => (
          <div key={news.art_id} className="article">
            {/* 체크박스 */}
            <input 
              type="checkbox" 
              className="article-checkbox" 
              checked={selectedArticles.includes(news)} 
              onChange={() => handleCheckboxChange(news)} 
            />
            {/* 기사 내용 */}
            <div className="article-content" onClick={() => window.open(news.art_url, '_blank')}>
              <div className="article-header">
                <h3>{news.art_title}</h3>
                <p>{new Date(news.art_date).toLocaleDateString()}</p>
              </div>
              <div className="article-body">
                <p>{news.art_content.length > 100 ? `${news.art_content.slice(0, 100)}...` : news.art_content}</p>
              </div>
              {/* 이미지 */}
              <div className="article-image">
                <img src={news.art_img} alt={news.art_title} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="pagination">
        {startPage > 1 && (
          <button onClick={() => handlePageChange(startPage - 1)}>&laquo;</button>
        )}
        {[...Array(endPage - startPage + 1).keys()].map(page => (
          <button 
            key={page + startPage} 
            onClick={() => handlePageChange(page + startPage)} 
            className={currentPage === page + startPage ? 'active' : ''}
          >
            {page + startPage}
          </button>
        ))}
        {endPage < totalPages && (
          <button onClick={() => handlePageChange(endPage + 1)}>&raquo;</button>
        )}
      </div>
    </div>
  );
};

export default News;
