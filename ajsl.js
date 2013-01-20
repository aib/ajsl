var ajsl = {};

/**
 * The circle constant tau
 */
ajsl['TAU'] = 2 * Math.PI;

/**
 * Concatenates an array of arrays in the Haskell sense, i.e.:
 * concat [[1], [2, 3], [4]] = [1, 2, 3, 4]
 */
ajsl['concat'] = function(arr) {
	var concatArr = [];
	arr.forEach(function(subArr) { subArr.forEach(function(e) { concatArr.push(e); }); });
	return concatArr;
};

/**
 * Convenience function combining ajsl.concat and Array.prototype.map
 */
ajsl['concatMap'] = function(arr, callback, thisArg) {
	return ajsl.concat(arr.map(callback, thisArg));
}

ajsl.range_ = function(start, end, stepSize) {
	if (start > end) {
		var inRange = function(n) { return n > end; }
		var step = -stepSize;
	} else {
		var inRange = function(n) { return n < end; }
		var step = stepSize;
	}
	var arr = [];
	for (var n = start; inRange(n); n += step) {
		arr.push(n);
	}
	return arr;
}

/**
 * Return an array of a half-open range [start,end) of numbers with a step size (default 1)
 * start and step are optional:
 *   range(5)         = [1, 2, 3, 4]
 *   range(6, 2)      = [6, 5, 4, 3]
 *   range(5, 3, 0.5) = [5, 4.5, 4, 3.5]
 */
ajsl['range'] = function() {
	if (arguments.length == 1) { // (0, end, 1)
		return ajsl.range_(0, arguments[0], 1);
	} else if (arguments.length == 2) { // (start, end, 1)
		return ajsl.range_(arguments[0], arguments[1], 1);
	} else { // (start, end, step)
		return ajsl.range_(arguments[0], arguments[1], arguments[2]);
	}
}
