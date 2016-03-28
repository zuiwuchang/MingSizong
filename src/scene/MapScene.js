/*		遊戲地圖		*/

var MapUiSelect = cc.Sprite.extend({
	_n:0,
	_callback:null,
	ctor:function (callback) {
		this._super("res/scene/map/14.png");

		this._callback = callback;


		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (target.isVisible() && cc.rectContainsPoint(rect, locationInNode)) {

					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();

				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					if(!MapStatus.is_statue(MAP_STATUE_MY)){
						return;
					}
					target._e_click();
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	reset_n:function(){
		this._n = 0;
	},
	_e_click:function(){
		++this._n;
		this._callback(this,this._n);
	},
	do_click:function(){
		this._e_click();
	},
});

//地形信息 顯示框
var MapUiTile = cc.Sprite.extend({
	_fire:null,
	_water:null,
	_stone:null,
	_wind:null,

	_text_name:null,
	_text_info:null,
	_tile:null,
	ctor:function () {
		this._super("res/scene/map/tile.png");
		this.opacity = 180;

		this._init();
	},
	_init:function(){
		//初始化 火系 法術
		var node = new cc.Sprite("res/scene/map/57.png");
		node.attr({
			x:2 + 16,
			y:13,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._fire = node;

		//初始化 水系 法術
		var node = new cc.Sprite("res/scene/map/58.png");
		node.attr({
			x:2 + 16 + 16*2,
			y:13,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._water = node;

		//初始化 石系 法術
		var node = new cc.Sprite("res/scene/map/59.png");
		node.attr({
			x:2 + 16 + 16*4,
			y:13,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._stone = node;


		//初始化 風系 法術
		var node = new cc.Sprite("res/scene/map/60.png");
		node.attr({
			x:2 + 16 + 16*6,
			y:13,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._wind = node;



		//地形名稱
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL3);

		node.attr({
			x:2 + 16 + 16*3 - 1,
			y:this.height - 9,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text_name = node;


		//地形描述
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL3);

		node.attr({
			x:2 + 16 + 16*3 - 1,
			y:this.height - 9 - 5 - FONT_DEFAULT_SMALL3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text_info = node;

	},
	set_info:function(t,sprite){

		if(MAP_TILE_TYPE_PLAIN == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_PLAIN"));
			this._text_info.setString("");

			this.set_fire(true);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(true);
		}else if(MAP_TILE_TYPE_PRAIRIE == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_PRAIRIE"));
			this._text_info.setString("");

			this.set_fire(true);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(true);
		}else if(MAP_TILE_TYPE_HOUSES == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_HOUSES"));
			this._text_info.setString("");

			this.set_fire(true);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(false);
		}

		else if(MAP_TILE_TYPE_BARRACK == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_BARRACK"));

			this._text_info.setColor(cc.color(0, 208, 240));
			this._text_info.setString(_("TAG_MAP_TILE_INFO_HP"));

			this.set_fire(true);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(false);
		}else if(MAP_TILE_TYPE_CASTLE == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_CASTLE"));

			this._text_info.setColor(cc.color(0, 208, 240));
			this._text_info.setString(_("TAG_MAP_TILE_INFO_HP"));

			this.set_fire(true);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(false);
		}

		else if(MAP_TILE_TYPE_FENCES == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_FENCES"));

			this._text_info.setColor(cc.color(127, 127, 127));
			this._text_info.setString(_("TAG_MAP_TILE_NO_MOVE"));

			this.set_fire(false);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(false);
		}else if(MAP_TILE_TYPE_WALL == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_WALL"));

			this._text_info.setColor(cc.color(127, 127, 127));
			this._text_info.setString(_("TAG_MAP_TILE_NO_MOVE"));

			this.set_fire(false);
			this.set_water(false);
			this.set_stone(false);
			this.set_wind(false);
		}

		else if(MAP_TILE_TYPE_SWAMP == t){
			this._text_name.setString(_("TAG_MAP_TILE_TYPE_SWAMP"));
			this._text_info.setString("");

			this.set_fire(false);
			this.set_water(true);
			this.set_stone(false);
			this.set_wind(false);
		}

		this.set_tile(sprite);

	},
	//設置 法術 狀態
	set_fire:function(ok){
		var node = this._fire;
		this._set_magic(node,ok);
	},
	set_water:function(ok){
		var node = this._water;
		this._set_magic(node,ok);
	},
	set_stone:function(ok){
		var node = this._stone;
		this._set_magic(node,ok);
	},
	set_wind:function(ok){
		var node = this._wind;
		this._set_magic(node,ok);
	},
	_set_magic:function(sprite,ok){
		if(ok){
			if(sprite._shader != undefined){
				sprite.setShaderProgram(sprite._shader);

				sprite._shader = undefined;
			}
		}else{
			if(sprite._shader == undefined){
				sprite._shader = sprite.getShaderProgram();

				var shader = dark.shader.get_gray_shaders();
				sprite.setShaderProgram(shader);
			}
		}
	},
	set_tile:function(sprite){
		if(this._tile != null){
			this.removeChild(this._tile);
		}
		
		var node = new cc.Sprite();
		node.initWithTexture(sprite.getTexture(),sprite.getTextureRect());
		node.attr({
			x:10,
			y:this.height - 10,
			anchorX:0,
			anchorY:1,
			
		});
		this.addChild(node);
		
		this._tile = node;
	},
});

//角色 信息 顯示框
var MapUiRole = cc.Sprite.extend({
	_text_name:null,
	_text_arms:null,
	_text_lv:null,
	_text_hp:null,
	_text_mp:null,
	
	_text_faction:null,
	_text_tile:null,
	_text_addition:null,

	_bar_hp:null,
	_bar_mp:null,
	ctor:function () {
		this._super("res/scene/map/role0.png");
		this.opacity = 180;

		this._init();
	},
	_init:function(){
		//角色 名稱
		var node = new ccui.Text("謝曉峰",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:8,
			y:this.height - 7,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text_name = node;



		//角色 兵種
		node = new ccui.Text("山賊",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:8 + 80,
			y:this.height - 7,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text_arms = node;

		
		
		//角色 等級
		node = new ccui.Text("LV 32",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:8 + 80 + 50,
			y:this.height - 7,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text_lv= node;
		
		//
		node = new cc.Sprite("res/scene/map/7.png");
		node.attr({
			x:8,
			y:this.height / 2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		
		//hp bar back
		node = new cc.Sprite("res/scene/map/bar_back.png");
		node.attr({
			x:40,
			y:this.height / 2 + 2,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		
		//hp bar
		node = new ccui.LoadingBar();
		node.loadTexture("res/scene/map/bar.png");
		node.setPercent(100);
		node.attr({
			x:40,
			y:this.height / 2 + 2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._bar_hp = node;
		node.setPercent(10);
		//hp
		node = new ccui.Text("1650/2370",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		
		node.attr({
			x:this.width / 2 + 30,
			y:this.height / 2 + 4 + 2,
			anchorX:0.5,
			anchorY:0
		});
		this.addChild(node);
		this._text_hp= node;
		
		
		
		//
		node = new cc.Sprite("res/scene/map/8.png");
		node.attr({
			x:8,
			y:this.height / 2 ,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		
		
		//hp bar back
		node = new cc.Sprite("res/scene/map/bar_back.png");
		node.attr({
			x:40,
			y:this.height / 2 - 4,
			anchorX:0,
			anchorY:1,
		});
		this.addChild(node);
		
		//mp bar
		node = new ccui.LoadingBar();
		node.loadTexture("res/scene/map/bar.png");
		node.setPercent(50);
		node.attr({
			x:40,
			y:this.height / 2 - 4,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._bar_mp = node;
		
		//mp
		node = new ccui.Text("1650/2370",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:this.width / 2 + 30,
			y:this.height / 2 - 4 - 2,
			anchorX:0.5,
			anchorY:1
		});
		this.addChild(node);
		this._text_mp= node;
		
		
		//陣營
		node = new ccui.Text("友軍",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:8,
			y:6,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._text_faction = node;

		//地形
		node = new ccui.Text("平原",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:this.width * 3 / 4 - 2,
			y:6,
			anchorX:1,
			anchorY:0
		});
		this.addChild(node);
		this._text_tile = node;

		node = new ccui.Text("100%",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);

		node.attr({
			x:this.width * 3 / 4 + 2,
			y:6,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._text_addition = node;
	},
	set_name:function(str){
		this._text_name.setString(str);
	},
	set_arms:function(str){
		this._text_arms.setString(str);
	},
	set_lv:function(n){
		this._text_lv.setString("Lv " + n);
	},
	set_hp:function(n,max){
		this._text_hp.setString(n + "/" + max);
		
		var percent = Math.ceil(n * 100 / max);
		if(percent < 5){
			percent = 5
		}else if (percent > 100){
			percent = 100
		}
		
		this._bar_hp.setPercent(percent);
	},
	set_mp:function(n,max){
		this._text_mp.setString(n + "/" + max);

		var percent = Math.ceil(n * 100 / max);
		if(percent < 5){
			percent = 5
		}else if (percent > 100){
			percent = 100
		}
		
		this._bar_mp.setPercent(percent);
	},
	set_faction:function(faction){
		if(faction == 0){
			this._text_faction.setString(_("TAG_FACTION_MY"));
		}else if(faction == 1){
			this._text_faction.setString(_("TAG_FACTION_FRIEND"));
		}else if(faction == 2){
			this._text_faction.setString(_("TAG_FACTION_ENEMY"));
		}
	},
	set_tile:function(t){
		this._text_tile.setString(dark.s_map_fun.get_type_name(t));
	},
	set_addition:function(addition){
		this._text_addition.setString(addition + "%");
	},
});

var MapLayerMy = cc.Layer.extend({
	_ids:null,
	
	_max_x:0,
	_max_y:0,
	_width:0,
	_height:0,
	
	_touch_call:null,
	_click_call:null,
	ctor:function (ids,max_x,max_y,width,height) {
		this._super();

		this._max_x = max_x;
		this._max_y = max_y;
		this._width = width;
		this._height = height;
		
		this._ids = ids;

		this._init();
	},
	_init:function(){
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;

		var obj = dark.map[name];
		var positions = obj.positions;

		var ids = this._ids;
		for(var i=0;i<ids.length;++i){
			var id = ids[i];
			var obj = this._get_role(id);
			if(obj == null){
				cc.log("not found role(" + id + ") at save");
				continue;
			}

			var pos = positions[i];
			var x = pos.x * this._width;
			var y = (this._max_y - pos.y) * this._height;
			var face_to = pos.face_to;
			
			var sprite = role_factory.create(obj.id,obj.sid,obj.lv);
			sprite.face_to(face_to);
			sprite.e_touch(this._e_touch.bind(this));
			sprite.e_click(this._e_click.bind(this));
			sprite.attr({
				x:x,
				y:y,
				anchorX:0,
				anchorY:0,
			});
			this.addChild(sprite);
		}
	},
	_get_role:function(id){
		var record = dark.e_save.get_record();
		var roles = record.roles();
		for(var i=0;i<roles.length;++i){
			if(id == roles[i].id){
				return roles[i];
			}
		}
		return null;
	},
	_e_touch:function(sprite){
		if(this._touch_call != null){
			this._touch_call(sprite);
		}
	},
	_e_click:function(sprite){
		if(this._click_call != null){
			this._click_call(sprite);
		}
	},
	e_touch:function(call_back){
		if(call_back == undefined){
			return this._touch_call;
		}

		this._touch_call = call_back;
	},
	e_click:function(call_back){
		if(call_back == undefined){
			return this._click_call;
		}

		this._click_call = call_back;
	},
	//返回 指定坐標的 角色
	get_sprite:function(x,y){
		var sprites = this.getChildren();
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			
			var s_x = Math.floor(sprite.x / this._width);
			var s_y = Math.floor(sprite.y / this._height);
			
			if(x == s_x && y == s_y){
				return sprite;
			}
		}
		return null;
	},
});

var MapLayerEnemy = cc.Layer.extend({
	_max_x:0,
	_max_y:0,
	_width:0,
	_height:0,
	
	_touch_call:null,
	_click_call:null,
	ctor:function (max_x,max_y,width,height) {
		this._super();

		this._max_x = max_x;
		this._max_y = max_y;
		this._width = width;
		this._height = height;

		this._init();
	},
	_init:function(){
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;
		
		var obj = dark.map[name];
		var enemys = obj.enemys;
			
		var n = 0;
		for(var i=0;i<enemys.length;++i){
			var  obj = enemys[i];
			
			var x = obj.x * this._width;
			var y = (this._max_y - obj.y) * this._height;

			var sprite;
			if(obj.only){
				sprite = role_factory.create(obj.id,obj.sid,obj.lv);
			}else{
				sprite = role_factory.create_normal(obj.id,n,obj.sid,obj.lv);
				++n;
			}
			var face_to = obj.face_to;
			sprite.face_to(face_to);
			
			sprite.e_touch(this._e_touch.bind(this));
			sprite.e_click(this._e_click.bind(this));
			sprite.attr({
				x:x,
				y:y,
				anchorX:0,
				anchorY:0,
			});
			this.addChild(sprite);
		}
	},
	_e_touch:function(sprite){
		if(this._touch_call != null){
			this._touch_call(sprite);
		}
	},
	_e_click:function(sprite){
		if(this._click_call != null){
			this._click_call(sprite);
		}
	},
	e_touch:function(call_back){
		if(call_back == undefined){
			return this._touch_call;
		}

		this._touch_call = call_back;
	},
	e_click:function(call_back){
		if(call_back == undefined){
			return this._click_call;
		}

		this._click_call = call_back;
	},
	//返回 指定坐標的 角色
	get_sprite:function(x,y){
		var sprites = this.getChildren();
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			
			var s_x = Math.floor(sprite.x / this._width);
			var s_y = Math.floor(sprite.y / this._height);
			
			if(x == s_x && y == s_y){
				return sprite;
			}
		}
		return null;
	},
});


var MapLayerFriend = cc.Layer.extend({
	_max_x:0,
	_max_y:0,
	_width:0,
	_height:0,
	
	_touch_call:null,
	_click_call:null,
	ctor:function (max_x,max_y,width,height) {
		this._super();

		this._max_x = max_x;
		this._max_y = max_y;
		this._width = width;
		this._height = height;

		this._init();
	},
	_init:function(){
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;
		
		var obj = dark.map[name];
		var friends = obj.friends;
			
		var n = 0;
		for(var i=0;i<friends.length;++i){
			var  obj = friends[i];
			
			var x = obj.x * this._width;
			var y = (this._max_y - obj.y) * this._height;

			var sprite;
			if(obj.only){
				sprite = role_factory.create(obj.id,obj.sid,obj.lv);
			}else{
				sprite = role_factory.create_normal(obj.id,n,obj.sid,obj.lv);
				++n;
			}
			var face_to = obj.face_to;
			sprite.face_to(face_to);
			sprite.e_touch(this._e_touch.bind(this));
			sprite.e_click(this._e_click.bind(this));
			sprite.attr({
				x:x,
				y:y,
				anchorX:0,
				anchorY:0,
			});
			this.addChild(sprite);
		}
	},
	_e_touch:function(sprite){
		if(this._touch_call != null){
			this._touch_call(sprite);
		}
	},
	_e_click:function(sprite){
		if(this._click_call != null){
			this._click_call(sprite);
		}
	},
	e_touch:function(call_back){
		if(call_back == undefined){
			return this._touch_call;
		}

		this._touch_call = call_back;
	},
	e_click:function(call_back){
		if(call_back == undefined){
			return this._click_call;
		}

		this._click_call = call_back;
	},
	//返回 指定坐標的 角色
	get_sprite:function(x,y){
		var sprites = this.getChildren();
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			
			var s_x = Math.floor(sprite.x / this._width);
			var s_y = Math.floor(sprite.y / this._height);
			
			if(x == s_x && y == s_y){
				return sprite;
			}
		}
		return null;
	},
});
//圖層 編號
var MAP_TAG_TILE_MAP = 1;
var MapLayer = cc.Layer.extend({
	//tmx 地圖
	_map:null,
	ctor:function (ids) {
		this._super();
		
		this._init(ids);
	},
	_init:function(ids){
		//初始化地圖
		var node = new MapTMX(ids);
		this.addChild(node);
		this._map = node;
	},
});

//定義 地圖 狀態
var MAP_STATUE_DRAMA		=	0;	//執行劇本
var MAP_STATUE_MY			=	1;	//自己回合
var MAP_STATUE_FRIEND		=	2;	//友軍回合
var MAP_STATUE_ENEMY		=	3;	//敵軍回合
var MapStatus = {
	_statue:0,
	_talk:false,
	statue:function(s){
		if(s == undefined){
			return this._statue;
		}

		this._statue = s;
	},
	is_statue:function(s){
		if(s == this._statue){
			return true;
		}
		return false;
	},
	talk:function(ok){
		if(ok == undefined){
			return this._talk;
		}
		this._talk = ok;
	},
	is_talk:function(){
		if(this._statue == MAP_STATUE_DRAMA && this._talk){
			return true;
		}
		return false;
	},
};

//談話 對話框
var MapTalkBox = cc.Sprite.extend({
	_w:0,
	_h:0,
	_map_w:0,
	_map_h:0,

	ctor:function (w,h,map_w,map_h) {
		this._super();
		
		this._w = w;
		this._h = h;
		this._map_w = map_w;
		this._map_h = map_h;
	},
	set_talk:function(x,y,face,name,str){
		this.removeAllChildren();
		
		this.setVisible(true);
		
		str = dark.drama_fun.repleace(str);
		//top
		if(y + this._h * 4 > this._h * this._map_h){
			this._set_bottom(x,y,face,name,str);
		}else{
			this._set_top(x,y,face,name,str);
		}
	},
	_set_top:function(x,y,face,name,str){
		if(x < this._w * 4){
			this._set_top_right(x,y,face,name,str)
		}else if(x + this._w * 4 >= this._w * this._map_w){
			this._set_top_left(x,y,face,name,str)
		}else{
			this._set_top_normal(x,y,face,name,str)
		}		
	},
	_set_top_normal:function(x,y,face,name,str){
		this.initWithFile("res/public/talk1.png");
		
		this.attr({
			x:x + this._w / 2,
			y:y + this._h + this._h / 2,
			anchorX:0.5,
			anchorY:0,
		});
		
		
		var node = new cc.Sprite("res/public/49.png");
		node.attr({
			x:this.width / 2,
			y:0,
			anchorX:0.5,
			anchorY:1,
		});
		this.addChild(node);
		
		
		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:10,
			y:10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		
		
		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:10 + 64 + 20 + 10  - 5,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		
		
		
		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 64 + 20 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
	_set_top_right:function(x,y,face,name,str){
		this.initWithFile("res/public/talk0.png");

		this.attr({
			x:x + this._w +  this._w / 2,
			y:y ,
			anchorX:0,
			anchorY:0,
		});


		var node = new cc.Sprite("res/public/48.png");
		node.attr({
			x:-node.width,
			y:this._h/2,
			anchorX:0,
			anchorY:0.5,
		});
		this.addChild(node);


		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:this.width - 10,
			y:10,
			anchorX:1,
			anchorY:0,
		});
		this.addChild(node);


		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:this.width - (10 + 64 + 20 + 10) - node.width,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);



		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
	_set_top_left:function(x,y,face,name,str){
		this.initWithFile("res/public/talk1.png");

		this.attr({
			x:x - this._w / 2,
			y:y,
			anchorX:1,
			anchorY:0,
		});


		var node = new cc.Sprite("res/public/48.png");
		node.attr({
			x:this.width,
			y:this._h/2,
			anchorX:0,
			anchorY:0.5,
			flippedX:true,
		});
		this.addChild(node);


		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:10,
			y:10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);


		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:10 + 64 + 20 + 10  - 5,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);



		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 64 + 20 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
	_set_bottom:function(x,y,face,name,str){
		if(x < this._w * 4){
			this._set_bottom_right(x,y,face,name,str)
		}else if(x + this._w * 4 >= this._w * this._map_w){
			this._set_bottom_left(x,y,face,name,str)
		}else{
			this._set_bottom_normal(x,y,face,name,str)
		}		
	},
	_set_bottom_normal:function(x,y,face,name,str){
		this.initWithFile("res/public/talk1.png");

		this.attr({
			x:x + this._w / 2,
			y:y - this._h / 2,
			anchorX:0.5,
			anchorY:1,
		});


		var node = new cc.Sprite("res/public/49.png");
		node.attr({
			x:this.width / 2,
			y:this.height,
			anchorX:0.5,
			anchorY:0,
			flippedY:true,
		});
		this.addChild(node);


		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:10,
			y:10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);


		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:10 + 64 + 20 + 10  - 5,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);



		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 64 + 20 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
	_set_bottom_right:function(x,y,face,name,str){
		this.initWithFile("res/public/talk0.png");

		this.attr({
			x:x + this._w + this._w/2 ,
			y:y + this._h ,
			anchorX:0,
			anchorY:1,
		});


		var node = new cc.Sprite("res/public/48.png");
		node.attr({
			x:0,
			y:this.height - this._h/2,
			anchorX:1,
			anchorY:0.5,
		});
		this.addChild(node);


		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:this.width - 10,
			y:10,
			anchorX:1,
			anchorY:0,
		});
		this.addChild(node);


		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:this.width - (10 + 64 + 20 + 10) - node.width,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);



		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
	_set_bottom_left:function(x,y,face,name,str){
		this.initWithFile("res/public/talk1.png");

		this.attr({
			x:x - this._w / 2,
			y:y + this._h,
			anchorX:1,
			anchorY:1,
		});


		var node = new cc.Sprite("res/public/48.png");
		node.attr({
			x:this.width,
			y:this.height - this._h/2,
			anchorX:0,
			anchorY:1,
			flippedX:true,
		});
		this.addChild(node);


		node = new cc.Sprite("res/face/" + face + ".png");
		node.attr({
			x:10,
			y:10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);


		node = new ccui.Text(name,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:10 + 64 + 20 + 10  - 5,
			y:55 + 13 + 10,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);



		node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:10 + 64 + 20 + 10,
			y:55 + 13,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
	},
});

//可移動範圍
var RangeLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		
	},
	hide:function(){
		this.removeAllChildren();
	},
	show:function(obj,faction){
		var str;
		if(faction == 0){
			str = "res/scene/map/0.png";
		}else{
			str = "res/scene/map/1.png";
		}
		for (key in obj)
		{
			var pos = obj[key];
			var node = new cc.Sprite(str);
			node.attr({
				x:pos.x * 48,
				y:pos.y * 48,
				anchorX:0,
				anchorY:0,
				opacity :150
			});
			this.addChild(node);
		}
	},
});
var MapTMX = cc.TMXTiledMap.extend({
	_ids:null,
	//地圖配置
	_obj:null,

	//當前 劇本 執行位置
	_drama:null,
	_drama_pos:0,

	//控制角色
	_my:null,
	//敵軍
	_enemy:null,
	
	//可移動範圍
	_range:null,

	//選擇框
	_select:null,

	//地形信息框
	_tile:null,

	//角色信息 顯示框
	_role_box:null,

	//說話對話框
	_talk_box:null,
	_wait:false,
	ctor:function (ids) {
		//加載地圖
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;
		
		var obj = dark.map[name];
		this._obj = obj;
		this._super(obj.map);
		this._ids = ids;
		
		var pos = obj.pos;
		this.show_pos(pos.x,pos.y);



		this._init();

		//增加拖拽功能
		var height = this.mapHeight * this.tileHeight;
		var width = this.mapWidth * this.tileWidth;
		var size = cc.winSize;	


		var min_x = 0;
		var max_x = 0;
		if(width > size.width){
			min_x = size.width - width;
			//max_x = 0;
		}else{
			//min_x = 0;
			max_x = size.width - width;
		}

		var min_y = 0;
		var max_y = 0;
		if(height > size.height){
			min_y = size.height - height;
			max_y = 0;
		}else{
			//min_y = 0;
			max_y = size.height - height;
		}

		
		
		if ('touches' in cc.sys.capabilities){
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ALL_AT_ONCE,
				onTouchesMoved: function (touches, event) {
					if(!MapStatus.is_statue(MAP_STATUE_MY)){
						return;
					}

					var touch = touches[0];
					var delta = touch.getDelta();

					//計算移動後 位置
					var node = event.getCurrentTarget();
					node.x += delta.x;
					node.y += delta.y;

					//驗證 位置
					if(node.x < min_x){
						node.x = min_x;
					}else if(node.x > max_x){
						node.x = max_x;
					}

					if(node.y < min_y){
						node.y = min_y;
					}else 
						if(node.y > max_y){
							node.y = max_y;
						}
				}
			}, this);
		} else if ('mouse' in cc.sys.capabilities)
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseMove: function(event){
					if(!MapStatus.is_statue(MAP_STATUE_MY)){
						return;
					}
					
					if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
						
						//計算移動後 位置
						var node = event.getCurrentTarget();
						node.x += event.getDeltaX();
						node.y += event.getDeltaY();

						//驗證 位置
						if(node.x < min_x){
							node.x = min_x;
						}else if(node.x > max_x){
							node.x = max_x;
						}

						if(node.y < min_y){
							node.y = min_y;
						}else 
							if(node.y > max_y){
								node.y = max_y;
							}
					}
				}
			}, this);
		
		//初始化 談話 對話框
		this._init_talk_box();
		//初始化 劇本
		this._init_drama();
	},
	_init:function(){
		//初始化 移動範圍
		this._init_range();
		
		
		//初始化 出戰角色
		var node = new MapLayerMy(this._ids,this.mapWidth - 1, this.mapHeight - 1,this.tileWidth,this.tileHeight);
		node.e_touch(this._e_touch_my.bind(this));
		node.e_click(this._e_click_my.bind(this));
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._my = node;
		
		//初始化 友軍
		node = new MapLayerFriend(this.mapWidth - 1, this.mapHeight - 1,this.tileWidth,this.tileHeight);
		node.e_touch(this._e_touch_my.bind(this));
		node.e_click(this._e_click_my.bind(this));
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._friend = node;
		
		//初始化 敵軍
		node = new MapLayerEnemy(this.mapWidth - 1, this.mapHeight - 1,this.tileWidth,this.tileHeight);
		node.e_touch(this._e_touch_my.bind(this));
		node.e_click(this._e_click_my.bind(this));
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0,
		});
		this.addChild(node);
		this._enemy = node;
		
		
		
		//初始化選擇框
		this._init_select();
		
		//初始化 信息框
		this._init_box();
	},
	_init_range:function(){
		var node = new RangeLayer();
		this.addChild(node);
		this._range = node;
	},
	_init_select:function(){
		//增加選擇框
		var node = new MapUiSelect(this._e_select.bind(this));
		node.attr({
			anchorX:0,
			anchorY:0,
		});
		node.setVisible(false);
		this.addChild(node);
		this._select = node;
		
		
		//綁定 事件
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					target._select.setVisible(false);
					target._select.reset_n();
					target._hide_box();
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				
				
				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					if(MapStatus.is_talk()){
						target._execute_next_drama();
						return;
					}
					
					if(!MapStatus.is_statue(MAP_STATUE_MY)){
						return;
					}
					
					var pos = locationInNode;
					
					var size = target.getTileSize();
					
					var x = Math.floor(pos.x / size.width) * size.width;
					var y = Math.floor(pos.y / size.height) * size.height;
					
					
					
					target._select.attr({
						"x":x,
						"y":y,
					});
					target._select.setVisible(true);
					target._select.do_click();
					
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	_e_select:function(sprite,n){
		var size = this.getTileSize();

		var x = sprite.x / size.width;
		var y = sprite.y / size.height;
		
		
		this._hide_box();
		if(this._show_cmd_my(x,y,n)){

		}else if(this._show_cmd_friend(x,y,n)){

		}else if(this._show_cmd_enemy(x,y,n)){

		}else if(this._show_cmd_sys(x,y,n)){

		}
		
	},
	//隱藏 box
	_hide_box:function(){
		this._role_box.setVisible(false);
		this._tile.setVisible(false);
		
		this._range.hide();
	},
	//顯示角色 信息
	_show_role_info:function(x,y,faction){
		//查看 地形
		var obj = {};
		var size = this.getTileSize();
		
		var max_x = this.mapWidth;
		var max_y = this.mapHeight;
		
		//左右
		if(x > max_x - 6){
			//左
			obj.x = x * size.width;
			obj.anchorX = 1;
		}else{
			//右
			obj.x = (x + 1) * size.width;
			obj.anchorX = 0;
		}
		
		
		//上下
		if(y < 3){
			//上
			obj.y = y * size.height;
			obj.anchorY = 0;
		}else{
			//下
			obj.y = (y + 1) * size.height;
			obj.anchorY = 1;
		}
		
		//設置 信息
		var box = this._role_box;
		{
			//
			var sprite = this.get_role_by_pos(x,y,faction);
			if(sprite == null){
				cc.log("show role info error ,not found role at(" + x + "," + y + "," + faction + ")");
				return;
			}

			box.set_name(sprite.name());
			box.set_arms(sprite.type_arms_str());
			box.set_lv(sprite.lv());
			
			box.set_hp(sprite.cur_hp(), sprite.get_hp());
			box.set_mp(sprite.cur_mp(), sprite.get_mp());
			
			box.set_faction(faction);
			
			var t = this.get_pos_type(x, y);
			box.set_tile(t);
			
			var addition = util_role.utility(sprite.type_arms(),t) + 100;
			box.set_addition(addition);
		}
		
		//設置 顯示 位置
		box.attr(obj);
		box.setVisible(true);	
	},
	//選擇 自己單位
	_show_cmd_my:function(x,y,n){
		//判斷是否存在 自己的單位
		var layer = this._my;
		var sprite = layer.get_sprite(x,y);
		if(sprite == null){
			return false;
		}
		
		cc.log("my " + n);
		//判斷 操作類型
		if(n == 1){
			//查看 信息
			this._show_role_info(x, y, 0);
		}else if(n == 2){
			//移動 攻擊
			this._show_range(0,x,y,sprite);
		}else if(n == 3){
			//角色命令菜單

			//重置n
			this._select.reset_n();
		}
		return true;
	},
	//選擇 友軍
	_show_cmd_friend:function(x,y,n){
		var layer = this._friend;
		var sprite = layer.get_sprite(x,y);
		if(sprite == null){
			return false;
		}
		cc.log("friend " + n);
		if(n == 1){
			//查看 信息
			this._show_role_info(x, y, 1);
		}else if(n == 2){
			//查看 移動範圍 攻擊範圍
			this._show_range(1,x,y,sprite);

			//重置n
			this._select.reset_n();
		}
		return true;
	},
	//選擇 敵軍
	_show_cmd_enemy:function(x,y,n){
		var layer = this._enemy;
		var sprite = layer.get_sprite(x,y);
		if(sprite == null){
			return false;
		}
		cc.log("enemy " + n);
		if(n == 1){
			//查看 信息
			this._show_role_info(x, y, 2);
		}else if(n == 2){
			//查看 移動範圍 攻擊範圍
			this._show_range(2,x,y,sprite);

			//重置n
			this._select.reset_n();
		}
		return true;
	},
	//顯示 移動範圍
	_show_range:function(faction,x,y,sprite){
		var obj = {};
		var cur = {
				x:x,
				y:y,
				n:sprite.move(),
				parent:null
		};
		var cache = {};
		this._get_range(obj,cache,faction,cur,sprite.type_arms())
		this._range.show(obj,faction);
	},
	_get_range:function(obj,cache,faction,pos,arms){
		if(pos.n <= 0){
			return;
		}
		var x = pos.x;
		var y = pos.y;
		var n = pos.n;
		
		var top = {
				x:x,
				y:y + 1,
				parent:pos
		};
		if(top.y < this.mapHeight){
			if(this._pos_can_move(cache,faction,top.x,top.y)){
				var t = this.get_pos_type(top.x, top.y);
				if(dark.s_map_fun.is_move(t)){
					if(this._has_enemy(cache,faction, top.x+1, top.y)){
						top.n = 0;
					}else if(this._has_enemy(cache,faction, top.x-1, top.y)){
						top.n = 0;
					}else{
						top.n = n - util_role.move(arms,t);
					}
					
					if(this._add_range(obj,top)){	
						this._get_range(obj,cache, faction, top, arms);
					}
				}
			}
		}
		
		var bottom = {
				x:x,
				y:y - 1,
				parent:pos
		};
		if(bottom.y >= 0){
			if(this._pos_can_move(cache,faction,bottom.x,bottom.y)){
				
				var t = this.get_pos_type(bottom.x, bottom.y);
				if(dark.s_map_fun.is_move(t)){
					if(this._has_enemy(cache,faction, bottom.x+1, bottom.y)){
						bottom.n = 0;
					}else if(this._has_enemy(cache,faction, bottom.x-1, bottom.y)){
						bottom.n = 0;
					}else{
						bottom.n = n - util_role.move(arms,t);
					}
					if(this._add_range(obj,bottom)){
						this._get_range(obj,cache, faction, bottom, arms);
					}
				}
			}
		}
	
		var left = {
				x:x - 1,
				y:y,
				parent:pos
		};
		if(left.x >= 0){
			if(this._pos_can_move(cache,faction,left.x,left.y)){
				var t = this.get_pos_type(left.x, left.y);
				if(dark.s_map_fun.is_move(t)){
					if(this._has_enemy(cache,faction, left.x, left.y + 1)){
						left.n = 0;
					}else if(this._has_enemy(cache,faction, left.x, left.y - 1)){
						left.n = 0;
					}else{
						left.n = n - util_role.move(arms,t);
					}
					if(this._add_range(obj,left)){	
						this._get_range(obj,cache, faction, left, arms);
					}
				}
			}
		}		
		var right = {
				x:x + 1,
				y:y,
				parent:pos
		};
		if(right.x < this.mapWidth){
			if(this._pos_can_move(cache,faction,right.x,right.y)){
				var t = this.get_pos_type(right.x, right.y);
				if(dark.s_map_fun.is_move(t)){
					if(this._has_enemy(cache,faction, right.x, right.y + 1)){
						right.n = 0;
					}else if(this._has_enemy(cache,faction, right.x, right.y - 1)){
						right.n = 0;
					}else{
						right.n = n - util_role.move(arms,t);
					}
					if(this._add_range(obj,right)){
						this._get_range(obj, cache,faction, right, arms);
					}
				}
			}
		}
	},
	_pos_can_move:function(cache,faction,x,y){
		if(this._has_enemy(cache,faction, x, y)){
			return false;
		}
		
		return true;
	},
	_has_enemy:function(cache,faction,x,y){
		var str = x + "-" + y;
		var has = cache[str];
		if(has !=undefined){
			return has;
		}
		
		if(faction == 2){
			if(this.get_role_by_pos(x, y, 0) != null ||
					this.get_role_by_pos(x, y, 1) != null){
				cache[str] = true;
				return true;
			}
		}else{
			if(this.get_role_by_pos(x, y, 2) != null){
				cache[str] = true;
				return true;
			}
		}
		cache[str] = false;
		return false;
	},
	_add_range:function(obj,pos){
		var str = pos.x + "-" + pos.y;
		var old = obj[str];
		if(old == undefined){
			obj[str] = pos;
			return true;
		}else if(old.n <= pos.n){
			obj[str] = pos;
			return true;
		}
		return false;
	},
	
	//選擇系統菜單
	_show_cmd_sys:function(x,y,n){
		cc.log("sys " + n);
		if(n == 1){
			//查看 地形
			var obj = {};
			var size = this.getTileSize();
			
			var max_x = this.mapWidth;
			var max_y = this.mapHeight;
			
			//左右
			if(x > max_x - 5){
				//左
				obj.x = x * size.width;
				obj.anchorX = 1;
			}else{
				//右
				obj.x = (x + 1) * size.width;
				obj.anchorX = 0;
			}
			
			
			//上下
			if(y < 3){
				//上
				obj.y = y * size.height;
				obj.anchorY = 0;
			}else{
				//下
				obj.y = (y + 1) * size.height;
				obj.anchorY = 1;
			}
			
			var t = this.get_pos_type(x,y);
			var sprite = this.get_pos_tile(x,y);
			this._tile.set_info(t,sprite);
			this._tile.attr(obj);
			this._tile.setVisible(true);			
			
		}else if(n == 2){
			//調用 系統菜單
			
			
			//重置n
			this._select.reset_n();
		}
		return false;
	},
	_init_box:function(){
		//地圖信息
		var node = new MapUiTile();
		node.setVisible(false);
		this.addChild(node);
		this._tile = node;
		
		//角色信息
		node = new MapUiRole();
		node.setVisible(false);
		node.attr({
			x:350,
			y:350,
		})
		this.addChild(node);
		this._role_box = node;
	},
	//返回地形 類別
	get_pos_type:function(x,y){
		//繪製坐標 轉 地圖坐標
		var y = this.mapHeight - y - 1;
		
		var layer = this.getLayer("base");
		var gid = layer.getTileGIDAt(x,y);
		var obj = this.getPropertiesForGID(gid);

		return obj.type;
	},
	get_pos_tile:function(x,y){
		//繪製坐標 轉 地圖坐標
		var y = this.mapHeight - y - 1;

		var layer = this.getLayer("base");
		
		return layer.getTileAt(x,y);
	},
	_e_touch_my:function(sprite){
		if(!MapStatus.is_statue(MAP_STATUE_MY)){
			return;
		}
		
		this._select.setVisible(false);
		this._select.reset_n();
		this._tile.setVisible(false);
		
	},
	_e_click_my:function(sprite){
		if(!MapStatus.is_statue(MAP_STATUE_MY)){
			return;
		}
		
		var pos = sprite.getPosition();
		
		var size = this.getTileSize();
		
		var x = Math.floor(pos.x / size.width) * size.width;
		var y = Math.floor(pos.y / size.height) * size.height;
		
		
		
		this._select.attr({
			"x":x,
			"y":y,
		});
		this._select.setVisible(true);
		this._select.do_click();
	},
	//顯示 地圖指定坐標
	calculate_show_pos:function(x,y){
		var w = 8;
		var h = 4;

		var max_y = this.mapHeight - 1;
		var max_x = this.mapWidth - 1;

		y = max_y - y;

		if(x < w){
			x = 0;
		}else if(x > max_x - w){
			x = cc.winSize.width - this.mapWidth * this.tileWidth;
		}else{
			x = w - x;
			x *= this.tileWidth;
		}


		if(y < h){
			y = 0;
		}else if(y > max_y - h){
			y = cc.winSize.height - this.mapHeight * this.tileHeight;
		}else{
			y = h - y;
			y *= this.tileWidth;
		}
		var pos = {
				x:x,
				y:y,
		}
		return pos;
	},
	show_pos:function(x,y){
		
		var pos = this.calculate_show_pos(x,y);
		this.attr(pos);
	},
	_init_talk_box:function(){
		var node = new MapTalkBox(this.tileWidth,this.tileHeight,this.mapWidth,this.mapHeight);
		this.addChild(node);
		this._talk_box = node;
	},
	_init_drama:function(){
		var obj = this._obj;
		if(obj.drama == undefined){
			MapStatus.statue(MAP_STATUE_MY);
			return;
		}
		var  drama = this._find_drama(obj.drama);
		if(drama == undefined){
			MapStatus.statue(MAP_STATUE_MY);
			return;
		}
		
		this._drama = drama;
		this._drama_pos = 0;
		this._execute_next_drama();
	},
	_find_drama:function(key){
		var obj = this._obj;
		var dramas = obj.dramas;

		return dramas[key];
	},
	_execute_next_drama:function(){
		this._talk_box.setVisible(false);
		
		var info = this._drama[this._drama_pos++];
		if(info == undefined){
			MapStatus.statue(MAP_STATUE_MY);
			return;
		}

		MapStatus.talk(false);
		
		//this._aside.reset();
		//this._role.reset_base();

		var next = false;
		switch(info.type){
		case DARK_MAP_DRAMA_TYPE_TALK:
			next = this._drama_talk(info);
			break;
		case DARK_MAP_DRAMA_TYPE_SHOW_POS:
			next = this._drama_show_pos(info);
			break;
		}
		if(next){
			this._execute_next_drama();
		}
	},
	_drama_talk:function(info){
		var obj = info.value;
		
		var id = obj.id;
		var faction = obj.faction;
		
		var role = this.get_role(faction,id);
		var face_to = role.get_face_to();
		
		
		var x = role.x;
		var y = role.y;
		var face = role.face();
		var name = role.name();
		
		this._talk_box.set_talk(x,y,face,name,obj.str);
		MapStatus.talk(true);
		
		return false;
	},
	_drama_show_pos:function(info){
		this.wait(true);
		
		var obj = info.value;
		var pos = this.calculate_show_pos(obj.x,obj.y);
		var s = Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2);
		s = Math.sqrt(s);
		var n = s / 48;
	
		var action = cc.moveTo(n * 0.15, cc.p(pos.x,pos.y));
		this.stopAllActions();
		this.runAction(
			cc.sequence(
					action,
					cc.callFunc(this._wait_callback_next, this)
			));
		
		return false;
	},
	wait:function(ok){
		if(ok == undefined){
			return this._wait;
		}
		this._wait = ok;
	},
	_wait_callback:function(){
		this._wait = false;
	},
	_wait_callback_next:function(){
		this._wait = false;
		this._execute_next_drama();
	},
	//根據 id 陣營 返回 角色
	get_role:function(faction,id){
		var parent;
		if(faction == 0){
			parent = this._my;
		}else if(faction == 1){
			parent = this._friend;
		}else if(faction == 2){
			parent = this._enemy;
		}
		
		var sprites = parent.getChildren();
		for (var i = 0; i < sprites.length; i++) {
			if(sprites[i].id() == id){
				return sprites[i];
			}
		}
		
		return null;
	},
	//根據 坐標 陣營 返回 角色
	get_role_by_pos:function(x,y,faction){
		if(faction == 0 || faction == undefined){
			return this._my.get_sprite(x, y);
		}
		
		if(faction == 1 || faction == undefined){
			return this._friend.get_sprite(x, y);
		}
		
		if(faction == 2 || faction == undefined){
			return this._enemy.get_sprite(x, y);
		}
		return null;
	},
});

var MapScene = cc.Scene.extend({
	_ids:null,
	ctor:function (ids) {
		this._super();

		this._ids = ids;
	},
	onEnter:function () {
		this._super();
		
		var record = dark.e_save.get_record();
		var obj = record.get_info();
		cc.log("當前關卡 : " + obj.name);
		cc.log("出場角色 ： " + this._ids);
		
		var map = dark.map[obj.name];
		cc.log(map.map);
		
		var layer = new MapLayer(this._ids);
		this.addChild(layer);
		
	},
	
});