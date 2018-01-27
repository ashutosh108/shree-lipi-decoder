(function() {

var listen = function (event, element, func) {
	if (element.addEventListener) {
		element.addEventListener(event, func, false);
	} else if (element.attachEvent) {
		var r = element.attachEvent("on"+event, func);
	}
}


listen("load", window, function() {
	var div = document.createElement('div');
	div.classList.add('slc-float');
	div.innerHTML = '<button>Convert</button><button>Duplicate</button><button>Reload</button>';
	div.innerHTML += '<style>.slc-float {position: fixed;left:0px;top:0px;}</style>';
	document.body.insertBefore(div, document.body.firstChild);
	var convertButton = div.firstChild;
	listen('click', convertButton, function() { convertButton.disabled = true; $slc.elementToUnicode(document.body, false); });
	var duplicateButton = div.childNodes[1];
	listen('click', duplicateButton, function() { duplicateButton.disabled = true; $slc.elementToUnicode(document.body, true); });
	var reloadButton = div.childNodes[2]
	listen('click', reloadButton, function() { window.location.reload(false)});
});

})();