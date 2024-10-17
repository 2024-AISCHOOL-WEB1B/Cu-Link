import React from 'react'
import '../css/Baner.css';


function Baner() {
  return (
    <div className='banner'>
      <div className='left-item'>
        <h1>Cu-Link</h1>
        <p>레포트가 쉬워지다</p>
      </div>
      <div className='mid-item'>
      <span>사용법</span>
      <span>|</span>
      <span>내 기사</span>
      </div>
      
      <div className='right-item'>
      <span>로그인</span>
      <span>|</span>
      <span>회원가입</span>
      </div>
      

    </div>
  )
}

export default Baner