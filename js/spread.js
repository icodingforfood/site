var container = document.getElementById("container");
var orientation = {
	TOP: 0,
	RIGHT: 1,
	BOTTOM: 2,
	LEFT: 3
}

var options = {
	tileSize: 80,
	color: "#C7EDCC",
	randomColor: false
}

var random = function (min, max) {
	return min + Math.random() * (max - min);
}

var Tile = function (x, y, color, onComplete) {
	var div, inlay, cover;
	var neighbors = [];
	var isShown = false;

	function initUI() {
		div = document.createElement("div");
		div.className = "tile";
		div.style.width = options.tileSize + "px";
		div.style.height = options.tileSize + "px";
		div.style.top = y * options.tileSize + "px";
		div.style.left = x * options.tileSize + "px";

		inlay = document.createElement("div");
		inlay.className = "inlay";
		inlay.style.backgroundColor = options.color;

		cover = document.createElement("div");
		cover.className = "cover";

		div.appendChild(inlay);
		inlay.appendChild(cover);
	}

	this.isShown = function () {
		return isShown;
	}

	this.getElement = function () {
		return div;
	}

	this.addNeighbor = function (direction, neighbor) {
		neighbors[direction] = neighbor;
	}

	this.fromTop = function () {
		div.classList.add("from-top");
		show();
	}

	this.fromBottom = function () {
		div.classList.add("from-bottom");
		show();
	}

	this.fromRight = function () {
		div.classList.add("from-right");
		show();
	}

	this.fromLeft = function () {
		div.classList.add("from-left");
		show();
	}

	function onTransitionEnd() {

		for (var i = 0; i < neighbors.length; i++) {

			if (neighbors[i] && !neighbors[i].isShown()) {

				neighbors[i][getFunctionName(i)]();

				setTimeout(onTransitionEnd, random(10, 200));
				break;

			}

		}

	}
	
	// -------
	// PRIVATE
	// -------

	function getFunctionName(index) {
		return ["fromBottom", "fromLeft", "fromTop", "fromRight"][index];
	}

	function show() {
		isShown = true;

		setTimeout(function () {

			inlay.classList.add("show");

			setTimeout(onTransitionEnd, random(200, 300));
			setTimeout(onComplete, 300);

		}, 50);
	}

	initUI();
}

var Controller = function (container, size, position) {
	var width = Math.ceil(size.width / options.tileSize);
	var height = Math.ceil(size.height / options.tileSize);
	var tiles = [];
	var onComplete = null;
	var completeCount = 0;
	var tileColor = options.color;

	function init() {
		fillScreen();
		snowball();
	}
	
	// ------
	// PUBLIC
	// ------

	this.onComplete = function (closure) {
		onComplete = closure
	}

	this.getColor = function () {
		return tileColor;
	}

	// -------
	// PRIVATE
	// -------

	function fillScreen() {

		var tile;
		var length = width * height;

		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {

				tile = new Tile(x, y, tileColor, tileComplete);

				container.appendChild(tile.getElement());

				tiles.push(tile);

			}
		}

		for (var i = 0; i < length; i++) {

			tile = tiles[i];
			row = ~~(i / width);
			col = i % width;

			if (col < width - 1)
				tile.addNeighbor(orientation.RIGHT, tiles[i + 1]);

			if (col > 0)
				tile.addNeighbor(orientation.LEFT, tiles[i - 1]);

			if (row > 0)
				tile.addNeighbor(orientation.TOP, tiles[i - width]);

			if (row < height - 1)
				tile.addNeighbor(orientation.BOTTOM, tiles[i + width]);
		}
	}

	function snowball() {

		var row = ~~(position.y / options.tileSize);
		var col = ~~(position.x / options.tileSize);

		tiles[col + row * width].fromTop();
	}

	function tileComplete() {
		completeCount++;

		if (completeCount === tiles.length && onComplete) {
			onComplete();
		}
	}

	init();
}

function onClick(event) {

	var div = document.createElement("div");

	var size = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	var position = {
		x: event.pageX,
		y: event.pageY
	}

	var controller = new Controller(div, size, position);

	controller.onComplete(function () {

		document.body.style.backgroundColor = controller.getColor();
		container.removeChild(div);

	});

	container.appendChild(div);

}

function start() {

	var event = {
		pageX: window.innerWidth / 2,
		pageY: window.innerHeight / 2
	}
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		document.body.style.backgroundColor = options.color;
	} else {
		onClick(event);
	}
}

setTimeout(start, 1000);