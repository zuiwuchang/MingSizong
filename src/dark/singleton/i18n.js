// i18n 組件
dark.i18n = {};
dark.i18n._language = null;

//設置/返回 當前語言
dark.i18n.language = function(l) {
	if(l == undefined){
		return dark.i18n._language;
	}else{
		dark.i18n._language = l;
	}
};

//使用 l語言 翻譯 key
dark.i18n._ = function(key,l){
	if(l == undefined){
		l = dark.i18n._language;
	}
	var obj = dark.i18n[l];
	
	var v = obj[key];
	
	if(v == undefined){
		return key;
	}else{
		return v;
	}
};
var _ = dark.i18n._;


