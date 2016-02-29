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
					
					
					
					target._select.setVisible(true);
					target._select.do_click();
					target._select.attr({
						"x":x,
						"y":y,
					});
					
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
		}else if(n == 2){
			//調用 系統菜單
			
			
			//重置n
			this._select.reset_n();
		}
		return false;
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