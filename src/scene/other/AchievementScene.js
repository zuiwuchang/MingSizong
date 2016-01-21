/*		顯示 解鎖 成就		*/
var AchievementLayer = cc.Layer.extend({
	_pos_l:null,
	_pos_m:null,
	_pos_r:null,
	
	_sprite_l:null,
	_sprite_m:null,
	_sprite_r:null,
	
	_text_info:null,
	_text_name:null,
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

		
		this._init_backgroud();
		
		this._init_sprite();
		
		this._init_text();
		
		this._init_button();
		cc.log(1)

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
	_init_sprite:function(){

		var pos = this._pos_m;
		var node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(0*64, 0*64, 64, 64));
		node.attr({
			x:pos.x,
			y:pos.y,
			scaleX:1.5,
			scaleY:1.5
		});
		this.addChild(node);
		this._sprite_m = node;
		
		
		
		pos = this._pos_l;
		node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(1*64, 0*64, 64, 64));
		node.attr({
			x:pos.x,
			y:pos.y
		});
		this.addChild(node);
		this._sprite_l = node;
		
		
		
		pos = this._pos_r;
		node = new cc.Sprite("res/scene/other/achievement/0.png",cc.rect(2*64, 0*64, 64, 64));
		node.attr({
			x:pos.x,
			y:pos.y
		});
		this.addChild(node);
		this._sprite_r = node;
		
	},
	_init_text:function(){
		var size = cc.winSize;
		
		var node = new ccui.Text();
		node.setString("1/5\n是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜n是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜是喲娜");
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
		node.setString("成就123");
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
	
	
	//事件響應
	_e_button_back_click:function(){
		cc.log(_("back"));
	},
	
	_e_finger_left:function(){
		cc.log(_("left"));
	},
	_e_finger_right:function(){
		cc.log(_("right"));
	}
});

var AchievementScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new AchievementLayer();
		this.addChild(layer);
	}
});