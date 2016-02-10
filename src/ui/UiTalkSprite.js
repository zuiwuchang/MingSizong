var UiTalkSprite = cc.Sprite.extend({
	_left:true,
	_face:null,
	
	ctor:function (left) {
		if(left){
			this._left = true;
			this._super("res/public/talk1.png");
		}else{
			this._left = false;
			this._super("res/public/talk0.png");
		}
		
		this._init();
	},
	_init:function(){
		var node = new cc.Sprite();
		this.addChild(node);
		this._face = node;
	},
	set_string:function(name,face,str){
		var node = this._face;
		node.initWithFile("res/face/" + face + ".png");
		cc.log(this._left);
		if(this._left){
			node.attr({
				"x":10,
				"y":10,
				"anchorX":0,
				"anchorY":0
			})

		}else{
			node.attr({
				"x":this.width - 10,
				"y":10,
				"anchorX":1,
				"anchorY":0
			})
		}
		cc.log(str);
	}
});