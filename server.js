const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extened:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
    const cityName=req.body.cityname;
    const appId ="281a5410713e06b857bf17aea2978ed7";
    const units ="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+ appId+"&units="+units +"";
  https.get(url,function(response){
      response.on("data",function(data){
        const jsonData =JSON.parse(data);
        const tempData =jsonData.main.temp_max;
        console.log(tempData);
        res.write("the temp :" + tempData);
        res.send();
      });
      
  });
 

});





app.listen(3000,()=>
console.log("server started at port 3000")
);