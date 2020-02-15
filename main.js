var score = 0;
var GameScene = new Phaser.Class({
    

    Extends: Phaser.Scene,

    initialize:


        function GameScene() {
            Phaser.Scene.call(this, { key: 'gameScene', active: true });

            this.player = null;
            this.cursors = null;
            this.score = 0;
            this.scoreText = null;
        },

      
    preload: function () {
        this.load.image('sky', 'assets/sky.jpg');
        this.load.image('ground', 'assets/land.png');
        this.load.image('obstacle', 'assets/obstacle.png');
        this.load.spritesheet('dude', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
    
    },

    create: function () {


        var platforms = this.physics.add.staticGroup();
        
        this.add.image(400, 300, 'sky').setScale(2.5);

        platforms.create(400, 620, 'ground').setScale(2.5).refreshBody();



        var player = this.physics.add.sprite(100, 450, 'dude');

        this.obstacle = this.physics.add.image(1200, 550, 'obstacle');

        this.obstacle1 = this.physics.add.image(1350, 550, 'obstacle');

        this.cursors = this.input.keyboard.createCursorKeys();

        

 

        this.scoreText = this.add.text(50, 25, 'SCORE:', { fontSize: '32px', fill: '#FFFF' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(this.obstacle, platforms);
        this.physics.add.collider(this.obstacle1, platforms);

        this.physics.add.overlap(player, this.obstacle1, this.hitObstacle, null, this);

        this.physics.add.overlap(player, this.obstacle, this.hitObstacle, null, this);

        this.player = player;




    },

    update: function (time) {


        var cursors = this.cursors;
        var player = this.player;

        if (cursors.up.isDown) {
            player.setVelocityY(-160);
        }
        else if (cursors.down.isDown) {
            player.setVelocity(160);
        }


        
        
        score += Math.round(time / 1000);
        this.scoreText.setText("Score: " + score);
        player.update(time);






    },

      hitObstacle: function (player,obstacle)
        {
            player.disableBody(true, true);
            obstacle.disableBody(true, true);
            
            alert("GAME OVER | Score: " + score);   
            score = timer.getElapsed();
           
         
         
            
        }, 

        hitObstacle1: function (player,obstacle1)
        {
            player.disableBody(true, true);
            obstacle1.disableBody(true, true);
            
            alert("GAME OVER | Score: " + score);   
            score = timer.getElapsed();
           
         
         
            
        }


        

});



    






var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);
