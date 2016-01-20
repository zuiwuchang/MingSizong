/*		顯示 解鎖 成就		*/
var AchievementLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		var node = new cc.LabelTTF("x", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);
		
	}
});

var AchievementScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new AchievementLayer();
		this.addChild(layer);
	}
});