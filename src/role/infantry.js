//步兵
var infantry = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_NORMAL);
		this.type_armor(ROLE_ARMOR_TYPE_NORMAL);

		this.type_arms(ROLE_ARMS_TYPE_INFANTRY);
		
		this.move(4);
		
		this.init_cur();
	}
});

var infantry_normal = infantry.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_INFANTRY));
		this.face(186);

		this.type_main(ROLE_MAIN_TYPE_POWER);



		this.hp(150);
		this.mp(0);
		this.attack(35);
		this.armor(5);

		this.power(23);
		this.agility(18);
		this.intellect(16);

		this.lv_power(2.2);
		this.lv_agility(1.6);
		this.lv_intellect(1.9);



		
		
		this.init_cur();
	}
});