var express=require('express');
var app=express();
var fs=require('fs');
app.set('view engine','pug');
app.set('views','./view');
/*app.get('/select',function(req,res){
    res.render("page_select",{
        message:"Select a course to register",
        $(function() {
            var data = [
                {
                "id": "1",
                "name": "test1"},
            {
                "id": "2",
                "name": "test2"}
            ];
            $.each(data, function(i, option) {
                $('#sel').append($('<option/>').attr("value", option.id).text(option.name));
            });
        })
    });
})*/
app.get("/action",function(req,res){
    console.log(req.query)
    res.render("page",{
        message:"Course Creation",
        data:JSON.stringify(req.query)
    })
})
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded(
    {extended:false})
)
var obj = {};
 
    app.post('/addpost',function(req,res){
        console.log("Add post");
       // obj.push({coursename: req.body.coursename, coursecode:req.body.coursecode,professor:req.body.professor});
        //var json = JSON.stringify(obj);
        fs.readFile('course_details.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } 
            else {
            obj = JSON.parse(data); //now it an object
            obj.push({coursename: req.body.coursename, coursecode:req.body.coursecode,professor:req.body.professor}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFileSync('course_details.json', json, 'utf8')
            }
        });
        fs.readFile('courses.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } 
            else {
            obj = JSON.parse(data['coursecode']); //now it an object
            obj.append(req.body.coursecode); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFileSync('courses.json', json, 'utf8')
            }
        });
        console.log(req.body.coursename)
        res.render("course_created",{
            message:"Course Successfully Added",
            data:JSON.stringify(req.query)
        })

    })



app.listen(3000);