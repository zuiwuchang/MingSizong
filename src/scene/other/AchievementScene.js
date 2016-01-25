/*		顯示 解鎖 成就		*/
var AchievementLayer = cc.Layer.extend({
	_pos_l:null,
	_pos_m:null,
	_pos_r:null,
	
	_sprite_l:null,
	_sprite_m:null,
	_sprite_r:null,
	_sprite_tmp:null,
	
	_text_info:null,
	_text_name:null,
	
	_items:null,
	_n:0,
	_item_n:64,
	
	_wait_move:false,
	
	ctor:function () {
		this._super();
		
		var size = cc.winSize;

		
		
		var x = size.width/2;
		var y = size.height * 2 / 3;
		var pos_m = {x:x,y:y};
		
		this._pos_m = pos_m;

		
		x = size.width/2 - 150;
		y = size.height * 2 / 3 + 80;
		pos_l = {x:x,y:y};

		this._pos_l = pos_l;
		
		
		
		x = size.width/2 + 150;
		y = size.height * 2 / 3 + 80;
		pos_r = {x:x,y:y};

		this._pos_r = pos_r;

		
		this._load();
		
		this._init_backgroud();
		
		this._init_sprite();
		
		this._init_text();
		
		this._init_button();

		this._init_gesture();

	},
	_load:function(){
		var str = cc.sys.localStorage.getItem("AchievementLayer._show_pos");
		if(str == undefined || str == "" || str == null){
			this._n = 0;
			return;
		}
		this._n = parseInt(str);
	},
	_save:function(){
		cc.sys.localStorage.setItem("AchievementLayer._show_pos",this._n);
	},
	_init_backgroud:function(){
		var size = cc.winSize;
		var node = new cc.Sprite("res/scene/other/achievement/background.png");
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
	},
	_ok_sprite:function(sprite,item){
		if(item.value < item.max){
			if(sprite._shader == undefined){
				sprite._shader = sprite.getShaderProgram();
				
				sprite.setShaderProgram(dark.shader.get_gray_shaders());
			}
		}else{
			if(sprite._shader != undefined){
				sprite.setShaderProgram(sprite._shader);
				sprite._shader = undefined
			}
		}
	},
	_init_sprite:function(){
		var achievement = dark.e_save.get_achievement();
		var items = achievement._items;
		this._items = items;

		var item_n = this._item_n;
		var n = this._n;
		if(n >= items.length){
			n = 0;
			this._n = 0;
			this._save();
		}
		
		var item = items[n];
		var row = item.y;
		var col = item.x;
		var pos = this._pos_m;
		var node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(col * item_n, row * item_n, item_n, item_n));
		node.attr({
			x:pos.x,
			y:pos.y,
			scaleX:1.5,
			scaleY:1.5
		});
		this._ok_sprite(node, item);
		
		this.addChild(node);
		this._sprite_m = node;

		
		var i = n - 1;
		if(i<0){
			i = items.length - 1
		}
		item = items[i];
		row = item.y;
		col = item.x;
		pos = this._pos_l;
		node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(col * item_n, row * item_n, item_n, item_n));
		node.attr({
			x:pos.x,
			y:pos.y
		});
		this._ok_sprite(node, item);

		this.addChild(node);
		this._sprite_l = node;


		var i = n + 1;
		if(i>=items.length){
			i = 0
		}
		item = items[i];
		row = item.y;
		col = item.x;
		pos = this._pos_r;
		node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(col * item_n, row * item_n, item_n, item_n));
		node.attr({
			x:pos.x,
			y:pos.y
		});
		this._ok_sprite(node, item);

		this.addChild(node);
		this._sprite_r = node;
		
		
		
		node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(0, 0, item_n, item_n));
		node.attr({
			opacity:0
		});
		this.addChild(node);
		this._sprite_tmp = node;
	},
	_init_text:function(){
		var size = cc.winSize;
		
		var achievement = dark.e_save.get_achievement();
		var items = achievement._items;
		var item = items[this._n];
		
		var node = new ccui.Text();
		var str = item.value + "/" + item.max + "\n" + item.text;
		node.setString(str);
		node.ignoreContentAdaptWithSize(false);
		node.setSize(cc.size(330, 200));
		node.setFontSize(20);
		node.attr({
			x:size.width/2 - 50,
			y:size.height/2,
			anchorY:1
		});
		this.addChild(node);
		this._text_info = node;


		node = new ccui.Text();
		node.setString(item.name);
		node.setFontSize(20);
		node.attr({
			x:size.width/2,
			y:size.height / 2 + 150,
		});
		this.addChild(node);
		this._text_name = node;
	},
	_init_button:function(){
		var size = cc.winSize;

		var node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/scene/other/achievement/button_back_0.png", "res/scene/other/achievement/button_back_1.png", "");
		node.attr({
			x:size.width - 10,
			y:size.height - 10,
			anchorX:1,
			anchorY:1
		});
		node.addClickEventListener(this._e_button_back_click.bind(this));
		this.addChild(node);
	},
	_init_gesture:function(){
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
					content._x = locationInNode.x;
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
			
				var locationInNode = target.convertToNodeSpace(touch.getLocation())
				var x = locationInNode.x;
				if(x > content._x + 32){
					content._e_finger_right();
				}else if(x < content._x - 32){
					content._e_finger_left();
				}
			
			}
		});
		cc.eventManager.addListener(listener, this);
	},
	
	//事件響應
	_e_button_back_click:function(){
		cc.director.popScene();
	},
	
	_e_finger_left:function(){
		this.go_left();
		this._save();
	},
	_e_finger_right:function(){
		this.go_right();
		this._save();
	},
	
	//導出方法
	go_left:function(){
		if(this._wait_move){
			return;
		}
		this._wait_move = true;

		var n = this._n + 1;
		if(n >= this._items.length){
			n = 0;
		}
		this._n = n;

		var sprite_l = this._sprite_l;
		var sprite_m = this._sprite_m;
		var sprite_r = this._sprite_r;
		var sprite_tmp = this._sprite_tmp;

		var duration = 1;



		//m
		var pos_l = this._pos_l;
		var m_a = cc.spawn(
				cc.moveTo(duration, pos_l.x, pos_l.y),
				cc.scaleTo(duration, 1, 1)
		);
		sprite_m.runAction( cc.sequence(
				m_a,
				cc.callFunc(function(){ 
					this._sprite_l = sprite_m;
				}, this)
		));



		//r
		var pos_m = this._pos_m;
		var r_a = cc.spawn(
				cc.moveTo(duration, pos_m.x, pos_m.y),
				cc.scaleTo(duration, 1.5, 1.5)
		);
		sprite_r.runAction( cc.sequence(
				r_a,
				cc.callFunc(function(){ 
					this._sprite_m = sprite_r;
				}, this)
		));



		//text
		var item = this._items[n];
		var name = item.name;
		this._text_name.runAction( cc.sequence(
				cc.fadeOut(duration/2),
				cc.callFunc(function(){ 
					this._text_name.setString(name);
				}, this),
				cc.fadeIn(duration/2)
		));
		var text = item.value + "/" + item.max + "\n" + item.text;
		this._text_info.runAction( cc.sequence(
				cc.fadeOut(duration/2),
				cc.callFunc(function(){ 
					this._text_info.setString(text);
				}, this),
				cc.fadeIn(duration/2)
		));



		//l
		var l_a = cc.spawn(
				cc.scaleTo(duration, 0.5, 0.5),
				cc.fadeOut(duration)
		);
		sprite_l.runAction( cc.sequence(
				l_a,
				cc.callFunc(function(){ 
					this._sprite_tmp = sprite_l;
				}, this)
		));



		//tmp
		++n;
		if(n >= this._items.length){
			n = 0;
		}
		var item_n = this._item_n;
		var item = this._items[n];
		var row = item.y;
		var col = item.x;
		var pos = this._pos_r;
		sprite_tmp.initWithFile("res/scene/other/achievement/0.png",cc.rect(col * item_n, row * item_n, item_n, item_n));
		sprite_tmp._shader = undefined;
		this._ok_sprite(sprite_tmp, item);
		sprite_tmp.attr({
			x:pos.x,
			y:pos.y,
			scaleX:0.5,
			scaleY:0.5
		});
		
		var tmp_a = cc.spawn(
				cc.fadeIn(duration),
				cc.scaleTo(duration, 1, 1)
		);
		sprite_tmp.runAction( cc.sequence(
				tmp_a,
				cc.callFunc(function(){ 
					this._sprite_r = sprite_tmp;
					
					this._wait_move = false;
				}, this)
		));
	},
	go_right:function(){
		if(this._wait_move){
			return;
		}
		this._wait_move = true;
		
		var n = this._n - 1;
		if(n < 0){
			n = this._items.length - 1;
		}
		this._n = n;

		var sprite_l = this._sprite_l;
		var sprite_m = this._sprite_m;
		var sprite_r = this._sprite_r;
		var sprite_tmp = this._sprite_tmp;

		var duration = 1;



		//m
		var pos = this._pos_r;
		var m_a = cc.spawn(
				cc.moveTo(duration, pos.x, pos.y),
				cc.scaleTo(duration, 1, 1)
		);
		sprite_m.runAction( cc.sequence(
				m_a,
				cc.callFunc(function(){ 
					this._sprite_r = sprite_m;
				}, this)
		));



		//l
		pos = this._pos_m;
		var l_a = cc.spawn(
				cc.moveTo(duration, pos.x, pos.y),
				cc.scaleTo(duration, 1.5, 1.5)
		);
		sprite_l.runAction( cc.sequence(
				l_a,
				cc.callFunc(function(){ 
					this._sprite_m = sprite_l;
				}, this)
		));



		//text
		var item = this._items[n];
		var name = item.name;
		this._text_name.runAction( cc.sequence(
				cc.fadeOut(duration/2),
				cc.callFunc(function(){ 
					this._text_name.setString(name);
				}, this),
				cc.fadeIn(duration/2)
		));
		var text = item.value + "/" + item.max + "\n" + item.text;
		this._text_info.runAction( cc.sequence(
				cc.fadeOut(duration/2),
				cc.callFunc(function(){ 
					this._text_info.setString(text);
				}, this),
				cc.fadeIn(duration/2)
		));



		//r
		var r_a = cc.spawn(
				cc.scaleTo(duration, 0.5, 0.5),
				cc.fadeOut(duration)
		);
		sprite_r.runAction( cc.sequence(
				r_a,
				cc.callFunc(function(){ 
					this._sprite_tmp = sprite_r;
				}, this),
				cc.scaleTo(0, 0, 0)
		));



		//tmp
		--n;
		if(n < 0){
			n = this._items.length - 1;
		}
		var item_n = this._item_n;
		var item = this._items[n];
		var row = item.y;
		var col = item.x;
		pos = this._pos_l;
		sprite_tmp.initWithFile("res/scene/other/achievement/0.png",cc.rect(col * item_n, row * item_n, item_n, item_n));
		sprite_tmp._shader = undefined;
		this._ok_sprite(sprite_tmp, item);
		sprite_tmp.attr({
			x:pos.x,
			y:pos.y,
			scaleX:0.5,
			scaleY:0.5
		});
		var tmp_a = cc.spawn(
				cc.fadeIn(duration),
				cc.scaleTo(duration, 1, 1)
		);
		sprite_tmp.runAction( cc.sequence(
				tmp_a,
				cc.callFunc(function(){ 
					this._sprite_l = sprite_tmp;
					
					this._wait_move = false;
				}, this)
		));
	}
});

var AchievementScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		
		var layer = new AchievementLayer();
		this.addChild(layer);
	}
});