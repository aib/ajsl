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

/**
 * Return an array of a range of numbers start ~ end, inclusive, with a step size (default 1)
 */
ajsl['range'] = function(start, end, stepSize) {
	stepSize = stepSize || 1;
	if (start > end) {
		var inRange = function(n) { return n >= end; }
		var step = -stepSize;
	} else {
		var inRange = function(n) { return n <= end; }
		var step = stepSize;
	}
	var arr = [];
	for (var n = start; inRange(n); n += step) {
		arr.push(n);
	}
	return arr;
}
