
var fs=require('fs');
const util=require('util');
var _ = require('lodash');
const readFile=util.promisify(fs.readFile);

var mess="";

exports.action=function(req,res){
    console.log(req.query)
    res.render("page",{
        message:"Course Creation",
        data:JSON.stringify(req.query),
        user_id:req.session.user_id
    })
    
}
var bodyParser=require('body-parser');

var obj = {};
var obj1=[];
exports.addpost=function(req,res){
        console.log("Add post");
       // obj.push({coursename: req.body.coursename, coursecode:req.body.coursecode,professor:req.body.professor});
        //var json = JSON.stringify(obj);
        
        readFile('course_details.json','utf-8')
            .then((data)=>{
                obj=JSON.parse(data)
                return(obj)
                //console.log(obj)

            })
            .then((obj)=>{
                
                if(_.findIndex(obj, { 'coursename': req.body.coursename, 'coursecode':req.body.coursecode,'professor':req.body.professor})==-1){
                        obj.push({coursename: req.body.coursename, coursecode:req.body.coursecode,professor:req.body.professor}); //add some data
                        json = JSON.stringify(obj); //convert it back to json
                        fs.writeFileSync('course_details.json', json, 'utf8')
                }
            })
            
            .catch((err)=>console.log(err))
        /*fs.readFile('course_details.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } 
            else {
            obj = JSON.parse(data); //now it an object
            obj.push({coursename: req.body.coursename, coursecode:req.body.coursecode,professor:req.body.professor}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFileSync('course_details.json', json, 'utf8')
            }
        });*/

        
        var json = require('./courses.json');
        //JSON.parse(json);
        //console.log(json)
        //obj.coursecode.push (req.body.coursecode);
        var l=json['coursecode']
        console.log(l)
        if(_.findIndex(l, function(o) { return o == req.body.coursecode; })==-1){
            l.push(req.body.coursecode)
        }
        
        console.log(l)
        var j=JSON.stringify(json);
        //console.log(j)
        fs.readFile('courses.json', 'utf8', function readFileCallback(err, dat){
            if (err){
                console.log(err);
            } 
            else {
                fs.writeFileSync('courses.json', j, 'utf8')
            }
        });
        

        //console.log(req.body.coursename)
        res.render("course_created",{
            message:"Course Successfully Added",
            data:JSON.stringify(req.query)
        })

    }



