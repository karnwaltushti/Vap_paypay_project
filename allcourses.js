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
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');
var obj;
const readFile=util.promisify(fs.readFile);
readFile('course_details.json','utf-8')
        .then((data)=>{
            obj=JSON.parse(data)
        })
        .catch((err)=>console.log(err))
obj={'name':'Tushti','id':'17bce1028'}
app.get('/allcourses',function(req,res){
    console.log(JSON.stringify(obj))
    res.sendFile('allcourses.html', { root : "C:/f/python/VAP/project/view"})
    /*res.render('allcourses', {
        data:JSON.stringify(obj)
    });*/
})

app.listen(3000);