var x="",i,j;
var obj=JSON.parse(#{data})
document.getElementById("demo").innerHTML = obj;
for (i in obj) {
    x += "<h2>" + obj[i].coursename + "</h2>";
    x += "<h2>" + obj[i].coursecode + "</h2>";  
}
document.getElementById("demo").innerHTML = x;