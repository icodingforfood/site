function writeStyleChar(char){
	var styles = $('#style-text').html() + char;
	$('#style-text').html(styles);
    $('#style-tag').append(char);	
}

function writeStyles(message, index, interval){
	if(index < message.length){
		writeStyleChar(message[index++]);
		return setTimeout(function() {
			return writeStyles(message,index,interval);
		}, interval);
	}
}

(function(){
	var styleText = " /**\n*hi...\n*\n*你好！... こんにちは...안녕 하세요.bonjour...\n*我叫虞浩，劳拉客户端程序员...\n*现在正在学习Javascript & CSS & HTML5\n*/\n#style-text {\n  width: 300px; \n  color: white;\n  background-color: black;\n  padding: 24px;\n  margin: 24px auto;\n}";
	writeStyles(styleText, 0, 16);
}).call(this);