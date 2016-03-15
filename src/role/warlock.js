//術士
var warlock = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_NORMAL);
		this.type_armor(ROLE_ARMOR_TYPE_NORMAL);

		this.type_arms(ROLE_ARMS_TYPE_WARLOCK);
		
		this.init_cur();
	}
});

var warlock_licaoqing = warlock.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_LICAOQING));
		this.face(131);

		this.type_main(ROLE_MAIN_TYPE_INTELLECT);



		this.hp(70);
		this.mp(0);
		this.attack(15);
		this.armor(0);

		this.power(16);
		this.agility(15);
		this.intellect(22);

		this.lv_power(1.8);
		this.lv_agility(1.6);
		this.lv_intellect(2.3);



		this.move(3);
		
		this.init_cur();
	}
});