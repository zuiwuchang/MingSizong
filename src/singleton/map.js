//遊戲 地形定義

var MAP_TILE_TYPE_PLAIN		=	0;		//平原	1機動	火	風
var MAP_TILE_TYPE_PRAIRIE	=	1;		//草原
var	MAP_TILE_TYPE_HOUSES	=	2;		//民居			火

var	MAP_TILE_TYPE_BARRACK	=	10;		//兵營			火	恢復hp 10% +10%攻防
var	MAP_TILE_TYPE_CASTLE	=	11;		//城堡			火	恢復hp 15% +20%攻防



var MAP_TILE_TYPE_FENCES	=	100;	//柵欄	不可移動
var MAP_TILE_TYPE_WALL		=	101;	//城牆


var MAP_TILE_TYPE_SWAMP		=	200;	//沼澤	水軍1移動 步兵2移動 騎兵3移動	水 風

dark.s_map_fun = {};
dark.s_map_fun.get_type_name=function(t){
	if(MAP_TILE_TYPE_PLAIN == t){
		return _("TAG_MAP_TILE_TYPE_PLAIN");
	}else if(MAP_TILE_TYPE_PRAIRIE == t){
		return _("TAG_MAP_TILE_TYPE_PRAIRIE");
	}else if(MAP_TILE_TYPE_HOUSES == t){
		return _("TAG_MAP_TILE_TYPE_HOUSES");
	}

	else if(MAP_TILE_TYPE_BARRACK == t){
		return _("TAG_MAP_TILE_TYPE_BARRACK");
	}else if(MAP_TILE_TYPE_CASTLE == t){
		return _("TAG_MAP_TILE_TYPE_CASTLE");
	}

	else if(MAP_TILE_TYPE_FENCES == t){
		return _("TAG_MAP_TILE_TYPE_FENCES");
	}else if(MAP_TILE_TYPE_WALL == t){
		return _("TAG_MAP_TILE_TYPE_WALL");
	}

	else if(MAP_TILE_TYPE_SWAMP == t){
		return _("TAG_MAP_TILE_TYPE_SWAMP");
	}
	return "unknow";
};

//返回地形 是否可 移動
dark.s_map_fun.is_move = function(t){
	if(t == MAP_TILE_TYPE_FENCES ||
			t == MAP_TILE_TYPE_WALL){
		return false;
	}
	return true;
};