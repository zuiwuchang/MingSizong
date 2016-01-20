/*		劇本		*/
var DramaLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		var node = new cc.LabelTTF("劇本", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);
		
	}
});

var DramaScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new DramaLayer();
		this.addChild(layer);
	}
});