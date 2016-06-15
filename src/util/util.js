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

_.replacePath = function(path) {
    var pattern = /(.*?)(__GH__FILE__(.*?)__STATE__)(.*?)/;
    return path.replace(pattern, '$1$4');
}

module.exports = _;