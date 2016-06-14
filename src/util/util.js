var _ = {};

_.noop = function(result){
	return result;
};

_.sortKeys = function(obj, sortFun) {
    return Object.keys(obj).sort(sortFun).reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

module.exports = _;