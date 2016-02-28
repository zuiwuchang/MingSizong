/*		遊戲地圖		*/
var MapLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		var size = cc.winSize;
		
		var node = new cc.LabelTTF("遊戲地圖", "Arial", 38);
		node.attr({
			x:size.width/2,
			y:size.height/2,
			anchorX:0.5,
			anchory:0.5
		});
		this.addChild(node);
		
	}
});

var MapScene = cc.Scene.extend({
	_ids:null,
	ctor:function (ids) {
		this._super();

		this._ids = ids;
	},
	onEnter:function () {
		this._super();
		
		var record = dark.e_save.get_record();
		var obj = record.get_info();
		cc.log("當前關卡 : " + obj.name);
		cc.log("出場角色 ： " + this._ids);
		
		var map = dark.map[obj.name];
		cc.log(map.map);
		
		var layer = new MapLayer();
		this.addChild(layer);
		
	}
});