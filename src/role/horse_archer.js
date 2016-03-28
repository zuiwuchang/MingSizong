//騎射手


var horse_archer = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);
		
		this.type_attack(ROLE_ATTACK_TYPE_PUNCTURE);
		this.type_armor(ROLE_ARMOR_TYPE_LIGHT);
		
		this.type_arms(ROLE_ARMS_TYPE_HORSE_ARCHER);
		
		this.move(6);
		
		this.init_cur();
	}
});

var horse_archer_caobin = horse_archer.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_CAOBIN));
		this.face(15);
		
		this.type_main(ROLE_MAIN_TYPE_AGILITY);
		
		
		
		this.hp(150);
		this.mp(0);
		this.attack(23);
		this.armor(2);

		this.power(17);
		this.agility(20);
		this.intellect(17);

		this.lv_power(1.85);
		this.lv_agility(3.3);
		this.lv_intellect(1.65);
		
		
		
		
		
		this.init_cur();
	}
});