//山賊


var bandit = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_NORMAL);
		this.type_armor(ROLE_ARMOR_TYPE_NORMAL);

		this.type_arms(ROLE_ARMS_TYPE_BANDIT);
		
		this.move(4);
		
		this.init_cur();
	}
});

var bandit_xie3 = bandit.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_XIE3));
		this.face(42);

		this.type_main(ROLE_MAIN_TYPE_AGILITY);



		this.hp(150);
		this.mp(0);
		this.attack(26);
		this.armor(3.8);

		this.power(20);
		this.agility(26);
		this.intellect(14);

		this.lv_power(2.1);
		this.lv_agility(3.6);
		this.lv_intellect(1.6);



		
		
		this.init_cur();
	}
});