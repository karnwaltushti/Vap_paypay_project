var util=require('util');
    fs=require('fs');
    _=require('lodash')
const readFile=util.promisify(fs.readFile);
var c_code=[]
var c_name=[]
var prof=[]

function rend(req,res,c_code,c_name,prof){
    res.render('allcourses',{
        
        user_id:req.session.user_id,
        c_code:c_code,
        c_name:c_name,
        prof:prof
    })
}
exports.courses=function(req, res){
    c_code=[]
    c_name=[]
    prof=[]
readFile('course_registered.json','utf-8')
    .then((data)=>{
        obj=JSON.parse(data)
        return(obj)
        console.log(obj)
        //console.log(obj)
    })
    .then((obj)=>{
        for(var i=0;i<obj.length;i++){
            if(obj[i]['student']==req.session.user_id){
                c_code.push(obj[i]['coursecode'])
                c_name.push(obj[i]['coursename'])
                prof.push(obj[i]['professor'])
            }
        }
    })
    .then((obj)=>{
        setTimeout(rend,200,req,res,c_code,c_name,prof)
        console.log(c_code)
        console.log(c_name)
    })
    .catch((err)=>console.log(err))
    
}
