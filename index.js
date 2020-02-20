var express = require('express'),
    app = express(),
    pug = require('pug'),
    spawn = require('child_process').spawn, child,
    data = require('./courses.json'),
    path = require('path'),
    bodyparser = require('body-parser');
    util=require('util');
    fs=require('fs');
    _=require('lodash')

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(express.static('view'));
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.use(bodyparser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

var sel = require('./sel');
var course_creation=require('./course_creation')
var home=require('./home')
var course=require('./course')

app.get('/home',home.h)
app.get('/login',sel.login)
app.post('/log',sel.l)
app.post('/invalid',sel.invalid)
app.get("/drop",sel.checkAuth,sel.drop)
app.post("/CourseOpted" , sel.courseOpted)

app.get("/action",sel.checkAuth,course_creation.action)
app.post('/addpost',course_creation.addpost)

app.get('/courses',sel.checkAuth,course.courses)
app.listen(8000)