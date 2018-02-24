var sleep = require('system-sleep');
const request = require('request-promise');
var getTag = function(){
	var teg = "536017237:AAHbHruD-ddmUtf60Krk-c1ksVGQ8bxhH8U";
	return teg;
}

var http = require('http');
 
var port = 8081;
 
var s = http.createServer();
s.on('request', function(request, response) {
    conn(response);
});
 
s.listen(port);
	

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
		console.log(response.result[response.result.length - 1]);
		if (typeof response.result[response.result.length - 1].message === 'undefined') {
			var data = response.result[response.result.length - 1].callback_query.data;
			message = response.result[response.result.length - 1].callback_query.message.text;
			
			
		if (data == "AC"){
			edit(getTag(),response.result[response.result.length - 1].callback_query.message.message_id,response.result[response.result.length - 1].callback_query.message.chat.id,"0",keyboard);
			return;
		}	


		if (data == "="){
			edit(getTag(),response.result[response.result.length - 1].callback_query.message.message_id,response.result[response.result.length - 1].callback_query.message.chat.id,summ(message),keyboard);
			return;
		}
		else{
			
					if(message=="0" && (data!="-" && data!="+" && data!="*" && data!="/" && data!="=" && data!=",")){
						edit(getTag(),response.result[response.result.length - 1].callback_query.message.message_id,response.result[response.result.length - 1].callback_query.message.chat.id,data,keyboard);
						return;numb1 = response.result.update_id + 1;}
					else{
					edit(getTag(),response.result[response.result.length - 1].callback_query.message.message_id,response.result[response.result.length - 1].callback_query.message.chat.id,message+data,keyboard);
					return;}
				}
				
						
			
		
		
	}
	else{
		if (response.result[response.result.length - 1].message.text == "/start"){
			send(getTag(),response.result[response.result.length - 1].message.chat.id,"0",keyboard);
			messages.push([response.result[response.result.length - 1].message.message_id,"0"]);
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
		url:"https://mysterious-island-79267.herokuapp.com"
	}
}
request(options)
.then(function (response) {console.log(response)});


