//謀士

var counselor = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_NORMAL);
		this.type_armor(ROLE_ARMOR_TYPE_NORMAL);

		this.type_arms(ROLE_ARMS_TYPE_COUNSELOR);
		
		this.move(3);
		
		this.init_cur();
	}
});

var counselor_normal = counselor.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_COUNSELOR));
		this.face(171);

		this.type_main(ROLE_MAIN_TYPE_INTELLECT);



		this.hp(40);
		this.mp(0);
		this.attack(13);
		this.armor(0);

		this.power(13);
		this.agility(15);
		this.intellect(23);

		this.lv_power(1.6);
		this.lv_agility(1.2);
		this.lv_intellect(2.8);



		
		
		this.init_cur();
	}
});