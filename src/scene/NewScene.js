/*		新遊戲		*/
var NewLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		var node = new cc.LabelTTF("新遊戲", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);
		
	}
});

var NewScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new NewLayer();
		this.addChild(layer);
	}
});