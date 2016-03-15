/*		遊戲 關卡 地圖 定義 	*/
dark.map = {};

//定義 地圖 劇本 動作
var DARK_MAP_DRAMA_TYPE_TALK		= 0;		//角色說話
var DARK_MAP_DRAMA_TYPE_SHOW_POS	= 1;		//改變顯示位置

//定義 地圖
dark.map[DARK_DRAMA_NAME_MASTER] = {
		//地圖 文件
		"map":"res/map/0/m.tmx",
		//地圖初始  顯示 位置
		"pos":{
			x:9,
			y:11,
			
		},
		//地圖 初始 劇本 不設置 直接進入 自己回合
		//"drama":"start",
		
		//出場角色 初始位置
		"positions":[
			{
				x:7,
				y:0
			},
			{
				x:6,
				y:0
			},
			{
				x:8,
				y:0
			},
		],
		
		//敵人
		"enemys":[
			{
			  only:true,
			  id:ROLE_ID_9000,
			  sid:83,
			  x:9,
			  y:11,
			},
			{
			  only:true,
			  id:ROLE_ID_LICAOQING,
			  sid:74,
			  x:10,
			  y:11,
			},
			
			//left
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:6,
				y:10,
				face_to:ROLE_FACE_LEFT,
			},
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:6,
				y:11,
				face_to:ROLE_FACE_LEFT,
			},
			{
				only:false,
				id:ROLE_ID_ARCHER,
				sid:20,
				x:7,
				y:11,
				face_to:ROLE_FACE_LEFT,
			},
			{
				only:false,
				id:ROLE_ID_COUNSELOR,
				sid:65,
				x:7,
				y:10,
				face_to:ROLE_FACE_LEFT,
			},
			
			//bottom
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:9,
				y:13,
			},
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:10,
				y:13,
			},
			{
				only:false,
				id:ROLE_ID_ARCHER,
				sid:20,
				x:10,
				y:12,
			},
			{
				only:false,
				id:ROLE_ID_COUNSELOR,
				sid:65,
				x:9,
				y:12,
			},
			
			//top
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:9,
				y:7,
				face_to:ROLE_FACE_TOP,
			},
			{
				only:false,
				id:ROLE_ID_INFANTRY,
				sid:2,
				x:10,
				y:7,
				face_to:ROLE_FACE_TOP,
			},
			{
				only:false,
				id:ROLE_ID_ARCHER,
				sid:20,
				x:9,
				y:8,
				face_to:ROLE_FACE_TOP,
			},
			{
				only:false,
				id:ROLE_ID_COUNSELOR,
				sid:65,
				x:10,
				y:8,
				face_to:ROLE_FACE_TOP,
			},
		],
		
		//友軍
		"friends":[
			{
				only:true,
				id:ROLE_ID_XIE3,
				sid:141,
				x:10,
				y:19,
				face_to:ROLE_FACE_TOP,
			},
		         
		    
		],
		
		//地圖 觸發 劇本
		"dramas":{
			"start":[
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:2,
		        		 id:ROLE_ID_LICAOQING,
		        		 str:"千歲，聽說皇上派出錦衣衛要緝拿千歲回京問罪。"
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:2,
		        		 id:ROLE_ID_9000,
		        		 str:"不必驚慌，我等已出發多日，朝廷又都是本座的人。皇帝又能怎樣。\n若不看在先皇是他親哥份上，朱由檢那小兒豈能活到今日。"
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:2,
		        		 id:ROLE_ID_9000,
		        		 str:"立刻追隨本座，改道回本座老家肃宁。\n本座要在此起兵，讓朱由檢去向先皇請教如何對待老臣。"
		        	 }
		         },
		         
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_SHOW_POS,
		        	 value:{
		        		 x:7,
		        		 y:0,
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:0,
		        		 id:ROLE_ID_MAIN,
		        		 str:"終於趕上魏閹了。\n沒想到竟然有這麼多衛隊，此必是一番苦戰。"
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:0,
		        		 id:ROLE_ID_YAN13,
		        		 str:"指揮使大人，南方似乎有身份不明的人物。"
		        	 }
		         },
		         
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_SHOW_POS,
		        	 value:{
		        		 x:10,
		        		 y:19,
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:1,
		        		 id:ROLE_ID_XIE3,
		        		 str:"閹人果然在此，今日本尊要除了此賊。"
		        	 }
		         },
		         
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_SHOW_POS,
		        	 value:{
		        		 x:7,
		        		 y:0,
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:0,
		        		 id:ROLE_ID_MAIN,
		        		 str:"只要不妨礙我們的任務就不要理他。\n否則，當作閹黨，立刻處死。"
		        	 }
		         },
		         {
		        	 type:DARK_MAP_DRAMA_TYPE_TALK,
		        	 value:{
		        		 faction:0,
		        		 id:ROLE_ID_YAN13,
		        		 str:"大人英明。"
		        	 }
		         },
			]
		}
};