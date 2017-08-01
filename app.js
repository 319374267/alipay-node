/**
 * Created by ference on 2017/4/8.
 */
var express = require("express");
var bodyParser = require("body-parser");
var url = require("url");
var querystring = require("querystring");
var app = express();
var path = require('path');
var Alipay = require('./lib/alipay');


/**
 * configuration
 * */
app.engine('.html', require('ejs').__express);
app.set('views','./views');
app.set("view engine","html");
app.use('/', express.static(path.join(__dirname, 'views')));


app.use('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,cache-control");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

var outTradeId = Date.now().toString();

app.use(bodyParser.json({limit:'1000kb'}));
app.use(bodyParser.urlencoded({extended: true}));

var ali = new Alipay({
    appId:"2016080600180177",
    notifyUrl:"http://www.morefuntrip.com/index.html",
    returnUrl:"http://www.morefuntrip.com/index.html",
    rsaPrivate:path.resolve('./lib/pem/rsa_private_key.pem'),
    rsaPublic:path.resolve('./lib/pem/rsa_public_key.pem'),
    sandbox:true,
    signType:"RSA2"
});



app.post('/submit/orders',function(req,res){

    console.log("index");
    var param = {};
    console.log(req.body);
    param.subject = req.body.subject;
    param.outTradeId = req.body.outTradeId;
    param.amount = req.body.amout;
    param.body = req.body.body;

    var urlparm = ali.webPay(param);

    var html = '<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipaydev.com/gateway.do" method="POST">';
    console.log(urlparm);
    for(var key in urlparm){
        html += "<input type='hidden' name='"+key+"' value='"+urlparm[key]+"'/>";
    }

    html+= '<input type="submit" value="ok" style="display:none;"></form>';
    html+= '<script>document.forms["alipaysubmit"].submit();</script>';
    res.send(html);
});

app.post('/search',function(req,res){

    console.log(req.body);
    res.send("wujing");
});
app.get("/user/stories",function(req,res){


     var data = {
         "counts":"1",
         "travelObj":[
             {
                 "travelId":"1234",
                 "userId":"123",
                 "headPic":"img/icon/boy.jpg",
                 "username":"wujing",
                 "publishTimes":"1480690515967",
                 "browserSum":"1023",
                 "supports":{
                     "total":"1123",
                     "isSupports":"0"
                 },
                 "attentions":{
                     "total":"1223",
                     "isAttentions":"0"
                 },
                 "shareSum":"1323",
                 "commentSum":"1423",
                 "reward":{
                     "total":"32",
                     "isReward":"0"
                 },
                 "level":"12",
                 "travelCnt":{
                     "title":"this is my first travels,this is my first travels,this is my first travels",
                     "label":"photographer,travel,alone",
                     "coverPic":"img/bg/brief_1.jpg",
                     "period":"2",
                     "picNum":"4",
                     "cities":[
                         {
                             "cid":"1231",
                             "cityUrl":"http://www.morefuntrip.com/special/Chongqing",
                             "cityName":"Chongqing",
                             "blDay":"1",
                             "publishTime":"2016-12-17",
                             "description":"Todayone came to this place to play",
                             "pic":[
                                 {
                                     "path":"data/09.jpg",
                                     "description":"chongqing place imagesTodayone came to this place to playTodayone came to this place to play"
                                 },{
                                     "path":"data/12.jpg",
                                     "description":"chongqing place Todayone came to this place to playTodayone came to this place to play images"
                                 },{
                                     "path":"data/15.jpg",
                                     "description":"chongqing place Todayone came to this place to play Todayone came to this place to play images"
                                 },{
                                     "path":"data/19.jpg",
                                     "description":"chongqing place Todayone came to this place to play images"
                                 },{
                                     "path":"data/20.jpg",
                                     "description":"chongqing place images"
                                 }
                             ]
                         },
                         {
                             "cid":"1231",
                             "cityUrl":"http://www.morefuntrip.com/special/Chongqing",
                             "cityName":"Chongqing",
                             "blDay":"1",
                             "publishTime":"2016-12-17",
                             "description":"Todayone came to this place to play",
                             "pic":[
                                 {
                                     "path":"data/09.jpg",
                                     "description":"chongqing place imagesTodayone came to this place to playTodayone came to this place to play"
                                 },{
                                     "path":"data/12.jpg",
                                     "description":"chongqing place Todayone came to this place to playTodayone came to this place to play images"
                                 },{
                                     "path":"data/15.jpg",
                                     "description":"chongqing place Todayone came to this place to play Todayone came to this place to play images"
                                 },{
                                     "path":"data/19.jpg",
                                     "description":"chongqing place Todayone came to this place to play images"
                                 },{
                                     "path":"data/20.jpg",
                                     "description":"chongqing place images"
                                 }

                             ]
                         }

                     ]
                 }
             }
         ]
     };
    res.json(data);
});
app.post("/travel/cancelSupports",function(req,res){

     console.log(req.body);
     res.json({"success":true});
});
app.post("/travel/support",function(req,res){

    console.log(req.body);
    res.json({"success":true});
});
app.post("/user_mul/attention",function(req,res){

    console.log(req.body);
    res.json({"success":true});
});
app.post("/user_mul/attention/cancel",function(req,res){

    console.log(req.body);
    res.json({"success":true});
});
app.post("/travel/user/comment",function(req,res){
     console.log("success");
     console.log(req.body);
     res.json({"success":true,"commentId":"222","error":{}});
});
app.post("/travel/comment/delete",function(req,res){
    console.log("success");
    console.log(req.body);
    res.json({"success":true,"commentId":"222","error":{}});
});
app.get("/user/logout",function(req,res){

    res.json({"success":true});
});
/*listen port*/
app.listen("8080",function(){
    console.log("server ---listen +++ 8080");
});
/*

 ali.query({
 outTradeId: outTradeId
 }).then(function (ret) {
 console.log("***** ret.body=" + body);
 });

 ali.close({
 outTradeId: outTradeId
 }).then(function (ret) {
 console.log("***** ret.body=" + body);
 });


 ali.refund({
 outTradeId: outTradeId,
 operatorId: 'XX001',
 refundAmount: '2.01',
 refundReason: '退款'
 }).then(function (ret) {
 console.log("***** ret.body=" + body);
 });


 ali.billDownloadUrlQuery({
 billType: 'trade',
 billDate: '2017-03'
 }).then(function (ret) {
 console.log("***** ret.body=" + body);
 });*/
