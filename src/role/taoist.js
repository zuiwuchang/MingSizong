//道士
var taoist = role_base.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.type_attack(ROLE_ATTACK_TYPE_NORMAL);
		this.type_armor(ROLE_ARMOR_TYPE_NORMAL);

		this.type_arms(ROLE_ARMS_TYPE_TAOIST);
		
		this.move(3);
		
		this.init_cur();
	}
});

var taoist_9000 = taoist.extend({
	ctor:function (id,sid,lv) {
		this._super(id,sid,lv);

		this.name(_(ROLE_NAME_9000));
		this.face(160);

		this.type_main(ROLE_MAIN_TYPE_INTELLECT);



		this.hp(50);
		this.mp(0);
		this.attack(15);
		this.armor(0);

		this.power(14);
		this.agility(15);
		this.intellect(22);

		this.lv_power(1.7);
		this.lv_agility(1.5);
		this.lv_intellect(2.5);



		
		
		this.init_cur();
	}
});