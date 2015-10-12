function writeStyleChar(char, appendChar) {
	var styles = $('#style-text').html() + char;
	$('#style-text').html(styles);
	if (appendChar) {
		$('#style-tag').append(char);
	}
}

function writeStyles(message, index, interval, appendChar) {
	var pre;
	if (index < message.length) {
		pre = document.getElementById('style-text');
        pre.scrollTop = pre.scrollHeight;
		writeStyleChar(message[index++], appendChar);
		return setTimeout(function () {
			return writeStyles(message, index, interval, appendChar);
		}, interval);
	}
}

(function () {
	$.get("../resume.css", function (data) {
		writeStyles(data, 0, 16, true);
	});
}).call(this);