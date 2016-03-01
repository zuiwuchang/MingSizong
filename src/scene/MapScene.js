/*		遊戲地圖		*/
var MAP_TILE_TYPE_PLAIN		=	0;		//平原	1機動	火	風
var MAP_TILE_TYPE_PRAIRIE	=	1;		//草原
var	MAP_TILE_TYPE_HOUSES	=	2;		//民居			火

var	MAP_TILE_TYPE_BARRACK	=	10;		//兵營			火	恢復hp 10%
var	MAP_TILE_TYPE_CASTLE	=	11;		//城堡			火	恢復hp 15%



var MAP_TILE_TYPE_FENCES	=	100;	//柵欄	不可移動
var MAP_TILE_TYPE_WALL		=	101;	//城牆



var MAP_TILE_TYPE_SWAMP		=	200;	//沼澤	水軍1移動 步兵2移動 騎兵3移動	水 風

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
//圖層 編號
var MAP_TAG_TILE_MAP = 1;
var MapLayer = cc.Layer.extend({
	//tmx 地圖
	_map:null,
	ctor:function () {
		this._super();
		
		this._init();
	},
	_init:function(){
		//初始化地圖
		var node = new MapTMX();
		this.addChild(node);
		this._map = node;
	},
});

var MapTMX = cc.TMXTiledMap.extend({
	//選擇框
	_select:null,
	
	//地形信息框
	_tile:null,
	ctor:function () {
		//加載地圖
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;
		
		var obj = dark.map[name];
		this._super(obj.map);
		
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
	},
	_init:function(){
		//初始化選擇框
		this._init_select();
		
		//初始化 信息框
		this._init_box();
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
					target._tile.setVisible(false);
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
		
		if(this._show_cmd_my(x,y,n)){

		}else if(this._show_cmd_other(x,y,n)){

		}else if(this._show_cmd_sys(x,y,n)){

		}
		
	},
	//選擇 自己單位
	_show_cmd_my:function(x,y,n){
		if(n == 1){
			//查看 信息
		}else if(n == 2){
			//移動 攻擊
		}else if(n == 3){
			//角色命令菜單
			
			//重置n
			this._select.reset_n();
		}
		return false;
	},
	//選擇 其他/她/它 單位
	_show_cmd_other:function(x,y,n){
		if(n == 1){
			//查看 信息
		}else if(n == 2){
			//查看 移動範圍 攻擊範圍


			//重置n
			this._select.reset_n();
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
		var node = new MapUiTile();
		node.setVisible(false);
		this.addChild(node);
		this._tile = node;
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
		
		var layer = new MapLayer();
		this.addChild(layer);
		
	}
});