/*		遊戲記錄 數據	成就 	*/
dark.e_save._achievement = {};

//初始化
dark.e_save._achievement._items = [];
dark.e_save._achievement._keys = {};
dark.e_save._achievement._init = function(){
	var items = this._items;
	var keys = this._keys;
	
	items.push(
		{
			id:"0",			//成就唯一id
			name:_("開始服役"),		//成就名
			text:_("開始遊戲。"),		//成就顯示詳情
			x:0,			//圖標所在列
			y:0,			//圖標所在行

			value:0,		//成就當前狀態
			max:1,			//成就解鎖狀態
			disable:false	//如果為 true 無法再執行任務
		},
		{
			id:"1",
			name:_("死神之友"),
			text:_("殺死20個敵人。"),
			x:0,
			y:6,

			value:0,
			max:20,
			disable:false
		},
		{
			id:"2",
			name:_("戰場死神"),
			text:_("在同一場戰役中殺死50個敵人。"),
			x:0,
			y:6,

			value:0,
			max:50,
			disable:false
		},
		{
			id:"3",
			name:_("白起之魂"),
			text:_("在所有任務中殺死所有敵人。"),
			x:0,
			y:6,

			value:0,
			max:1,
			disable:false
		}
	);
	
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var key = item.id;
		
		keys[key] = item;
	}
}

//加載 成就
dark.e_save._achievement.load = function(){
	
}
//保存成就
dark.e_save._achievement.save = function(){
	
}