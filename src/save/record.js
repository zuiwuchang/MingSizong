/*		遊戲記錄 數據 進度 	*/
//遊戲記錄
dark.e_save._init_record = function(){
	var record = {};
	
	//結構定義 角色記錄
	record.create_role = function(id,sid,lv){
		var instance = {};
		if(lv == undefined){
			lv = 1;
		}
		
		//唯一標識符
		instance.id = id;
		
		//資源id
		instance.sid = sid;
		
		//角色等級
		instance.lv = lv;
		//當前 經驗
		instance.exp = 0;
		
		return instance;
	};
	record._roles = [
	                 record.create_role(ROLE_ID_MAIN,5 * 21 + 3),
	                 record.create_role(ROLE_ID_YAN13,5 * 21 + 6),
	                 record.create_role(ROLE_ID_CAOBIN,1 * 21 + 6),
	];
	record.roles = function(){
		return this._roles;
	};
	
	//記錄名
	record._name = {};
	record.name = function(str){
		if(str == undefined){
			return record._name;
		}
		record._name = str;
	};
	
	//難度
	record.DIFFICULTY_GOD = 0;
	record.DIFFICULTY_MANKIND = 1;
	record.DIFFICULTY_FAIRYTALE = 2;
	
	record._difficulty = record.DIFFICULTY_GOD;
	record.difficulty = function(n){
		if(n == undefined){
			return _difficulty;
		}
		record._difficulty = n;
	};
	
	//記錄狀態
	record.STATUS_DRAMA = 0;	//執行劇本
	record.STATUS_WAR = 1;		//戰前準備
	record.STATUS_MAP = 2;		//戰鬥中
	
	record._status = record.STATUS_DRAMA;
	
	
	//保存當前關卡信息
	//record._info
	//設置  執行劇本
	record.set_drama = function(name){
		if(name == undefined){
			name = record._info.name;
		}
		
		var obj = {};
		obj.name = name;
		
		record._info = obj;
		record._status = this.STATUS_DRAMA;
	};
	//設置 戰前準備
	record.set_war = function(name){
		if(name == undefined){
			name = record._info.name;
		}
		
		var obj = {};
		obj.name = name;

		record._info = obj;
		record._status = this.STATUS_WAR;
	};
	//設置 地圖
	record.set_map = function(name){
		if(name == undefined){
			name = record._info.name;
		}
		
		var obj = {};
		obj.name = name;

		record._info = obj;
		record._status = this.STATUS_MAP;
	};
	
	//返回 當前 關卡 信息
	record.get_info = function(){
		return record._info;
	};
	
	this._record = record;
};
