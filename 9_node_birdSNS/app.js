const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //logging
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');

dotenv.config(); // process.env
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
   express: app,
   watch: true,
});

sequelize
   .sync({ force: false }) // 개발 시 true 배포 시 false
   .then(() => {
      console.log('DB 연결 성공');
   })
   .catch(err => {
      console.error(err);
   });

app.use(morgan('dev'));
app.use(cookieParser());

app.use(morgan('dev')); // 개발모드 logging
app.use(express.static(path.join(__dirname, 'public'))); // front에서 접근 가능한 폴더
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // req.body를 ajax json 요청으로부터
app.use(express.urlencoded({ extended: false })); //form 요청 // req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET)); //{ connect.sid : 21   12321312 }
app.use(
   session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
         httpOnly: true,
         secure: false,
      },
   }),
);
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticated, req.logout
app.use(passport.session()); //connect.sid 이름으로 세션 쿠키가 브라우저로 전송

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
   error.status = 404;
   next(error);
});

app.use((err, req, res, next) => {
   res.locals.message = err.message;
   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
   res.status(err.status || 500);
   res.render('error');
});

app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중');
});
