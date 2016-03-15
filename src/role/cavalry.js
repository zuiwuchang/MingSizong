//騎兵

var cavalry = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);
		
		this.type_attack(ROLE_ATTACK_TYPE_WEIGHT);
		this.type_armor(ROLE_ARMOR_TYPE_WEIGHT);
		
		this.type_arms(ROLE_ARMS_TYPE_CAVALRY);
		
		
		this.init_cur();
	}
});

var cavalry_yan13 = cavalry.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);
		
		this.name(_(ROLE_NAME_YAN13));
		this.face(224);
		
		this.type_main(ROLE_MAIN_TYPE_POWER);
		
		
		
		this.hp(141);
		this.mp(0);
		this.attack(40);
		this.armor(5);

		this.power(23);
		this.agility(18);
		this.intellect(16);

		this.lv_power(2.8);
		this.lv_agility(2.25);
		this.lv_intellect(1.6);
		
		
		
		this.move(6);
		
		this.init_cur();
	}
});