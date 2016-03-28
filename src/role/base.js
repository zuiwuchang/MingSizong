/*		角色基類		*/

//定義 攻擊類型

//普通
var ROLE_ATTACK_TYPE_NORMAL		=	0;	//步兵 ...	//對輕型加成 20 攻城 30 英雄 -10

//穿刺
var ROLE_ATTACK_TYPE_PUNCTURE	=	1;	//弓箭 ...	//對普通 加成 15  重型 25 攻城 15

//重型
var ROLE_ATTACK_TYPE_WEIGHT		=	2;	//騎兵...	//對 普通 加成10 輕型加成 25 攻城50

//攻城
var ROLE_ATTACK_TYPE_SIEGE		=	3;	//攻城車		//對 普通 加成10 輕型加成 25 重型 35

//英雄
var ROLE_ATTACK_TYPE_HERO		=	4;	//英雄		//對 普通 加成10 輕型加成 25 攻城50 


//定義 護甲類型
//普通
var ROLE_ARMOR_TYPE_NORMAL	=	0;	//步兵

//輕型
var ROLE_ARMOR_TYPE_LIGHT	=	1;	//射手

//重型
var ROLE_ARMOR_TYPE_WEIGHT	=	2;	//騎兵

//攻城
var ROLE_ARMOR_TYPE_SIEGE	=	3;	//攻城車

//英雄
var ROLE_ARMOR_TYPE_HERO	=	4;	//英雄



//定義 角色 主屬性
var ROLE_MAIN_TYPE_POWER		=	0;	//力量	19 hp
var ROLE_MAIN_TYPE_AGILITY		=	1;	//敏捷	1/7 護甲
var ROLE_MAIN_TYPE_INTELLECT	=	2;	//智力	13 mp

var ROLE_POWER_LIVE = 19;
var ROLE_AGILITY_ARMOR = 7;
var ROLE_INTELLECT_MP = 13;


//定義 兵種
var ROLE_ARMS_TYPE_HERO			=	0;	//英雄
var ROLE_ARMS_TYPE_CAVALRY		=	1;	//騎兵
var ROLE_ARMS_TYPE_HORSE_ARCHER	=	2;	//騎射

var ROLE_ARMS_TYPE_TAOIST		=	100;	//道士
var ROLE_ARMS_TYPE_WARLOCK		=	101;	//術士
var ROLE_ARMS_TYPE_COUNSELOR	=	102;	//謀士

var ROLE_ARMS_TYPE_INFANTRY		=	200;	//步兵
var ROLE_ARMS_TYPE_ARCHER		=	201;	//弓箭手
var ROLE_ARMS_TYPE_BANDIT		=	202;	//山賊


//角色 基類
var role_base = cc.Sprite.extend({
	//唯一 標識
	_id:null,
	//資源id
	_sid:null,
	//名稱
	_name:"",
	//等級
	_lv:1,
	//顯示 頭像
	_face:null,
	
	//攻擊 類型 護甲 類型
	_type_attack:0,
	_type_armor:0,
	
	//主屬性
	_type_main:0,

	//兵種
	_type_arms:0,
	
	//初始 力量 敏捷 攻擊
	_power:0,
	_agility:0,
	_intellect:0,
	
	//每級成長
	_lv_power:0,
	_lv_agility:0,
	_lv_intellect:0,
	
	//基礎 攻防 hp mp
	_hp:0,
	_mp:0,
	_attack:0,
	_armor:0,
	
	//機動
	_move:0,

	//當前 經驗
	_exp:0,
	
	
	//當前 hp mp
	_cur_hp:0,
	_cur_mp:0,
	

	//臉 朝方向
	_face_to:ROLE_FACE_BOTTOM,
	
	_opacity:null,
	ctor:function (id,sid,lv) {
		this._id = id;
		this._sid = sid;
		
		var n = Math.floor(sid / 21) + 1;
		var pos = sid % 21;
		this._super("res/games/2n/" + n + ".png",cc.rect(0, pos * 48, 48, 48));
		
		//event
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					target._opacity = target.opacity;
					target.opacity = 180;
					if(target._e_touch != undefined){
						target._e_touch(target);
					}
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				if(target._opacity != null){
					target.setOpacity(target._opacity);
				}else{
					target.setOpacity(255);	
				}
				
				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					if(target._e_click != undefined){
						target._e_click(target);
					}
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	//初始化 角色 初始狀態
	init_cur:function(){
		this._cur_hp = this.get_hp();
		this._cur_mp = this.get_mp();
	},
	//觸摸 回調
	e_touch:function(call_back){
		if(call_back == undefined){
			return this._e_touch;
		}

		this._e_touch = call_back;
	},
	e_click:function(call_back){
		if(call_back == undefined){
			return this._e_click;
		}

		this._e_click = call_back;
	},
	
	
	//信息 設置/返回
	id:function(){
		return this._id;
	},
	sid:function(){
		return this._sid;
	},
	name:function(str){
		if(str == undefined){
			return this._name;
		}
		this._name = str;
	},
	lv:function(n){
		if(n == undefined){
			return this._lv;
		}

		this._lv = n;
	},
	face:function(n){
		if(n == undefined){
			return this._face;
		}

		this._face = n;
	},
	type_attack:function(t){
		if(t == undefined){
			return this._type_attack;
		}

		this._type_attack = t;
	},
	type_armor:function(t){
		if(t == undefined){
			return this._type_armor;
		}

		this._type_armor = t;
	},
	type_attack_str:function(){
		var str = "unknow";
		switch(this.type_attack()){
		case ROLE_ATTACK_TYPE_NORMAL:
			str = _("TAG_ROLE_ATTACK_TYPE_NORMAL");
			break;
		case ROLE_ATTACK_TYPE_PUNCTURE:
			str = _("TAG_ROLE_ATTACK_TYPE_PUNCTURE");
			break;
		case ROLE_ATTACK_TYPE_WEIGHT:
			str = _("TAG_ROLE_ATTACK_TYPE_WEIGHT");
			break;
		case ROLE_ATTACK_TYPE_SIEGE:
			str = _("TAG_ROLE_ATTACK_TYPE_SIEGE");
			break;
		case ROLE_ATTACK_TYPE_HERO:
			str = _("TAG_ROLE_ATTACK_TYPE_HERO");
			break;
		}
		return str;
	},
	type_armor_str:function(){
		var str = "unknow";
		switch(this.type_armor()){
		case ROLE_ARMOR_TYPE_NORMAL:
			str = _("TAG_ROLE_ARMOR_TYPE_NORMAL");
			break;
		case ROLE_ARMOR_TYPE_LIGHT:
			str = _("TAG_ROLE_ARMOR_TYPE_LIGHT");
			break;
		case ROLE_ARMOR_TYPE_WEIGHT:
			str = _("TAG_ROLE_ARMOR_TYPE_WEIGHT");
			break;
		case ROLE_ARMOR_TYPE_SIEGE:
			str = _("TAG_ROLE_ARMOR_TYPE_SIEGE");
			break;
		case ROLE_ARMOR_TYPE_HERO:
			str = _("TAG_ROLE_ARMOR_TYPE_HERO");
			break;
		}
		return str;
	},
	type_main:function(t){
		if(t == undefined){
			return this._type_main;
		}

		this._type_main = t;
	},
	type_main_str:function(){
		var str = "unknow";
		switch(this.type_main()){
		case ROLE_MAIN_TYPE_POWER:
			str = _("TAG_ROLE_MAIN_TYPE_POWER");
			break;
		case ROLE_MAIN_TYPE_AGILITY:
			str = _("TAG_ROLE_MAIN_TYPE_AGILITY");
			break;
		case ROLE_MAIN_TYPE_INTELLECT:
			str = _("TAG_ROLE_MAIN_TYPE_INTELLECT");
			break;
		}
		return str;
	},
	type_arms:function(t){
		if(t == undefined){
			return this._type_arms;
		}

		this._type_arms = t;
	},
	type_arms_str:function(){
		var str = "unknow";
		switch(this.type_arms()){
		case ROLE_ARMS_TYPE_HERO:
			str = _("TAG_ROLE_ARMS_TYPE_HERO");
			break;
		case ROLE_ARMS_TYPE_CAVALRY:
			str = _("TAG_ROLE_ARMS_TYPE_CAVALRY");
			break;
		case ROLE_ARMS_TYPE_HORSE_ARCHER:
			str = _("TAG_ROLE_ARMS_TYPE_HORSE_ARCHER");
			break;
			
			
			
		case ROLE_ARMS_TYPE_TAOIST:
			str = _("TAG_ROLE_ARMS_TYPE_TAOIST");
			break;
		case ROLE_ARMS_TYPE_WARLOCK:
			str = _("TAG_ROLE_ARMS_TYPE_WARLOCK");
			break;
		case ROLE_ARMS_TYPE_COUNSELOR:
			str = _("TAG_ROLE_ARMS_TYPE_COUNSELOR");
			break;
			
			
		case ROLE_ARMS_TYPE_INFANTRY:
			str = _("TAG_ROLE_ARMS_TYPE_INFANTRY");
			break;
		case ROLE_ARMS_TYPE_ARCHER:
			str = _("TAG_ROLE_ARMS_TYPE_ARCHER");
			break;
		case ROLE_ARMS_TYPE_BANDIT:
			str = _("TAG_ROLE_ARMS_TYPE_BANDIT");
			break;
		}
		return str;
	},
	power:function(n){
		if(n == undefined){
			return this._power;
		}
		this._power = n;
	},
	agility:function(n){
		if(n == undefined){
			return this._agility;
		}
		this._agility = n;
	},
	intellect:function(n){
		if(n == undefined){
			return this._intellect;
		}
		this._intellect = n;
	},
	
	lv_power:function(n){
		if(n == undefined){
			return this._lv_power;
		}
		this._lv_power = n;
	},
	lv_agility:function(n){
		if(n == undefined){
			return this._lv_agility;
		}
		this._lv_agility = n;
	},
	lv_intellect:function(n){
		if(n == undefined){
			return this._lv_intellect;
		}
		this._lv_intellect = n;
	},
	
	hp:function(n){
		if(n == undefined){
			return this._hp;
		}
		this._hp = n;
	},
	mp:function(n){
		if(n == undefined){
			return this._mp;
		}
		this._mp = n;
	},
	attack:function(n){
		if(n == undefined){
			return this._attack;
		}
		this._attack = n;
	},
	armor:function(n){
		if(n == undefined){
			return this._armor;
		}
		this._armor = n;
	},
	
	//返回 攻擊力
	get_attack:function(){
		var v = this._attack;
		
		var t = this.type_main();
		switch(t){
		case ROLE_MAIN_TYPE_POWER:
			v += this.get_power();
			break;
		case ROLE_MAIN_TYPE_AGILITY:
			v += this.get_agility();
			break;
		case ROLE_MAIN_TYPE_INTELLECT:
			v += this.get_intellect();
			break;
		}
		
		return v;
	},
	//返回 護甲
	get_armor:function(){
		var v = this._armor;
		
		v += Math.floor(this.get_agility() / ROLE_AGILITY_ARMOR);
			
		return v;
	},
	//返回 hp
	get_hp:function(){
		var hp = this._hp + this.get_power() * ROLE_POWER_LIVE;
		
		return hp;
	},
	//返回 mp
	get_mp:function(){
		var mp = this._mp + this.get_intellect() * ROLE_INTELLECT_MP;
		
		return mp;
	},
	//返回 力量
	get_power:function(){
		return this._power + Math.floor(this._lv_power * (this._lv -1) );
	},
	get_agility:function(){
		return this._agility + Math.floor(this._lv_agility * (this._lv -1) );
	},
	get_intellect:function(){
		return this._intellect + Math.floor(this._lv_intellect * (this._lv -1) );
	},
	//返回/設置 當前經驗
	exp:function(n){
		if(n == undefined){
			return this._exp;
		}
		this._exp = n;
	},
	//返回 升級經驗
	get_up_exp:function(){
		var v = 10;
		v *= Math.pow(1.2, (this._lv - 1));
		Math.ceil(v);
		return v;
	},
	//返回/設置 機動力
	move:function(n){
		if(n == undefined){
			return this._move;
		}
		
		this._move = n;
	},
	
	
	//執行動作
	face_to:function(n){
		var animation = new cc.Animation();
		
		var rect = this.getTextureRect();
		var texture = this.getTexture();
		var x = rect.x;
		var y = rect.y;
		if(n == ROLE_FACE_BOTTOM || n == undefined){
			animation.addSpriteFrameWithTexture(texture, rect);
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width, y, rect.width, rect.height));
		
			this._face_to = ROLE_FACE_BOTTOM;
		}else if(n == ROLE_FACE_LEFT){
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 4, y, rect.width, rect.height));
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 5, y, rect.width, rect.height));
			
			this._face_to = ROLE_FACE_LEFT;
		}else if(n == ROLE_FACE_TOP){
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 2, y, rect.width, rect.height));
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 3, y, rect.width, rect.height));
		
			this._face_to = ROLE_FACE_TOP;
		}else if(n == ROLE_FACE_RIGHT){
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 6, y, rect.width, rect.height));
			animation.addSpriteFrameWithTexture(texture, cc.rect(x + rect.width * 7, y, rect.width, rect.height));
		
			this._face_to = ROLE_FACE_RIGHT;
		}
		
		animation.setDelayPerUnit(ROLE_FACE_ANIMATION);
		var action = cc.animate(animation);
		this.stopAllActions();
		this.runAction(action.repeatForever());
	},
	get_face_to:function(){
		return this._face_to;
	},
	cur_hp:function(n){
		if(n == undefined){
			return this._cur_hp;
		}

		this._cur_hp = n;
	},
	cur_mp:function(n){
		if(n == undefined){
			return this._cur_mp;
		}

		this._cur_mp = n;
	},
});


//角色輔助 函數
var util_role = {};

//返回指定兵種 在指定地形的 作戰效率
util_role.utility = function(arms,t){
	if(t == MAP_TILE_TYPE_BARRACK){
		return 10;
	}else if(t == MAP_TILE_TYPE_CASTLE){
		return 20;
	}
	
	
	if(arms == ROLE_ARMS_TYPE_HERO ||  //英雄
			arms == ROLE_ARMS_TYPE_CAVALRY || //騎兵
			arms == ROLE_ARMS_TYPE_HORSE_ARCHER	//騎射
	){
		if(t == MAP_TILE_TYPE_PLAIN || 
				t == MAP_TILE_TYPE_PRAIRIE){
			return 10;
		}else if(t == MAP_TILE_TYPE_HOUSES){
			return 0;
		}
		
		else if(t == MAP_TILE_TYPE_SWAMP){
			return -20;
		}
		
	}
	
	else if(arms == ROLE_ARMS_TYPE_TAOIST ||	//道士
			arms == ROLE_ARMS_TYPE_WARLOCK ||	//術士
			arms == ROLE_ARMS_TYPE_COUNSELOR	//謀士
	){
		if(t == MAP_TILE_TYPE_PLAIN || 
				t == MAP_TILE_TYPE_PRAIRIE){
			return 0;
		}else if(t == MAP_TILE_TYPE_HOUSES){
			return 0;
		}

		else if(t == MAP_TILE_TYPE_SWAMP){
			return 0;
		}
	}
	
	else if(arms == ROLE_ARMS_TYPE_INFANTRY	){	//步兵
		if(t == MAP_TILE_TYPE_PLAIN || 
				t == MAP_TILE_TYPE_PRAIRIE){
			return 0;
		}else if(t == MAP_TILE_TYPE_HOUSES){
			return 0;
		}

		else if(t == MAP_TILE_TYPE_SWAMP){
			return -10;
		}
	}else if(arms == ROLE_ARMS_TYPE_ARCHER){	//弓箭手
		if(t == MAP_TILE_TYPE_PLAIN || 
				t == MAP_TILE_TYPE_PRAIRIE){
			return 0;
		}else if(t == MAP_TILE_TYPE_HOUSES){
			return 0;
		}

		else if(t == MAP_TILE_TYPE_SWAMP){
			return -10;
		}
	}else if(arms == ROLE_ARMS_TYPE_BANDIT){	//山賊
		if(t == MAP_TILE_TYPE_PLAIN || 
				t == MAP_TILE_TYPE_PRAIRIE){
			return 0;
		}else if(t == MAP_TILE_TYPE_HOUSES){
			return 0;
		}

		else if(t == MAP_TILE_TYPE_SWAMP){
			return -10;
		}
	}
	return 0;
};

//返回指定兵種 在指定地形 消耗機動力
util_role.move = function(arms,t){
	
	if(t == MAP_TILE_TYPE_BARRACK || 
			t == MAP_TILE_TYPE_CASTLE ||
			
			t == MAP_TILE_TYPE_PLAIN ||
			t == MAP_TILE_TYPE_PRAIRIE ||
			t == MAP_TILE_TYPE_HOUSES
			){
		return 1;
	}


	//沼澤
	if(t == MAP_TILE_TYPE_SWAMP){
		//各種步兵
		if(arms == ROLE_ARMS_TYPE_TAOIST ||
				arms == ROLE_ARMS_TYPE_WARLOCK ||
				arms == ROLE_ARMS_TYPE_COUNSELOR ||
				
				arms == ROLE_ARMS_TYPE_INFANTRY ||
				arms == ROLE_ARMS_TYPE_ARCHER ||
				arms == ROLE_ARMS_TYPE_BANDIT ){
			return 2;
		}
		//各種 騎兵
		if(arms == ROLE_ARMS_TYPE_HERO ||
				arms == ROLE_ARMS_TYPE_CAVALRY ||
				arms == ROLE_ARMS_TYPE_HORSE_ARCHER ){
			return 3;
		}
	}
	return 1;
};

