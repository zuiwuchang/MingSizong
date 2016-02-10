/*		遊戲記錄 數據		*/
dark.e_save = {};

//初始化 記錄數據 應該在遊戲啟動時 被調用一次
dark.e_save._init = false;
dark.e_save.init_once = function(){
	if(dark.e_save._init){
		return;
	}
	
	this._init_achievement();
	this._init_record();
	
	dark.e_save._init = true;
};

//返回 成就 實例
dark.e_save.get_achievement = function(){
	return this._achievement;
};

dark.e_save.get_record = function(){
	return this._record;
};