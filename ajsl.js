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
