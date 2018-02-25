var sleep = require('system-sleep');
const request = require('request-promise');
const Koa = require('koa');
const Router = require('koa-router');
const Parser = require('koa-bodyparser');

var app = new Koa();
var router = new Router();

var getTag = function(){
	var teg = "536017237:AAHbHruD-ddmUtf60Krk-c1ksVGQ8bxhH8U";
	return teg;
}

router.post('/bot',ctx=>{
	console.log(ctx.request.body.message);
	conn(ctx.request.body);
	ctx.status=200;
});
var port = 8443;
var url = "https://mysterious-island-79267.herokuapp.com/bot";
app.use(Parser());
app.use(router.routes());
app.listen(port,()=>{console.log("listening start")});
	

//});
var summ = function(text){
	if (text.indexOf("+") != -1){
	var arr = text.split("+").map(function (val) { return +val; });
	return arr[0]+arr[1]}
	else if(text.indexOf("-") != -1){
	var arr = text.split("-").map(function (val) { return +val; });
	return arr[0]-arr[1]}
	else if(text.indexOf("*") != -1){
	var arr = text.split("*").map(function (val) { return +val; });
	return arr[0]*arr[1]}
	else if(text.indexOf("/") != -1){
	var arr = text.split("/").map(function (val) { return +val; });
	return arr[0] / arr[1]}
};	



var conn = function(response){
		console.log(response);
		if (typeof response.message === 'undefined') {
			var data = response.callback_query.data;
			message = response.callback_query.message.text;
			
			
		if (data == "AC"){
			edit(getTag(),response.callback_query.message.message_id,response.callback_query.message.chat.id,"0",keyboard);
			return;
		}	


		if (data == "="){
			edit(getTag(),response.callback_query.message.message_id,response.callback_query.message.chat.id,summ(message),keyboard);
			return;
		}
		else{
			
					if(message=="0" && (data!="-" && data!="+" && data!="*" && data!="/" && data!="=" && data!=",")){
						edit(getTag(),response.callback_query.message.message_id,response.callback_query.message.chat.id,data,keyboard);
						return;numb1 = response.result.update_id + 1;}
					else{
					edit(getTag(),response.callback_query.message.message_id,response.callback_query.message.chat.id,message+data,keyboard);
					return;}
				}
				
						
			
		
		
	}
	else{
		if (response.message.text == "/start"){
			send(getTag(),response.message.chat.id,"0",keyboard);
			return;
		return;}
	}

}

var edit = function(tag,mess,id,text,reply){
	var options = {
    method: 'POST',
	json: true,
    uri: 'https://api.telegram.org/bot'+tag+'/editMessageText',
	body :{
	message_id: mess,
	text : text,
	chat_id : id,
	reply_markup:reply}
}
request(options)
.then(function (response) {
})
.catch(function (err) {
        // Crawling failed...
    });

}


var send = function(tag,id,text,reply){
	var options = {
    method: 'POST',
	json: true,
    uri: 'https://api.telegram.org/bot'+tag+'/sendMessage',
	body :{
	text : text,
	chat_id : id,
	reply_markup:reply}
}
request(options)
.then(function (response) {
})

.catch(function (err) {
        // Crawling failed...
    });

}

keyboard ={inline_keyboard:[
[{text:"AC",callback_data:"AC"}],
[{text:"+",callback_data:"+"},{text:"-",callback_data:"-"},{text:"*",callback_data:"*"},{text:"/",callback_data:"/"}],
[{text:"1",callback_data:"1"},{text:"2",callback_data:"2"},{text:"3",callback_data:"3"}],
[{text:"4",callback_data:"4"},{text:"5",callback_data:"5"},{text:"6",callback_data:"6"}],
[{text:"7",callback_data:"7"},{text:"8",callback_data:" 8"},{text:"9",callback_data:"9"}],
[{text:".",callback_data:"."},{text:"0",callback_data:"0"},{text:"=",callback_data:"="}],
]};



var options = {
    method: 'POST',
	json: true,
    uri: 'https://api.telegram.org/bot'+getTag()+'/setWebhook',
	body:{
		url:url
	}
}
request(options)
.then(function (response) {console.log(response)});


