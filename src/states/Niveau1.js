
import niveau1 from '../assets/tilemaps/niveau1.json'


/**
 * Setup and display the main game state.
 */

var chevalier;
var paysage;
var eau;
var cursors;
var bg;
var plateforme;

export default class Main extends Phaser.State {
  /**
   * Setup all objects, etc needed for the main game state.
   */

preload() {
    this.load.tilemap('niveau1', null, niveau1, Phaser.Tilemap.TILED_JSON);
    

  }

  create() {
    // Enable arcade physics.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scale.setGameSize(128*9, 128*9);
    this.game.world.setBounds(0, 0, 128*20, 128*20);
    // ...
    bg = this.game.add.sprite(0, 0, 'BG');
    bg.height = this.game.world.height;
    bg.width = this.game.world.width;

    // Setup listener for window resize.
    //this.scale.setResizeCallback(this.resize, this);
    
    chevalier = this.game.add.sprite(300,this.game.world.height - 195,'chevalier');
    this.game.physics.arcade.enable(chevalier);
    this.game.camera.follow(chevalier);
    chevalier.anchor.setTo(.5,.5);
    chevalier.animations.add('attack',[0,1,2,3,4,5,6],7,false);
    chevalier.animations.add('dead',[7,8,9,10,11,12,13,14,15,16,17],11,false);
    chevalier.animations.add('idle',[18,19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],13,false);
    chevalier.animations.add('jump',[31,32,33,34,35,36,37,38,39],9,false);
    chevalier.animations.add('jump-attack',[40,41,42,43,44,45,46,47],8,false);
    chevalier.animations.add('run',[48,49,50,51,52,53,54,55,56],9,false);
    chevalier.animations.add('walk',[57,58,59,60,61,62,63,64,65,66],10,false);
    chevalier.body.bounce.y = 0.2;
    chevalier.body.gravity.y = 300;
    chevalier.body.collideWorldBounds = true;
    

    eau= this.game.add.group();
    this.game.physics.arcade.enable(eau);
    eau.enableBody = true;
    for (var i = 0; i < 20; i++) {
      eau.create(128 * i, 128 * 19, 'paysage',16);
    }

    this.map = this.game.add.tilemap('niveau1'); 
    this.map.setCollisionBetween(1, 18);
    this.map.addTilesetImage('paysage', 'paysage');
    plateforme = this.map.createLayer('plateforme');


    cursors =  this.game.input.keyboard.createCursorKeys();
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    this.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
        bg.height = this.game.world.height;
    bg.width = this.game.world.width;
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {
    
    var hitPlatform = this.game.physics.arcade.collide(chevalier, plateforme);
    
    chevalier.body.velocity.x = 0;
    if (cursors.left.isDown) {
       chevalier.body.velocity.x = -200;
      chevalier.scale.x =  -1;
      chevalier.animations.play('walk');
    } else if (cursors.right.isDown) {
       chevalier.body.velocity.x =  200;
      chevalier.scale.x =  1;
      chevalier.animations.play('walk');
    } else if (chevalier.body.blocked.down && hitPlatform) {
      chevalier.animations.play('idle');
    }
    
    if (cursors.up.isDown && chevalier.body.blocked.down && hitPlatform) {
      chevalier.body.velocity.y = -400;
      chevalier.animations.play('jump');
    }

  }

}
