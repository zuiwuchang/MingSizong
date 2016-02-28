var role_factory = {
	//根據 id 資源 等級 創建 角色
	create:function(id,sid,lv){
		if(id == ROLE_ID_MAIN){
			//英雄
			return new hero_main(id,sid,lv);
		}else if(id == ROLE_ID_YAN13){
			//騎兵
			return new cavalry_yan13(id,sid,lv);
		}else if(id == ROLE_ID_CAOBIN){
			//騎射手
			return new horse_archer_caobin(id,sid,lv);
		}
		
	},
};