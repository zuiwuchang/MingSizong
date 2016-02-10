/*		遊戲 關卡 劇本 定義 	*/
dark.drama = {};


//動畫播放 間隔
var DARK_DRAMA_ANIMATION_MOVE_INTERVAL = 0.25;
var DARK_DRAMA_ANIMATION_REPORT_INTERVAL = 0.15;



//劇本動作定義
var DARK_DRAMA_TYPE_NEW_SCENE = 0;		//切換到新場景
var DARK_DRAMA_TYPE_ASIDE = 1;			//執行旁白

var DARK_DRAMA_TYPE_NEW_ROLE = 2;		//增加劇本角色
var DARK_DRAMA_TYPE_ROLE_MOVE = 10;		//角色 移動
var DARK_DRAMA_TYPE_ROLE_REPORT = 11;	//站立禀報

var DARK_DRAMA_TYPE_ROLE_TALK = 20;		//角色說話


//定義劇本名 
var DARK_DRAMA_NAME_MASTER = "聖主即位";


//定義 起始 劇本
var DARK_DRAMA_NAME_START = DARK_DRAMA_NAME_MASTER;
//劇本定義
dark.drama[DARK_DRAMA_NAME_MASTER] = [
	/*{type:DARK_DRAMA_TYPE_NEW_SCENE,value:"res/drama/115.png"},
	{type:DARK_DRAMA_TYPE_ASIDE,value:"天啟七年八月二十二日，熹宗駕崩。\n聖主思宗即位，年號崇禎。"},
	{type:DARK_DRAMA_TYPE_ASIDE,value:"天啟七年十月，聖主即位二月餘。\n閹黨魏忠賢請辭。\n十一月聖主下令，魏忠賢到鳳陽看墳。"},
	{type:DARK_DRAMA_TYPE_ASIDE,value:"三日後，聖主秘密召見鄙人，下令\n立刻逮捕魏忠賢。"},*/
	{type:DARK_DRAMA_TYPE_NEW_SCENE,value:"res/drama/48.png"},
	{
		type:DARK_DRAMA_TYPE_NEW_ROLE,
		value:{
			"key":"0",
			"src":"res/role/299.png",
			"x":610,
			"y":290,
			"name":"聖主思宗",
			"face":157
		}
	},
	{
		type:DARK_DRAMA_TYPE_NEW_ROLE,
		value:{
			"key":"1",
			"src":"res/role/2.png",
			"x":360,
			"y":170,
			/*"x":-72,
			"y":-34,*/
			"name":"{{name}}",
			"face":1
		}
	},
	/*{
		type:DARK_DRAMA_TYPE_ROLE_MOVE,
		value:{
			"key":"1",
			"x":360,
			"y":170,
			"duration":5
		}
	},*/
	{
		type:DARK_DRAMA_TYPE_ROLE_REPORT,
		value:{
			"key":"1"
		}
	},
	{
		type:DARK_DRAMA_TYPE_ROLE_TALK,
		value:{
			"key":"1",
			"str":"拜見聖主，吾皇萬歲。",
			"mpos":0,
			"pos":0,
		}
	},
	{
		type:DARK_DRAMA_TYPE_ROLE_TALK,
		value:{
			"key":"1",
			"str":"大明帝國，威震天下。",
			"mpos":1,
			"pos":3,
		}
	},
	
	{
		type:DARK_DRAMA_TYPE_ROLE_TALK,
		value:{
			"key":"0",
			"str":"愛卿不必多禮。",
			"mpos":0,
			"pos":1,
		}
	},
	{
		type:DARK_DRAMA_TYPE_ROLE_TALK,
		value:{
			"key":"0",
			"str":"此次秘密召見是為冊封愛卿為錦衣衛都指揮使。\n同時請指揮使追捕魏閹，寡人要將閹黨全部肅清。",
			"mpos":1,
			"pos":2,
		}
	},
	
	//{DARK_DRAMA_TYPE_ASIDE,value:"於是鄙人立刻帶輕騎,日夜追趕魏閹\n終於，在直隸河間府阜城縣，追上了魏閹"},
	//{DARK_DRAMA_TYPE_ASIDE,value:"然而魏閹帶有1千多人的隨從，其中包括了私人衛隊\n鄙人日夜追趕只有身邊的五十輕騎\n任務雖然艱難，但魏閹非死不可，為了大明，為了聖主"},

];

