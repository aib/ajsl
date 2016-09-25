const assert = require('assert');
const ajsl = require('./ajsl');

var testFunctions = [
	function testPropCall() {
		assert.deepEqual(["foo", "bar"].map(ajsl.propCall('toUpperCase')), ["FOO", "BAR"]);
		assert.deepEqual(["foo", "bar"].map(ajsl.propCall('substring', 1)), ["oo", "ar"]);
	},

	function testPropGet() {
		assert.deepEqual(["foo", "bar"].map(ajsl.propGet('length')), [3, 3]);
	},

	function testConcat() {
		assert.deepEqual(ajsl.concat([[1], [2, 3], [4]]), [1, 2, 3, 4]);
	},

	function testConcatMap() {
		var addZero = function(x) { var y = x.slice(); y.push(0); return y; }
		assert.deepEqual(ajsl.concatMap(addZero, [[1],[2, 3],[4]]), [1, 0, 2, 3, 0, 4, 0]);
	},

	function testRandInt() {
		var nums = [];
		for (var i=0; i<1000; ++i) {
			nums.push(ajsl.randInt(5));
		}
		assert(nums.indexOf(0) != -1); // has about 1 in 10^97 chance of failing
		assert(nums.indexOf(1) != -1);
		assert(nums.indexOf(2) != -1);
		assert(nums.indexOf(3) != -1);
		assert(nums.indexOf(4) != -1);
		assert(nums.indexOf(5) == -1);

		nums = [];
		for (var i=0; i<1000; ++i) {
			nums.push(ajsl.randInt(3,5));
		}
		assert(nums.indexOf(2) == -1);
		assert(nums.indexOf(3) != -1);
		assert(nums.indexOf(4) != -1);
		assert(nums.indexOf(5) == -1);
	},

	function testRange() {
		assert.deepEqual(ajsl.range(5), [0, 1, 2, 3, 4]);
		assert.deepEqual(ajsl.range(6, 2), [6, 5, 4, 3]);
		assert.deepEqual(ajsl.range(5, 3, 0.5), [5, 4.5, 4, 3.5]);
	},

	function testLerp() {
		assert.equal(ajsl.lerp(5, 10, 0.25), 6.25); //pray to floating point gods
	},

	function testInterp() {
		assert.equal(ajsl.interp(function (t) { return t*t; }, 0, 100, 0.25), 6.25);
		assert.equal(ajsl.interp(function (t) { return t*t; }, 0, 100, 0.75), 56.25);
	},

	function testId() {
		assert.equal(ajsl.id(42), 42);
		var x = Array(1, 2, 3);
		assert.equal(ajsl.id(x), x);
	},

	function testConst() {
		assert.equal(ajsl.const(42)(), 42);
		var x = Array(1, 2, 3);
		var c = ajsl.const(x);
		assert.equal(c(), x);
	},

	function testConvenienceFunctions() {
		assert.equal(ajsl.func.add(3, 5), 3 + 5);
		assert.equal(ajsl.func.sub(-4, 8), -12);
		assert.equal(ajsl.func.mul(6, 7), 42);
		assert.equal(ajsl.func.div(4, -0.2), 4 / -0.2);
		assert.equal(ajsl.func.mod(8.8, -3.5), 8.8 % -3.5);
	},


];

testFunctions.map(function(f) { f(); });
