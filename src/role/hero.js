//英雄

var hero = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);
		
		this.type_attack(ROLE_ATTACK_TYPE_HERO);
		this.type_armor(ROLE_ARMOR_TYPE_HERO);
		
		this.type_arms(ROLE_ARMS_TYPE_HERO);
		
		this.init_cur();
	}
});

var hero_main = hero.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);
		
		var name = dark.e_save.get_record().name();
		this.name(name);
		
		this.face(1);
		
		this.type_main(ROLE_MAIN_TYPE_POWER);
		
		
		
		this.hp(150);
		this.mp(0);
		this.attack(37);
		this.armor(1);
		
		this.power(23);
		this.agility(17);
		this.intellect(21);
		
		this.lv_power(2.7);
		this.lv_agility(1.5);
		this.lv_intellect(2);
		
		
		
		this.move(6);
		
		this.init_cur();
	}
});