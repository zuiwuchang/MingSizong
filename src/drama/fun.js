/*		遊戲 關卡 輔助函數 	*/
dark.drama_fun = {};
dark.drama_fun.repleace = function(str){
	var record = dark.e_save.get_record();
	str = str.replace(/{{name}}/, record.name());
	return str;
};
