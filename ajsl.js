var ajsl = {};

/**
 * The circle constant tau
 */
ajsl['TAU'] = 2 * Math.PI;

/**
 * Returns a function that calls the specified function property of an object
 * Useful with map and foreach, e.g.:
 * ["foo", "bar"].map(ajsl.propCall('toUpperCase')) = ["FOO", "BAR"]
 * ["foo", "bar"].map(ajsl.propCall('substring', 1)) = ["oo", "ar"]
 */
ajsl['propCall'] = function(propName) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function(obj) {
		return Function.prototype.apply.call(obj[propName], obj, args);
	}
}

/**
 * Returns a function that gets the specified property of an object
 * Useful with map, e.g.:
 *   ["foo", "bar"].map(ajsl.propGet('length')) = [4, 4]
 */
ajsl['propGet'] = function(propName) {
	return function(obj) {
		return obj[propName];
	}
}

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

/**
 * Linear interpolation
 */
ajsl['lerp'] = function(a, b, t) {
	return a + (b - a) * t;
}

ajsl['func'] = {};

ajsl['func']['add'] = function(x, y) { return x + y; }
ajsl['func']['sub'] = function(x, y) { return x - y; }
ajsl['func']['mul'] = function(x, y) { return x * y; }
ajsl['func']['div'] = function(x, y) { return x / y; }
ajsl['func']['mod'] = function(x, y) { return x % y; }
