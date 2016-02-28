/*		戰前準備		*/

var WARSCENE_STATUS_WAIT = 0;	//等待 用戶 操作
var WARSCENE_STATUS_TALK = 1;	//執行 角色 談話

var WarUiLyer = cc.Layer.extend({
	_get_status:null,
	_info:null,
	ctor:function (info,get_status) {
		this._info = info;
		this._get_status = get_status;
		
		this._super();
		
		var size = cc.winSize;
		var w = size.width;
		
		
		//ui
		var node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("WarScene_Go"));
		node.attr({
			x:w - 64 * 5,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_go.bind(this));
		this.addChild(node);

		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("WarScene_Equip"));
		node.attr({
			x:w - 64 * 4,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_equip.bind(this));
		this.addChild(node);

		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("WarScene_Buy"));
		node.attr({
			x:w - 64 * 3,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_buy.bind(this));
		this.addChild(node);

		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("WarScene_Sell"));
		node.attr({
			x:w - 64 * 2,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_sell.bind(this));
		this.addChild(node);

		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("WarScene_System"));
		node.attr({
			x:w - 64 * 1,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_system.bind(this));
		this.addChild(node);
		
		//debug
		//this._e_click_go();
	},
	//event
	_e_click_go:function(){
		if(this._get_status() != WARSCENE_STATUS_WAIT){
			return;
		}
		
		var scene = new RoleScene(this._info);
		cc.director.pushScene(scene);
	},
	_e_click_equip:function(){
		if(this._get_status() != WARSCENE_STATUS_WAIT){
			return;
		}
		cc.log(_("WarScene_Equip"));
	},
	_e_click_buy:function(){
		if(this._get_status() != WARSCENE_STATUS_WAIT){
			return;
		}
		cc.log(_("WarScene_Buy"));
	},
	_e_click_sell:function(){
		if(this._get_status() != WARSCENE_STATUS_WAIT){
			return;
		}
		cc.log(_("WarScene_Sell"));
	},
	_e_click_system:function(){
		if(this._get_status() != WARSCENE_STATUS_WAIT){
			return;
		}
		cc.log(_("WarScene_System"));
	}
});

var WarRoleLayer = cc.Sprite.extend({
	_w:48,
	_h:64,
	_obj:null,
	ctor:function(obj,callback) {
		this._obj = obj;
		this._callback = callback;
		var type = obj.type;
		
		var src = "res/role/";
		if(DARK_DRAMA_ROLE_TYPE_LB_MAIN == type || 
				DARK_DRAMA_ROLE_TYPE_LB_BOTTOM == type){
			src += obj.src;
		}else if(DARK_DRAMA_ROLE_TYPE_LB_TOP == type){
			src += obj.src - 1;
		}
		src += ".png";
		this._super(src,cc.rect(0, 0, this._w, this._h));
		
		
		if(DARK_DRAMA_ROLE_TYPE_LB_TOP == type || 
				DARK_DRAMA_ROLE_TYPE_LB_BOTTOM == type){
			this.setFlippedX(true);
		}
		
		
		//event
		var content = this;
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {

					target.opacity = 180;
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				target.setOpacity(255);

				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					content._callback(content,obj);
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	talk:function(){
		var obj = this._obj;
		var type = obj.type;

		if(type == DARK_DRAMA_ROLE_TYPE_LB_MAIN){
			//cc.log("talk main");
		}else if(type == DARK_DRAMA_ROLE_TYPE_LB_TOP){
			this.setFlippedX(false);

		}else if(type == DARK_DRAMA_ROLE_TYPE_LB_BOTTOM){
			var x = this.x;
			var y = this.y;
			var anchorX = this.anchorX;
			var anchorY = this.anchorY;
			this.initWithFile("res/role/" + (obj.src - 1)+ ".png",cc.rect(0, 0, this._w, this._h));
			this.attr({
				"x":x,
				"y":y,
				"anchorX":anchorX,
				"anchorY":anchorY
			});
			this.setFlippedX(false);
		}
	},
	talk_end:function(){
		var obj = this._obj;
		var type = obj.type;

		if(type == DARK_DRAMA_ROLE_TYPE_LB_MAIN){
			//cc.log("talk end main");
		}else if(type == DARK_DRAMA_ROLE_TYPE_LB_TOP){
			this.setFlippedX(true);

		}else if(type == DARK_DRAMA_ROLE_TYPE_LB_BOTTOM){
			var x = this.x;
			var y = this.y;
			var anchorX = this.anchorX;
			var anchorY = this.anchorY;
			this.initWithFile("res/role/" + obj.src + ".png",cc.rect(0, 0, this._w, this._h));
			this.attr({
				"x":x,
				"y":y,
				"anchorX":anchorX,
				"anchorY":anchorY
			});
			this.setFlippedX(true);
		}
	}
});
var WarLayer = cc.Layer.extend({
	_info:null,
	_background:null,
	_ui:null,
	_roles:null,
	
	_status:WARSCENE_STATUS_WAIT,
	_texts:null,
	_texts_offset:null,
	
	_left_min:null,
	_right_min:null,
	_left:null,
	_right:null,
	ctor:function (info) {
		this._super();
		
		this._info = info;
		this._init();
	},
	status:function(s){
		if(s == undefined){
			return this._status;
		}
		
		this._status = s;
	},
	_init:function(){
		var info = this._info;
		var size = cc.winSize;
		
		
		
		//設置背景
		var node = new cc.Sprite(info.background);
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		var scaleX = size.width / node.width;
		var scaleY = size.height / node.height;
		node.setScale(scaleX, scaleY);
		
		this.addChild(node);
		
		
		
		//ui
		node = new WarUiLyer(info,this.status.bind(this));
		this.addChild(node);
		this._ui = node;
		
		
		
		//增加 角色
		var roles = {};
		for(var i=0;i<info.roles.length;++i){
			var obj = info.roles[i];

			var role = new WarRoleLayer(obj,this._e_role.bind(this));
			
			role.attr({
				x:obj.x,
				y:obj.y,
				anchorX:0,
				anchorY:0
			});
			
			role._name = obj.name;
			role._face = obj.face;

			roles[obj.id] = role;

			this.addChild(role);
		}
		this._roles = roles;
		
		
		
		//增加小 對話框
		node = new cc.Sprite("res/public/10.png");
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._right_min = node;

		node = new cc.Sprite("res/public/11.png");
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._left_min = node;
		
		
		
		//增加 大 對話框
		node = new UiTalkSprite(false);
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._right = node;

		node = new UiTalkSprite(true);
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._left = node;
		
		
		
		
		//event
		var content = this;
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				
				if(content._status == WARSCENE_STATUS_TALK){
					content._execute_next_talk();
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	_e_role:function(role,obj){
		if(WARSCENE_STATUS_WAIT != this._status){
			return;
		}
		var text = obj.text;
		if(text == undefined
				|| text == null
				|| text.length < 1){
			return;
		}


		//設置 狀態
		this._status = WARSCENE_STATUS_TALK;

		this._texts = text;
		this._texts_offset = -1;
		this._execute_next_talk();
		//執行 講話 動畫
		//role.DoTalk();
		//cc.log("id = " + obj.id + " face = " + obj.face);
	},
	_execute_next_talk:function(){
		if(this._status != WARSCENE_STATUS_TALK){
			return;
		}

		var offset = this._texts_offset;
		var pos = offset + 1;
		var texts = this._texts;

		var obj = texts[offset];
		if(obj != undefined){
			var role = this._roles[obj.id];
			role.talk_end();
		}

		if(texts.length <= pos){
			this._left.setVisible(false);
			this._right.setVisible(false);
			this._left_min.setVisible(false);
			this._right_min.setVisible(false);
			
			this._status = WARSCENE_STATUS_WAIT;
			return;
		}


		obj = texts[pos];
		var role = this._roles[obj.id];
		role.talk();
		
		
		this._set_talk(obj);

		this._texts_offset = pos;
	},
	_set_talk:function(obj){
		var sprite = this._roles[obj.id];
		var size = cc.winSize;
		
		
		//顯示 小對話框
		var x = sprite.x;
		var y = sprite.y;
		var h = 64;
		var w = 48;

		if(obj.mpos == 0){
			y += h;
			x -= 6;

			this._left_min.attr({
				"x":x,
				"y":y
			});

			this._right_min.setVisible(false);
			this._left_min.setVisible(true);
		}else if(obj.mpos == 1){
			y += h - 6;
			x += 12 + 24;
		
			this._right_min.attr({
				"x":x,
				"y":y
			});

			this._right_min.setVisible(true);
			this._left_min.setVisible(false);
		}else if(obj.mpos == 2){
			y += h - 12;
			x -= 12;

			this._left_min.attr({
				"x":x,
				"y":y
			});

			this._right_min.setVisible(false);
			this._left_min.setVisible(true);
		}else if(obj.mpos == 3){
			y += h - 12;
			x += 12 + 24;

			this._right_min.attr({
				"x":x,
				"y":y
			});

			this._right_min.setVisible(true);
			this._left_min.setVisible(false);
		}
		
		
		
		
		//顯示 大對話框
		var face = sprite._face;
		var node;
		if(obj.pos == 0){
			x = 35;
			y = size.height - 100 - 35;

			this._left.attr({
				"x":x,
				"y":y
			});

			this._right.setVisible(false);
			this._left.setVisible(true);

			node = this._left;
		}else if(obj.pos == 1){
			x = size.width - 436 - 35;
			y = size.height - 100 - 35;

			this._right.attr({
				"x":x,
				"y":y
			});

			this._right.setVisible(true);
			this._left.setVisible(false);

			node = this._right;
		}else if(obj.pos == 2){
			x = 35;
			y = 35;

			this._left.attr({
				"x":x,
				"y":y
			});

			this._right.setVisible(false);
			this._left.setVisible(true);

			node = this._left;
		}else if(obj.pos == 3){
			x = size.width - 436 - 35;
			y = 35;

			this._right.attr({
				"x":x,
				"y":y
			});

			this._right.setVisible(true);
			this._left.setVisible(false);

			node = this._right;
		}

		if(node != undefined){
			var name = sprite._name;
			var str = obj.text;
			name = dark.drama_fun.repleace(name);
			str = dark.drama_fun.repleace(str);

			node.set_string(name,face,str);
		}
	}
});

var WarScene = cc.Scene.extend({
	_info:null,
	ctor:function (info) {
		this._super();
		
		this._info = info;
	},
	onEnter:function () {
		this._super();
		
		var layer = new WarLayer(this._info);
		this.addChild(layer);
	}
});
