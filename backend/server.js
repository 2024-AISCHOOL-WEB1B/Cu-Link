const express = require('express');
const mainRouter = require('./routes/mainRouter'); // 메인 라우터 불러오기

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.use('/', mainRouter);

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
