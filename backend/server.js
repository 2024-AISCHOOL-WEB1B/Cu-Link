// server.js - 서버 실행 코드 (backend/server.js)
const express = require('express');
const conn = require('./config/db'); // db.js 모듈 불러오기

const app = express();
const PORT = process.env.PORT || 3000;

// 예시 라우트
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// DB 연결 테스트 라우트
app.get('/db-test', (req, res) => {
    conn.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('쿼리 실행 오류:', err);
            res.status(500).send('DB 쿼리 오류');
        } else {
            res.send(`쿼리 결과: ${results[0].solution}`);
        }
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});