import m from 'mithril';

var File = function(data) {
}

File.Data = m.prop('');

File.content = function(data) {
	if(data.indexOf('.') > 0){
		return m.request({method: "GET", url: "/git/file/" + data}).then(function(res) {
			File.Data(res.data);
		});
	}else{
		return;
	}	
}

module.exports = File;