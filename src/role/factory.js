var role_factory = {
	//根據 id 資源 等級 創建 角色
	create:function(id,sid,lv){
		//控制角色
		if(id == ROLE_ID_MAIN){
			//英雄
			return new hero_main(id,sid,lv);
		}else if(id == ROLE_ID_YAN13){
			//騎兵
			return new cavalry_yan13(id,sid,lv);
		}else if(id == ROLE_ID_CAOBIN){
			//騎射手
			return new horse_archer_caobin(id,sid,lv);
		}else if(id == ROLE_ID_XIE3){
			//山賊
			return new bandit_xie3(id,sid,lv);
		}
		
		
		//敵軍
		else if(id == ROLE_ID_9000){
			//道士
			return new taoist_9000(id,sid,lv);
		}else if(id == ROLE_ID_LICAOQING){
			//術士
			return new warlock_licaoqing(id,sid,lv);
		}
		
	},
	//創建 普通單位
	create_normal:function(id,n,sid,lv){
		if(id == ROLE_ID_INFANTRY){
			//步兵
			return new infantry_normal(id + n,sid,lv);
		}else if(id == ROLE_ID_ARCHER){
			//弓箭手
			return new archer_normal(id + n,sid,lv);
		}
		
		else if(id == ROLE_ID_COUNSELOR){
			//謀士
			return new counselor_normal(id + n,sid,lv);
		}
	},
};