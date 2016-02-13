var UiTalkSprite = cc.Sprite.extend({
	_left:true,
	_face:null,
	_text:null,
	_name:null,
	
	
	
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
		
		
		
		
		var node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.ignoreContentAdaptWithSize(false);
		node.attr({
			x:0,
			y:0,
			width:320 - 10,
			height:60,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._text = node;

	
		
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));
		node.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._name = node;
	},
	set_string:function(name,face,str){
		//face
		var node = this._face;
		node.initWithFile("res/face/" + face + ".png");
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
		
		
		
		//name
		node = this._name;
		node.setString(name);
		if(this._left){
			node.attr({
				x:10 + 64 + 20 + 10  - 5,
				y:55 + 13 + 10
			});
		}else{
			node.attr({
				x:this.width - (10 + 64 + 20 + 10) - node.width,
				y:55 + 13 + 10
			});
		}
		
		
		
		//text
		node = this._text;
		node.setString(str);
		if(this._left){
			node.attr({
				x:10 + 64 + 20 + 10,
				y:55 + 13
			});
		}else{
			node.attr({
				x:10 + 10,
				y:55 + 13
			});
		}
		
	}
});