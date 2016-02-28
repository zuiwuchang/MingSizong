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
});