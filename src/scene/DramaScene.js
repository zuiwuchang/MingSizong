
/*		劇本		*/

//旁白
var AsideLayer = cc.Layer.extend({
	_w:0,
	_h:0,
	
	_text:null,
	_background:null,
	ctor:function (w,h) {
		this._super();
		
		this._w = w;
		this._h = h;
		
		var node = new ccui.ImageView("res/drama/dark.png");
		node.attr({
			anchorX:0,
			anchorY:0
		});
		node.setScale(w/64, h/64);
		node.setOpacity(180);
		this.addChild(node);
		this._background = node;
		



		var node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_MIDDLE);
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:5,
			y:h-5,
			width:w-10,
			height:h-10,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text = node;
		
		this.setVisible(false);
	},
	reset:function(){
		this.setVisible(false);
	},
	set_string:function(str){
		this._text.setString(str);

		this.setVisible(true);
	}
});

var DramaRoleLayer = cc.Layer.extend({
	_role:null,
	_keys:null,
	_w:48,
	_h:64,

	_left_min:null,
	_right_min:null,
	_left:null,
	_right:null,
	ctor:function (w,h) {
		this._super();

		this._keys = {};

		this._init();		
	},
	_init:function(){
		var layer = new cc.Layer();
		this.addChild(layer);
		this._role = layer;
		
		
			
		var node = new cc.Sprite("res/public/10.png");
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._right_min = node;
		
		var node = new cc.Sprite("res/public/11.png");
		this.addChild(node);
		node.attr({
			"anchorX":0,
			"anchorY":0
		});
		node.setVisible(false);
		this._left_min = node;
		
		
		
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
		
	},
	reset_base:function(){
		this._right_min.setVisible(false);
		this._left_min.setVisible(false);
		
		this._right.setVisible(false);
		this._left.setVisible(false);
	},
	reset:function(){
		this._role.removeAllChildren();
		
		this._keys = {};
	},
	new_role:function(obj){
		var node = new cc.Sprite(obj.src,cc.rect(0, 0, this._w, this._h));
		node.attr({
			"x":obj.x,
			"y":obj.y,
			"anchorX":0,
			"anchorY":0			
		});
		this._role.addChild(node);
		
		var v = {};
		v.info = obj;
		v.sprite = node;
		this._keys[obj.key] = v;
	},
	role_move:function(obj,callback){
		var key = obj.key;
		var info = this._keys[key];

		var sprite = info.sprite;

		//定義動畫
		var animation = new cc.Animation();
		//為動畫 增加 幀
		animation.addSpriteFrameWithTexture(sprite.texture, cc.rect(0, this._h * 1, this._w, this._h));
		animation.addSpriteFrameWithTexture(sprite.texture, cc.rect(0, this._h * 2, this._w, this._h));

		animation.setDelayPerUnit(DARK_DRAMA_ANIMATION_MOVE_INTERVAL);
		animation.setRestoreOriginalFrame(true);
		animation = cc.animate(animation);
		animation = animation.repeat(obj.duration * 2);

		var action =  cc.spawn (
				cc.moveTo(obj.duration, obj.x, obj.y),
				animation
		);
		
		sprite.runAction(cc.sequence(
				action,
				cc.callFunc(callback)
		));
	},
	role_report:function(obj,callback){
		var key = obj.key;
		var info = this._keys[key];

		var sprite = info.sprite;

		//定義動畫
		var animation = new cc.Animation();
		//為動畫 增加 幀
		animation.addSpriteFrameWithTexture(sprite.texture, cc.rect(0, this._h * 7, this._w, this._h));
		animation.addSpriteFrameWithTexture(sprite.texture, cc.rect(0, this._h * 8, this._w, this._h));

		animation.setDelayPerUnit(DARK_DRAMA_ANIMATION_REPORT_INTERVAL);

		sprite.runAction(cc.sequence(
				cc.animate(animation),
				cc.callFunc(callback)
		));
		
	},
	role_talk:function(obj){
		var key = obj.key;
		var info = this._keys[key];

		var sprite = info.sprite;
		var size = cc.winSize;
		
		
		//顯示 小對話框
		var x = sprite.x;
		var y = sprite.y;
		
		if(obj.mpos == 0){
			y += this._h;
			x -= 6;
			
			this._left_min.attr({
				"x":x,
				"y":y
			});
			
			this._right_min.setVisible(false);
			this._left_min.setVisible(true);
		}else if(obj.mpos == 1){
			y += this._h - 6;
			x += 12 + 24;

			this._right_min.attr({
				"x":x,
				"y":y
			});
			
			this._right_min.setVisible(true);
			this._left_min.setVisible(false);
		}else if(obj.mpos == 2){
			y += this._h - 12;
			x -= 12;
			
			this._left_min.attr({
				"x":x,
				"y":y
			});
			
			this._right_min.setVisible(false);
			this._left_min.setVisible(true);
		}else if(obj.mpos == 3){
			y += this._h - 12;
			x += 12 + 24;
			
			this._right_min.attr({
				"x":x,
				"y":y
			});
			
			this._right_min.setVisible(true);
			this._left_min.setVisible(false);
		}



		//顯示 大對話框
		var face = info.info.face;
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
			var name = info.info.name;
			node.set_string(name,face,obj.str);
		}
	},

});

var DramaLayer = cc.Layer.extend({
	//劇本
	_drama:null,
	_pos:0,
	_wait:false,
	
	
	//場景
	_background:null,
	_aside:null,
	_role:null,
	
	ctor:function () {
		this._super();
		
		//初始化
		this._init();
		
		//返回 劇本
		var record = dark.e_save.get_record();
		var info = record.get_info();
		var name = info.name;
		
		var drama = dark.drama[name];
		this._drama = drama;
		
		//執行劇本
		this._execute_next_drama();
	},
	_init:function(){
		var size = cc.winSize;
		
		//背景
		var node = new cc.Sprite();
		this.addChild(node);
		this._background = node;
		
		
		
		//角色
		node = new DramaRoleLayer();
		this.addChild(node);
		this._role = node;
		

		
		//旁白
		var w = size.width - 100;
		var h = size.height / 4;
		node = new AsideLayer(w,h);
		node.attr({
			x:50,
			y:10,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._aside = node;
		
		
		
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
				var target = event.getCurrentTarget();
				target.setOpacity(255);

				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					if(!content._wait){
						content._execute_next_drama();
					}
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	//執行劇本
	_execute_next_drama:function(){
		var info = this._drama[this._pos++];
		if(info == undefined){
			return;
		}
		
		this._aside.reset();
		this._role.reset_base();
		
		var next = false;
		switch(info.type){
		case DARK_DRAMA_TYPE_NEW_SCENE:
			next = this._drama_new_scene(info);
			break;
			
		case DARK_DRAMA_TYPE_ASIDE:
			next = this._drama_aside(info);
			break;
		case DARK_DRAMA_TYPE_NEW_ROLE:
			next = this._drama_new_role(info);
			break;
			
		case DARK_DRAMA_TYPE_ROLE_MOVE:
			next = this._drama_role_move(info);
			break;
		case DARK_DRAMA_TYPE_ROLE_REPORT:
			next = this._drama_role_report(info);
			break;
		case DARK_DRAMA_TYPE_ROLE_TALK:
			next = this._drama_role_talk(info);
			break;
		}
		
		if(next){
			this._execute_next_drama();
		}
	},
	//劇本動作定義
	_drama_new_scene:function(info){
		this._aside.reset();
		this._role.reset();
		
		
		
		var size = cc.winSize;
		
		var node = this._background;
		node.initWithFile(info.value);
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		var scaleX = size.width / node.width;
		var scaleY = size.height / node.height;
		node.setScale(scaleX, scaleY);


		return true;
	},
	_drama_aside:function(info){
		this._aside.set_string(info.value);
		
		return false;
	},
	_drama_new_role:function(info){
		var obj = info.value;
		
		this._role.new_role(obj);
		return true;
	},
	_drama_role_move:function(info){
		var obj = info.value;
		this.wait(true);
		this._role.role_move(obj,this._wait_callback_next.bind(this));
		return false;
	},
	_drama_role_report:function(info){
		var obj = info.value;
		this.wait(true);
		this._role.role_report(obj,this._wait_callback_next.bind(this));
		return false;
	},
	_drama_role_talk:function(info){
		var obj = info.value;

		this._role.role_talk(obj);

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
	}
});

var DramaScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new DramaLayer();
		this.addChild(layer);
	}
});