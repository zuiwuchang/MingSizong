/*		遊戲 主菜單		*/
var MainLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		//初始化 背景
		this._init_backgroud();
		
		//初始化 按鈕
		this._init_buttons();
		
	},
	_init_backgroud:function(){
		var size = cc.winSize;
		var node = new cc.Sprite("res/scene/main/background.jpg");
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
	_init_buttons:function(){
		var buttons = [
			{
				text:_("MainScene_New"),
				callback:this._e_button_new_click.bind(this)
			},
			{
				text:_("MainScene_Contiue"),
				callback:this._e_button_continue_click.bind(this)
			},
			{
				text:_("MainScene_Setting"),
				callback:this._e_button_setting_click.bind(this)
			},
			{
				text:_("MainScene_Achievement"),
				callback:this._e_button_achievement_click.bind(this)
			},
			{
				text:_("MainScene_About"),
				callback:this._e_button_about_click.bind(this)
			}
   		];

		var size = cc.winSize;

		var height = 52;
		var margin = 10;
		var count = 4;

		var x = size.width / 2;
		var y = size.height / 2 + height / 2 + count / 2 * (height + margin);
		for (var i = 0; i < buttons.length; i++) {
			var obj = buttons[i];

			var node = new ccui.Button();
			node.setTouchEnabled(true);
			node.loadTextures("res/scene/main/button0.png", "res/scene/main/button1.png", "");
			node.setTitleText(obj.text);
			node.attr({
				x:x,
				y:y
			});
			node.addClickEventListener(obj.callback);
			this.addChild(node);

			y -= height + margin;
		}
	},

	//事件響應
	_e_button_new_click:function(){
		var scene = new NewScene();
		cc.director.pushScene(scene);
	},
	_e_button_continue_click:function(){
		cc.log(_("MainScene_Contiue"));
		
	},
	_e_button_setting_click:function(){
		cc.log(_("MainScene_Setting"));
		
	},
	_e_button_achievement_click:function(){
		var scene = new AchievementScene();
		cc.director.pushScene(scene);
		
	},
	_e_button_about_click:function(){
		cc.log(_("MainScene_About"));
		
	},
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new MainLayer();
		this.addChild(layer);
	}
});