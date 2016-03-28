//弓箭手
//步兵
var archer = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_PUNCTURE);
		this.type_armor(ROLE_ARMOR_TYPE_LIGHT);

		this.type_arms(ROLE_ARMS_TYPE_ARCHER);
		
		this.move(4);
		
		this.init_cur();
	}
});

var archer_normal = archer.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_ARCHER));
		this.face(185);

		this.type_main(ROLE_MAIN_TYPE_AGILITY);



		this.hp(150);
		this.mp(0);
		this.attack(25);
		this.armor(3);

		this.power(15);
		this.agility(22);
		this.intellect(16);

		this.lv_power(2.2);
		this.lv_agility(2.8);
		this.lv_intellect(1.85);



		
		
		this.init_cur();
	}
});