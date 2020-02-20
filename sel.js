var data=require('./courses.json'),
    fs=require('fs')
//var course_creation = require('./routes/course_creation');
const readFile=util.promisify(fs.readFile);
var mess;

exports.login=function(req,res){
    res.render("login",{
        mess:"Login"
    });
    console.log("Enetered")
    
}
exports.l= function (req, res) {
    var post = req.body;
    readFile('login_credentials.json','utf-8')
        .then((data)=>{
            obj=JSON.parse(data)    
            console.log(obj)    
            if(_.findIndex(obj, { 'id': post.id, 'password':post.password})==-1){
                res.send('Bad user/pass');
                res.redirect('/invalid');
            }
            else{
                req.session.user_id = post.id;
                res.redirect('/drop');
            }
            
        })
    
        .catch((err)=>console.log(err))
    /*if (post.id === '17bce1028' && post.password === 'tushti') {
      req.session.user_id = "tushti";
      res.redirect('/drop');
    } else {
      res.send('Bad user/pass');
      res.redirect('/invalid');
    }*/
};
exports.checkAuth=function (req, res, next) {
    if (!req.session.user_id) {
      res.send('You are not authorized to view this page, Login!');
    } else {
      next();
    }
  }

exports.invalid=function(req,res){
    console.log(req.query)
    res.render("invalid",{
        message:mess
        //data:JSON.stringify(req.query)
    })
}
/*app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/drop' + req.user.username);
  });*/
var r="0";
exports.drop= function (req, res) {
    res.render('dropdownmenu', {
        Courses: data['coursecode'],
        user_id:req.session.user_id
    })
    /*readFile('login_credentials.json','utf-8')
        .then((data)=>{
            obj=JSON.parse(data)    
            console.log(obj)    
            if(_.findIndex(obj, { 'id': req.body.id, 'password':req.body.password})==-1){
                mess="Invalid Username/Password";
                console.log("Incorrect");
                r="1";
                res.redirect('/invalid');
            }
            else{
                console.log("Correct")
            }
            
        })
    
        .catch((err)=>console.log(err))*/
};
function rend(req,res,cr){
    res.render('Courseopted',{
        course: req.body.dropDown,
        id:req.session.user_id,
        prof:cr['professor']
    })
}

exports.courseOpted=function(req, res){
    var cr={'coursecode':'','coursename':'','professor':''}
    readFile('course_details.json','utf8')
        .then((data)=>{
            obj=JSON.parse(data);
            //console.log(obj)
            for(var i = 0; i < obj.length; i++) {
                var k = obj[i]['coursecode'];
                if(k==req.body.dropDown){
                    //console.log(k)
                    cr['coursecode']=obj[i]['coursecode'];
                    cr['coursename']=obj[i]['coursename'];
                    cr['professor']=obj[i]['professor'];
                }
            }
            console.log(cr)
    })
    readFile('course_registered.json','utf-8')
        .then((data)=>{
            obj=JSON.parse(data)
            return(obj)
            //console.log(obj)
        })
        .then((obj)=>{ 
            if(_.findIndex(obj, { 'student': req.session.user_id, 'coursecode':req.body.dropDown,'coursename':cr['coursename'],'professor':cr['professor']})==-1){
                obj.push({student: req.session.user_id, coursecode:req.body.dropDown,coursename:cr['coursename'],professor:cr['professor']}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFileSync('course_registered.json', json, 'utf8')
            }
        })
        .catch((err)=>console.log(err))
    setTimeout(rend,200,req,res,cr)
    
}


//app.get("/", course_creation.);
