enchant();

window.onload = function() {

    const DISP_SIZE = 640;
    const IMG_AITSU = "cat.JPG";
    const IMG_TABAKO = "tabako.png";
    const IMG_MOCHITE = "mochite.png";

    var core = new Core(DISP_SIZE, DISP_SIZE);
    core.fps = 30;

    core.preload(IMG_AITSU, IMG_TABAKO, IMG_MOCHITE);
    core.keybind(32, "space")
    core.onload = function() {

        //////////////////////////////////////////////////
        // タイトルシーン
        //////////////////////////////////////////////////

        var titleScene = new Scene();
        titleScene.backgroundColor = "#ffffff";

        var titleLabel = new Label("Start : Push SPACE");
        titleLabel.font = "32px sans-serif";
        titleLabel.color = "black";
        titleLabel.x = 120;
        titleLabel.y = 300;

        titleScene.addChild(titleLabel);

        titleScene.on("enterframe", function() {
            if (core.input.space) {
                core.replaceScene(playScene);
            }
        });
        titleScene.addEventListener("touchstart", function() {
            core.replaceScene(playScene);
        });
        //////////////////////////////////////////////////
        // プレイシーン
        //////////////////////////////////////////////////

        var playScene = new Scene();
        playScene.backgroundColor = "#ccf2ff";

        var isFinished = false;

        // あいつ
        var aitsu = new Sprite(1366, 1863);
        aitsu.image = core.assets[IMG_AITSU];
        aitsu.scaleX = 0.2;
        aitsu.scaleY = 0.2;
        aitsu.x = -450;
        aitsu.y = -600;  

        // タバコ
        var burnSpeed = 0.002;

        var tabako = new Sprite(956, 68);
        tabako.image = core.assets[IMG_TABAKO];
        tabako.scaleX = 0.3;
        tabako.scaleY = 0.2;

        // 左固定（口元固定）
        tabako.originX = 0;

        // tabako.x = aitsu.x;
        // tabako.y = aitsu.y;
        tabako.x = aitsu.x + 700;
        tabako.y = aitsu.y + 930;

        var mochite = new Sprite(112,67);
        mochite.image = core.assets[IMG_MOCHITE];
        mochite.scaleX = 0.6;
        mochite.scaleY = 0.23;
        mochite.originX = 0;
        mochite.x = aitsu.x + 700;
        mochite.y = aitsu.y + 930;

        // スコア表示
        var scoreLabel = new Label("");
        scoreLabel.font = "24px sans-serif";
        scoreLabel.color = "black";
        scoreLabel.x = 10;
        scoreLabel.y = 10;

        playScene.addChild(aitsu);
        playScene.addChild(tabako);
        playScene.addChild(mochite);
        playScene.addChild(scoreLabel);

        tabako.on("enterframe", function() {

            if (isFinished) return;

            // 燃焼
            if (this.scaleX > 0) {
                this.scaleX -= burnSpeed;
            } else {
                isFinished = true;                
                core.replaceScene(gameoverScene);
            }
        });

        playScene.addEventListener("touchstart", function() {
            if (!isFinished) {
                var score = Math.floor((1 - tabako.scaleX) * 12000 - 11900);
                resultLabel.text = "Score : " + score + "/100";   
                core.replaceScene(scoreScene);
            }
        });
        playScene.addEventListener("mousedown", function() {
            if (!isFinished) {
                var score = Math.floor((1 - tabako.scaleX) * 12000 - 11900);
                resultLabel.text = "Score : " + score + "/100";   
                core.replaceScene(scoreScene);
            }
        });
        //////////////////////////////////////////////////
        // スコアシーン
        //////////////////////////////////////////////////

        var scoreScene = new Scene();
        scoreScene.backgroundColor = "#ffffcc";

        var resultLabel = new Label("");
        resultLabel.font = "32px sans-serif";
        resultLabel.color = "black";
        resultLabel.x = 180;
        resultLabel.y = 300;

        var retryLabel = new Label("Press SPACE to Retry");
        retryLabel.font = "24px sans-serif";
        retryLabel.color = "black";
        retryLabel.x = 160;
        retryLabel.y = 360;

        scoreScene.addChild(resultLabel);
        scoreScene.addChild(retryLabel);

        scoreScene.on("enterframe", function() {
            if (core.input.space) {
                tabako.scaleX = 0.2;
                isFinished = false;
                core.replaceScene(playScene);
            }
        });

        //////////////////////////////////////////////////
        // ゲームオーバー
        //////////////////////////////////////////////////

        var gameoverScene = new Scene();
        gameoverScene.backgroundColor = "#ffcccc";

        var gameoverLabel = new Label("GAME OVER");
        gameoverLabel.font = "48px sans-serif";
        gameoverLabel.color = "black";
        gameoverLabel.x = 170;
        gameoverLabel.y = 280;

        var retryLabel2 = new Label("Press SPACE to Retry");
        retryLabel2.font = "24px sans-serif";
        retryLabel2.color = "black";
        retryLabel2.x = 160;
        retryLabel2.y = 360;

        gameoverScene.addChild(gameoverLabel);
        gameoverScene.addChild(retryLabel2);

        gameoverScene.on("enterframe", function() {
            if (core.input.space) {
                tabako.scaleX = 0.2;
                isFinished = false;
                core.replaceScene(playScene);
            }
        });

        //////////////////////////////////////////////////

        core.replaceScene(titleScene);
    };

    core.start();
};