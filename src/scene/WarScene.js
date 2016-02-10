/*		戰前準備		*/
var WarLayer = cc.Layer.extend({
	ctor:function () {
		this._super();

		var size = cc.winSize;

		var node = new cc.LabelTTF("戰前準備", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);

	}
});

var WarScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new WarLayer();
		this.addChild(layer);
	}
});
