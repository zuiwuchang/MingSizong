
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () { 
        this._super();
        //var layer = new HelloWorldLayer();
        //this.addChild(layer);
        
        //初始化 語言環境
        dark.i18n.language("zh_tw");
        
        //初始化 記錄
        dark.e_save.init_once();
        //加載 成就
        dark.e_save.get_achievement().load();
        
        //var scene = new MainScene();
        
        //成就測試
        //var scene = new AchievementScene();
        
        /*
        //劇本測試
        var record = dark.e_save.get_record();
        //設置 記錄名
        record.name("dark");
        //設置 難度
        record.difficulty(0);
        //設置關卡 劇本
        record.set_drama(DARK_DRAMA_NAME_START);

        //執行 劇本
        var scene = new DramaScene();
        /**/
        
        /**/
        //地圖測試
        var record = dark.e_save.get_record();
        //設置 記錄名
        record.name("dark");
        //設置 難度
        record.difficulty(0);
        //設置關卡 劇本
        record.set_map(DARK_DRAMA_NAME_START);
        
        //加載地圖
        var scene = new MapScene([1,2,3]);
        /**/
        
        cc.director.runScene(scene);
    }
});

