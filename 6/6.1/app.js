const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session= require('express-session');

const dotenv = require('dotenv');
dotenv.config();



const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(express.static(path.join(__dirname, 'public')));
//localhost:3000/test.html 실제 경로 : learn-express/public/test.html  
app.use(session({
    resave: false, 
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET, // 암호화
    cookie : {
        httpOnly : true,
    },
    name : 'connect.sid' // default 
}));
app.use(express.json()); // json 데이터 파싱
app.use(express.urlencoded({ extended : true })); // form submit 데이터 파싱 ture 면 qs, false면 querystring



app.use((req, res , next)=>{
    console.log('모든 요청에 실행하고싶어요 1');
    next();
});

app.get('/', (req,res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/category/javascript', (req,res)=>{
    res.send('hello!! javascript');
})
 
app.get('/about', (req,res) => {
    res.send('hello express');
})

app.get('/category/:name', (req,res,next) => { //와일드카드는 밑에서 실행 해야 함
    res.send(`hello ${req.params.name}`)
})

app.use((req, res, next)=> { 
    console.error(err);
    res.status(404).send('에러처리');
})

app.listen(app.get('port'),() => {
    console.log('익스프레스 서버 실행');
});