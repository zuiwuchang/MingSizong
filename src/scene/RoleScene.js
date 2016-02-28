/*		角色選擇		*/

var RoleUiInfo = cc.Layer.extend({
	_face:null,
	_name:null,
	_lv:null,
	_type_attack:null,
	_type_armor:null,
	
	_arms:null,
	_type_main:null,
	_hp:null,
	_mp:null,

	_power:null,
	_agility:null,
	_intellect:null,

	_attack:null,
	_armor:null,
	_move:null,
	_exp:null,

	ctor:function () {
		this._super();

		var size = cc.winSize;

		var node = new ccui.Text(_("RoleScene_RoleInfo"),FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:size.width - 100,
			y:size.height - 10,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);


		
		//face
		node = new cc.Sprite();
		/*node = new cc.Sprite("res/face/1.png");
		node.attr({
			x:size.width - 160,
			y:size.height - 30,
			anchorX:0,
			anchorY:1
		});*/
		this.addChild(node);
		this._face = node;


		//name
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:size.width - 80,
			y:size.height - 33,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._name = node;

		//lv
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:size.width - 80,
			y:size.height - 33 - 20,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._lv = node;
		
		
		//攻擊 類型
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:size.width - 80,
			y:size.height - 33 - 20 - 20,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._type_attack = node;

		//防禦 類型
		node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:size.width - 80,
			y:size.height - 33 - 20 - 20- 20,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._type_armor = node;
		
		
		
		var strs = [
		    _("TAG_TYPE"),      
		    _("TAG_ARMS"),
		    _("TAG_HP"),
		    _("TAG_MP"),

		    _("TAG_POWER"),
		    _("TAG_AGILITY"),
		    _("TAG_INTELLECT"),

		    _("TAG_ATTACK"),
		    _("TAG_DEFENCE"),
		    _("TAG_MOVE"),
		    _("TAG_EXP"),
		    ];

		for(var i=0;i<strs.length;++i){
			var str = strs[i];
			node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
			node.setColor(cc.color(0, 0, 0));
			
			node.attr({
				x:size.width - 155,
				y:size.height - 120 - 20 * i,
				anchorX:0,
				anchorY:1
			});
			this.addChild(node);


			node = new ccui.Text("",FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
			node.setColor(cc.color(0, 0, 0));

			node.attr({
				x:size.width - 100,
				y:size.height - 120 - 20 * i,
				anchorX:0,
				anchorY:1
			});
			this.addChild(node);
			switch(i){
			case 0:
				this._type_main = node;
				break;
			case 1:
				this._arms = node;
				break;
			case 2:
				this._hp = node;
				break;
			case 3:
				this._mp = node;
				break;

			case 4:
				this._power = node;
				break;
			case 5:
				this._agility = node;
				break;
			case 6:
				this._intellect = node;
				break;
				
			case 7:
				this._attack = node;
				break;
			case 8:
				this._armor = node;
				break;
			case 9:
				this._move = node;
				break;
			case 10:
				this._exp = node;
				break;
			}
		}
	},
	name:function(str){
		this._name.setString(str);
	},
	lv:function(n){
		var str = "LV " + n;
		this._lv.setString(str);
	},
	face:function(n){
		this._face.initWithFile("res/face/" + n + ".png");

		var size = cc.winSize;
		this._face.attr({
			x:size.width - 160,
			y:size.height - 30,
			anchorX:0,
			anchorY:1
		});
	},
	type_attack:function(str){
		this._type_attack.setString(str);
	},
	type_armor:function(str){
		this._type_armor.setString(str);
	},
	type_main:function(str){
		this._type_main.setString(str);
	},
	type_arms:function(str){
		this._arms.setString(str);
	},
	hp:function(str){
		this._hp.setString(str);
	},
	mp:function(str){
		this._mp.setString(str);
	},
	power:function(str){
		this._power.setString(str);
	},
	agility:function(str){
		this._agility.setString(str);
	},
	intellect:function(str){
		this._intellect.setString(str);
	},
	attack:function(str){
		this._attack.setString(str);
	},
	armor:function(str){
		this._armor.setString(str);
	},

	move:function(str){
		this._move.setString(str);
	},
	exp:function(str){
		this._exp.setString(str);
	},
});


var RoleUiSelect = cc.Sprite.extend({
	_info:null,

	_roles:null,
	_touch_node_call:null,
	_click_node_call:null,
	ctor:function (info,touch_node_call,click_node_call) {
		this._super("res/scene/role/4.png");
		this._touch_node_call = touch_node_call;
		this._click_node_call = click_node_call;
		this._info = info;

		var record = dark.e_save.get_record();
		var roles = record.roles();
		
		var nodes = [];
		//for(var i=0;i<20;++i){
		for(var i=0;i<roles.length;++i){
			//var obj = roles[i%3];
			var obj = roles[i];

			node = role_factory.create(obj.id,obj.sid,obj.lv);
			for(var j=0;j<info.outmust.length;++j){
				var id = info.outmust[j];
				if(id == obj.id){
					//node.setOpacity(200);
					var shader = dark.shader.get_gray_shaders();
					node.setShaderProgram(shader);
					node.__must = true;
				}
			}
			node.__out = false;
			
			node.exp(obj.exp);
			node.e_touch(this._e_touch.bind(this));
			node.e_click(this._e_click.bind(this));
			if(node == undefined){
				cc.log("role_factory.create(" + obj.id + "," + obj.sid + ", " + obj.lv + ") error");
				continue;
			}
			this.addChild(node);

			var j = i % 12;
			var x = j * (48 + 4) + 2;
			node.attr({
				x:x,
				y:this.height - 2 - 18 - (48 + 2 + 16 * 2 + 8) * Math.floor(i / 12) ,
				anchorX:0,
				anchorY:1
			});


			//lv
			var text = new ccui.Text("LV " + node.lv(),FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
			text.attr({
				x:node.width/2,
				y:-2,
				anchorY:1
			});
			node.addChild(text);
			
			
			//name
			text = new ccui.Text(node.name(),FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
			//text.setColor(cc.color(0, 0, 0));
			text.attr({
				x:node.width/2,
				y:node.height + 2,
				anchorY:0
			});
			node.addChild(text);
			
			
			nodes.push(node);
		}
		this._roles = nodes;
	},
	_e_touch:function(sprite){
		this._touch_node_call(sprite);
	},
	_e_click:function(sprite){
		if(sprite.__must){
			return;
		}

		this._click_node_call(sprite);
	},
	unout_role:function(id){
		for(var i=0;i<this._roles.length;++i){
			var sprite = this._roles[i];
			if(sprite.id()==id){
				if(sprite.__out){
					sprite.setShaderProgram(sprite.__shader);
					sprite.__out = false;
				}
				
				return;
			}
		}
	},
	get_role:function(i){
		return this._roles[i];
	}
});

var RoleUiShowNode = cc.Sprite.extend({
	ctor:function (res,rect,e_click) {
		this._super(res,rect);
		
		this._e_click = e_click;
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function (touch, event) {
				var target = event.getCurrentTarget();


				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					target.opacity = 180;
					return true;
				}
				return false;
			},
			onTouchEnded: function (touch, event) {
				var target = event.getCurrentTarget();
				target.setOpacity(255);	
				
				var locationInNode = target.convertToNodeSpace(touch.getLocation());

				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					if(target._e_click != undefined){
						target._e_click(target);
					}
				}
			}
		});
		cc.eventManager.addListener(listener, this);
	},
});
var RoleUiShow = cc.Sprite.extend({
	_info:null,
	
	_text:null,
	_roles:null,
	
	_erase_callback:null,
	ctor:function (info,callback) {
		//背景
		this._super("res/scene/role/5.png");
		
		this._info = info;
		this._erase_callback = callback;
		this._roles = [];
		
		this._init();
	},
	_init:function(){
		var info = this._info;
		
		//文本
		var str = _("RoleScene_GoText") + info.outmust.length + "/" + info.outmax;
		var node = new ccui.Text(str,FONT_DEFAULT_NAME,FONT_DEFAULT_SMALL);
		node.setColor(cc.color(0, 0, 0));

		node.attr({
			x:2,
			y:this.height + 2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._text = node;
		
		//底座
		for(var i=0;i<info.outmax;++i){
			if(i<info.outmust.length){
				node = cc.Sprite("res/scene/role/3.png");
			}else if(i<info.outmin){
				node = cc.Sprite("res/scene/role/2.png");
			}else{
				node = cc.Sprite("res/scene/role/1.png");
				
			}
			
			var j = i % 12;
			var x = j * 50;
			node.attr({
				x:x,
				y:this.height - 4 - (48 + 4) * Math.floor(i / 12) - 36,
				anchorX:0,
				anchorY:1
			});
			
			this.addChild(node);
		}
		
		//增加必出陣角色
		//for(var i=0;i<20;++i){
		for(var i=0;i<info.outmust.length;++i){
			//var id = info.outmust[0];
			var id = info.outmust[i];
			
			var obj = this._find_role(id);
			if(obj == null){
				cc.log("role (" + id + ") not found");
				continue;
			}
		
			var sid = obj.sid;
			var n = Math.floor(sid / 21) + 1;
			var pos = sid % 21;
			var sprite = new cc.Sprite("res/games/2n/" + n + ".png",cc.rect(0, pos * 48, 48, 48));
			
			var j = i % 12;
			var x = j * 50;
			sprite.attr({
				x:x,
				y:this.height - 4 - (48 + 4) * Math.floor(i / 12) ,
				anchorX:0,
				anchorY:1
			});
			this.addChild(sprite);
		}
	},
	_find_role:function(id){
		var record = dark.e_save.get_record();
		var roles = record.roles();
		
		for(var j=0;j<roles.length;++j){
			var obj = roles[j];
			if(obj.id == id){
				return obj;
			}
		}
		return null;
	},
	push_role:function(id,sid){
		var roles = this._roles;
		
		
		var n = Math.floor(sid / 21) + 1;
		var pos = sid % 21;
		var sprite = new RoleUiShowNode("res/games/2n/" + n + ".png",cc.rect(0, pos * 48, 48, 48),this._e_click.bind(this));
		
		sprite._id = id;
		this.addChild(sprite);
		
		roles.push(sprite);
		
		
		//this._roles = roles;
		this._show_roles();
	},
	erase_role:function(id){
		var roles = [];
		for(var i=0;i<this._roles.length;++i){
			var sprite = this._roles[i];
			if(sprite._id == id){
				this.removeChild(sprite);
			}else{
				roles.push(sprite);
			}
		}
		
		this._roles = roles;
		this._show_roles();
	},
	_show_roles:function(){
		var info = this._info;
		for(var i=0;i<this._roles.length;++i){
			var n = i + info.outmust.length;
			
			
			var j = n % 12;
			var x = j * 50;
			var sprite = this._roles[i];
			sprite.attr({
				x:x,
				y:this.height - 4 - (48 + 4) * Math.floor(n / 12) ,
				anchorX:0,
				anchorY:1
			});
		}
		
		var str = _("RoleScene_GoText") + this.get_role_size() + "/" + info.outmax;
		this._text.setString(str);
	},
	_e_click:function(sprite){
		var id = sprite._id;
		
		this.erase_role(id);
		this._erase_callback(id);
	},
	get_role_size:function(){
		var info = this._info;
		return info.outmust.length + this._roles.length;
	},
	get_ids:function(){
		var ids = [];
		var info = this._info;
		for(var i=0;i<info.outmust.length;++i){
			var id = info.outmust[i];
			ids.push(id);
		}
		
		for(var i=0;i<this._roles.length;++i){
			var id = this._roles[i]._id;
			ids.push(id);
		}
		
		return ids;
	},
});
var RoleLayer = cc.Layer.extend({
	_drama_info:null,
	
	_background:null,
	_select:null,
	_show:null,
	_info:null,
	ctor:function (info) {
		this._super();
		
		this._drama_info = info;
		
		this._init();
		
	},
	_init:function(){
		var size = cc.winSize;
		var drama_info = this._drama_info;
		
		
		//設置背景
		var node = new cc.Sprite("res/scene/role/background.png");
		node.attr({
			scaleX:size.width/node.width,
			scaleY:size.height/node.height,
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._background = node;
		
		
		
		//添加角色選擇框
		node = new RoleUiSelect(drama_info,this._e_update_info.bind(this),this._e_update_show.bind(this));
		var role = node.get_role(0);
		node.attr({
			x:8,
			y:size.height - 4,
			anchorX:0,
			anchorY:1
		});
		this.addChild(node);
		this._select = node;
		
		

		//添加 被選擇角色  顯示框
		node = new RoleUiShow(drama_info,this._e_uishow_erase.bind(this));
		node.attr({
			x:8,
			y:4,
			anchorX:0,
			anchorY:0
		});
		this.addChild(node);
		this._show = node;
		
		
		
		//增加武將 信息框
		node = new RoleUiInfo();
		this.addChild(node);
		this._info = node;
		this._e_update_info(role);


		//添加 確定 取消 按鈕
		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("RoleScene_Go"));
		node.attr({
			x:size.width - 64 * 2,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_go.bind(this));
		this.addChild(node);
		
		node = new ccui.Button();
		node.setTouchEnabled(true);
		node.loadTextures("res/ui/b0.png", "res/ui/b1.png", "");
		node.setTitleText(_("RoleScene_Cancel"));
		node.attr({
			x:size.width - 64 * 1,
			y:0,
			anchorX:0,
			anchorY:0
		});
		node.addClickEventListener(this._e_click_cancel.bind(this));
		this.addChild(node);
	},
	//event
	_e_click_go:function(){
		var info = this._drama_info;
		var size = this._show.get_role_size();
		if(info.outmin > size){
			return;
		}
		
		var ids = this._show.get_ids();

		var record = dark.e_save.get_record();
		record.set_map();
		
		var scene = new MapScene(ids);
		cc.director.popScene();
		cc.director.runScene(scene);
		
	},
	_e_click_cancel:function(){
		cc.director.popScene();
	},
	
	_e_update_info:function(sprite){
		var info = this._info;
		info.name(sprite.name());
		info.lv(sprite.lv());
		info.face(sprite.face());
		
		info.type_attack(sprite.type_attack_str());
		info.type_armor(sprite.type_armor_str());
		info.type_main(sprite.type_main_str());
		info.type_arms(sprite.type_arms_str());

		info.hp(sprite.get_hp());
		info.mp(sprite.get_mp());
		
		info.power(sprite.get_power());
		info.agility(sprite.get_agility());
		info.intellect(sprite.get_intellect());
		
		info.attack(sprite.get_attack());
		info.armor(sprite.get_armor());
		
		info.move(sprite.move());

		var str = sprite.exp() + "/" + sprite.get_up_exp();
		info.exp(str);
	},
	_e_update_show:function(sprite){
		if(sprite.__out){
			//uiselect
			sprite.setShaderProgram(sprite.__shader);
			sprite.__out = false;
			
			
			
			//uishow erase
			var id = sprite.id();
			this._show.erase_role(id);
		}else{
			//uiselect
			var shader = dark.shader.get_gray_shaders();
			sprite.__shader = sprite.getShaderProgram();
			sprite.setShaderProgram(shader);
			sprite.__out = true;
			
			
			
			//uishow push
			var id = sprite.id();
			var sid = sprite.sid();
			this._show.push_role(id,sid);
		}
	},
	_e_uishow_erase:function(id){
		this._select.unout_role(id);
	}
});

var RoleScene = cc.Scene.extend({
	_info:null,
	ctor:function (info) {
		this._super();
		
		this._info = info;
	},
	onEnter:function () {
		this._super();

		var layer = new RoleLayer(this._info);
		this.addChild(layer);
	}
});