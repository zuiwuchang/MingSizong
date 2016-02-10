/*		新遊戲		*/
var NewLayer = cc.Layer.extend({
	_checkboxs:[],
	_textfield:null,
	_textfield_action:null,
	ctor:function () {
		this._super();

		//初始化 難度選項
		this._init_checkbox();
		
		//初始化 開始ui
		this._init_start();
		
	},
	_init_checkbox:function(){
		var size = cc.winSize;
		var node;
		var x0;
		var h = size.height / 2 - 10;
		var c = h / 3
		x0 = size.width / 2 + 50;
		var x1 = x0 - 100;
		node = new ccui.CheckBox();
		node.setTouchEnabled(true);
		node.loadTextures("res/scene/new/check_box_normal.png",
				"res/scene/new/check_box_normal_press.png", 
				"res/scene/new/check_box_active.png", 
				"res/scene/new/check_box_normal_disable.png", 
		"res/scene/new/check_box_active_disable.png");
		node.attr({
			x:x0,
			y:h + c
		});
		node.setSelected(true);
		node.addEventListener(this._e_checkbox_god, this);
		this._checkboxs.push(node);
		this.addChild(node);

		node = new cc.LabelTTF(_("NewScene_God"), FONT_DEFAULT_NAME, FONT_DEFAULT_SIZE);
		node.attr({
			x:x1,
			y:h + c - 5
		});
		this.addChild(node);



		node = new ccui.CheckBox();
		node.setTouchEnabled(true);
		node.loadTextures("res/scene/new/check_box_normal.png",
				"res/scene/new/check_box_normal_press.png", 
				"res/scene/new/check_box_active.png", 
				"res/scene/new/check_box_normal_disable.png", 
		"res/MainScene/check_box_active_disable.png");
		node.attr({
			x:x0,
			y:h + c * 2
		});
		node.addEventListener(this._e_checkbox_mankind, this);
		this._checkboxs.push(node);
		this.addChild(node);

		node = new cc.LabelTTF(_("NewScene_Mankind"), FONT_DEFAULT_NAME, FONT_DEFAULT_SIZE);
		node.attr({
			x:x1,
			y:h + c * 2 - 5
		});
		this.addChild(node);



		node = new ccui.CheckBox();
		node.setTouchEnabled(true);
		node.loadTextures("res/scene/new/check_box_normal.png",
				"res/scene/new/check_box_normal_press.png", 
				"res/scene/new/check_box_active.png", 
				"res/scene/new/check_box_normal_disable.png", 
		"res/scene/new/check_box_active_disable.png");
		node.attr({
			x:x0,
			y:h + c * 3
		});
		node.addEventListener(this._e_checkbox_fairy_tale, this);
		this._checkboxs.push(node);
		this.addChild(node);

		node = new cc.LabelTTF(_("NewScene_FairyTale"), FONT_DEFAULT_NAME, FONT_DEFAULT_SIZE);
		node.attr({
			x:x1,
			y:h + c *3  - 5
		});
		this.addChild(node);
		
	},
	_init_start:function(){
		var size = cc.winSize;
		
		//增加名稱 輸入框
		var node = new ccui.TextField(_("NewScene_Name"), FONT_DEFAULT_NAME, FONT_DEFAULT_SIZE);
		node.attr({
			x:size.width / 2,
			y:size.height / 2
		});
		node.addEventListener(this._e_textfield, this);
		this._textfield = node;
		node.attachWithIME();
		this._textfield_run_action();
		this.addChild(node);
		
		
		//增加運行 遊戲
		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/scene/main/button0.png", "res/scene/main/button1.png", "");
		node.setTitleText(_("NewScene_Start"));
		node.setTitleFontName(FONT_DEFAULT_NAME);
		node.setTitleFontSize(25);
		node.attr({
			x:size.width / 2,
			y:size.height / 3
		});
		var contend = this;
		node.addClickEventListener(this._e_button_start.bind(this));
		this.addChild(node);
		
	},
	//事件響應
	_e_checkbox_god:function(sender, type){
		switch (type) {
			case  ccui.CheckBox.EVENT_UNSELECTED:
			{
				var obj = this._checkboxs[0];
				obj.setSelected(true);
			}
			break;
			case ccui.CheckBox.EVENT_SELECTED:
				this._unselect_checkbox(0);
				break;
			default:
				break;
		}
	},
	_e_checkbox_mankind:function(sender, type){
		switch (type) {
		case  ccui.CheckBox.EVENT_UNSELECTED:
			{
				var obj = this._checkboxs[1];
				obj.setSelected(true);
			}
			break;
			case ccui.CheckBox.EVENT_SELECTED:
				this._unselect_checkbox(1);
				break;
	
			default:
				break;
		}
	},
	_e_checkbox_fairy_tale:function(sender, type){
		switch (type) {
			case  ccui.CheckBox.EVENT_UNSELECTED:
			{
				var obj = this._checkboxs[2];
				obj.setSelected(true);
			}
			break;
			case ccui.CheckBox.EVENT_SELECTED:
				this._unselect_checkbox(2);
				break;
			default:
				break;
		}
	},
	_unselect_checkbox:function(exclude){
		for (var i = 0; i < this._checkboxs.length; i++) {
			if(i!=exclude){
				this._checkboxs[i].setSelected(false);
			}
		}
	},
	
	_e_textfield:function(textfield, type){
		switch (type) {
		case ccui.TextField.EVENT_ATTACH_WITH_IME:
			this._textfield_run_action();
			break;
		case ccui.TextField.EVENT_DETACH_WITH_IME:
			textfield.stopAction(this._textfield_action);
			textfield.setOpacity(255);
			break;
		default:
			break;
		}
	},
	_textfield_run_action:function(){
		this._textfield_action = cc.sequence(
				cc.fadeOut(0.25),
				cc.fadeIn(0.25)
		).repeatForever();
		
		this._textfield.stopAllActions();
		this._textfield.runAction(this._textfield_action);
	},
	_e_button_start:function(){
		var difficulty = -1;
		for (var i = 0; i < this._checkboxs.length; i++) {
			var obj = this._checkboxs[i];
			if(obj.isSelected()){
				difficulty = i;
				break;
			}
		}
		if(difficulty == -1){
			cc.log("no difficulty")
			return;
		}
		
		var name = this._textfield.getString();
		if(name == ""){
			cc.log("no name")
			return;
		}
		name = name.replace(/(^\s+)|(\s+$)/g, "");
		if(name == ""){
			this._textfield.setString("");
			cc.log("can't space")
			return;
		}
		
		
		var record = dark.e_save.get_record();
		
		//設置 記錄名
		record.name(name);
		//設置 難度
		record.difficulty(difficulty);
		//設置關卡 劇本
		record.set_drama(DARK_DRAMA_NAME_START);
		
		//執行 劇本
		var scene = new DramaScene();
		cc.director.runScene(scene);
	}
});

var NewScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new NewLayer();
		this.addChild(layer);
	}
});