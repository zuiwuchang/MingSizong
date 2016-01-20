/*		載入記錄		*/
var LoadLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		var node = new cc.LabelTTF("載入記錄", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);
		
	}
});

var LoadScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new LoadLayer();
		this.addChild(layer);
	}
});