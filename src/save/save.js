/*		遊戲記錄 數據		*/
dark.e_save = {};

//初始化 記錄數據 應該在遊戲啟動時 被調用一次
dark.e_save._init = false;
dark.e_save.init_once = function(){
	if(dark.e_save._init){
		return;
	}
	
	var obj = this._achievement;
	obj._init();
	
	dark.e_save._init = true;
}