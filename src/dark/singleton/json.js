//持久化 json 組件

dark.json = {};

//設置/保存 json 數據
dark.json.item = function(key,obj){
	if(obj == undefined){
		var str = cc.sys.localStorage.getItem(key);
		return JSON.parse(txt);
	}
	
	var str = JSON.stringify(j);
	cc.sys.localStorage.setItem(key, str);
};

//刪除 記錄
dark.json.remove = function(key){
	cc.sys.localStorage.removeItem(key);
};
