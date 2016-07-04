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
		pre = $('#style-text');
        pre.scrollTop = pre.scrollHeight;
		writeStyleChar(message[index++], appendChar);
		return setTimeout(function () {
			return writeStyles(message, index, interval, appendChar);
		}, interval);
	}
}

function loading() {
	setTimeout(function () {
		var loopCount = 0;
		var loadingText = ['-', '\\', '|', '/'];
		var loadingEffect = setInterval(function () {
			var idx = loopCount % 4;
			$('#loading').html(loadingText[idx]);
			loopCount++;
			if (loopCount > 200) {
				clearInterval(loadingEffect);
				$('#loading').hide();
			}
		}, 100);
	}, 1000);
}

(function () {
	$.get("../resume.css", function (data) {
		writeStyles(data, 0, 16, true);
	});
}).call(this);