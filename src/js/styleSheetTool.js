import _ from './utils';

let _find = (list, fn) => Array.prototype.find.call(list, fn);

export function createStyleSheet (id) {
	var el = document.createElement('style');
  el.appendChild(document.createTextNode(''));
	el.media = 'screen';
	if (id) el.id = id;
	document.head.appendChild(el);
	return el.sheet;
}

export function getCSSRule(selector, sheet) {
	if (sheet) {
		return sheet.cssRules[getRuleIndex(selector, sheet)];
	}
	var style = findCSSRule(selector);
	return style.sheet.cssRules[style.index];
}

export function deleteCSSRule(selector, sheet) {
	if (sheet) sheet.deleteRule(getRuleIndex(selector, sheet));
	else {
		let style = findCSSRule(selector);
		style.sheet.deleteRule(style.index);
	}
}

export function addCSSRule(rule, sheet) {
	sheet = sheet || document.styleSheets[0];
	return sheet.cssRules[sheet.insertRule(rule, sheet.cssRules.length)];
}

export function updateCSSRule(rule, sheet) {
	var selectorRegex = /(.*?)(?= ?\{)/;
	var selector = rule.match(selectorRegex)[0];
	console.log('selector string: ', selector)
	deleteCSSRule(selector, sheet);
	return addCSSRule(rule, sheet);
}

const getRuleIndex = function  (selector, styleSheet) {
	var index = -1;
	_find(styleSheet.cssRules, (rule, idx) => {
		return rule.selectorText 
			&& rule.selectorText.toLowerCase() == selector.toLowerCase()
			? (index = idx) : false;
	});
	return index;
}

const findCSSRule = function (selector) {
	let result, index = -1;
	_find(document.styleSheets, styleSheet => {
		index = getRuleIndex(selector, styleSheet);
		return index != -1 ? (result = {sheet: styleSheet, index: index}) : false;
	});
	return result || null;
}
