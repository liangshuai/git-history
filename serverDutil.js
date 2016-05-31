var _ = {};

_.sortKeys = function(obj, sortFun) {
    return Object.keys(obj).sort(sortFun).reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

var obj = {
	"node-git": {
		"files": [".gitignore", "README.md", "package.json"],
		"src": {
			"command": {
				"files": ["diff.js", "index.js", "init.js", "log.js", "ls-files.js", "status.js"]
			},
			"files": ["git.js", "index.js", "runner.js"]
		}
	}
}

console.log(_.sortKeys(obj, function(a,b) {
	return a === 'files'? 1 : 0;
}));

module.exports = _;