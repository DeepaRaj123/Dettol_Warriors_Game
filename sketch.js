var bg, bgImage1, bgImage2, bgImage3, bgImage4;
var player, playerImage;
var ground;
var leftWall, reightWall;
var ground;
var bulletGroup;
var bulletImage;
var bulletSound;
var bulletCock,jump,theme;
var gamewin,gamelosee,manhit;
var zombieWorldStartScore = 20;
var walking;
var germ1, germ1Image;
var playButtonImage, playButton;
var germsGroup;
var zombieGroup;
var b = 35;
var flag = 0;
let sprWalker;
var secondSprite, secondSpriteImage;
var dettolHandwash, dettolHandwashImage;
var dettolSanitizer, dettolSanitizerImage;
var dettolSoap, dettolSoapImage, explode_sprite_sheet;
var germ, germImage,germ2, germImage2,germ3, germImage3;
var walking;
var GRAVITY = 0.3;
var x1 = 0;
var x2;
var x3;
var x4;
var score = 0;
var count = 0;
var isGrounded = false;
var powerUps = 'Normal';
var canShoot = true;
var powerup1;
var powerup2;
var powerup3;
var bulletCount;
var health = 100;
var gamestate = "instructions";
var gameOver;
var restart;
var button1;
var button2;
var button3;
var isPowerUp1Enabled = false;
var isPowerUp2Enabled = false;
var isPowerUp3Enabled = false;
var healthCollectible;
var burstShotCollectible;
var canReload = true;
var germ2, germ2Image;
var zombie;
var background2Image;
var background1Image;
var zombieWorld = false;
var shield;
var shieldImage;
var isShieldActive = false;
var shieldCollectible;
var showLevelText = false;
var instructionsImage;
var bullett,bulletImg,bullet1,bulletImg1;
var health1,healthImg,scoreboard,scoreboardImg;
var replay,replayImg;
var levelcompleted,levelcompletedImg,home,homeImg;

function preload() {

    background1Image = loadImage('./background.jpg')
    bgImage1 = bgImage2 = background1Image;
    bulletImage = loadImage("./bullet.png")
    bulletSound = loadSound("./shot.mp3")
    bulletCock = loadSound("./explode.mp3")
    jump = loadSound("./jump.mp3")
    gamewin = loadSound("./gamewin.mpeg")
    gamelosee = loadSound("./gameloose.mp3")
    walking = loadSound("./walking.mp3")
    theme = loadSound("./theme.mp3")
    manhit = loadSound("./manhit.wav")
    germ1Image = loadImage("./germ1.png")
    secondSpriteImage = loadImage("./secondSprite.png")
    dettolHandwash = loadImage("./dettolhandwash.png")
    dettol1 = loadImage("liquidhandwash.png")
    explode_sprite_sheet = loadSpriteSheet('./explosion1024_768.png', 128, 128, 48);
    player_sprite_sheet = loadSpriteSheet('./player.png', 59, 66, 10);
    gameOverImage = loadImage("gameover.png")
    germ2Image = loadImage("germ2.png")
    germImage2 = loadImage("corona1.png")
    germImage3 = loadImage("corona2.png")
    zombie = loadAnimation('./zombie1.png', './zombie2.png', './zombie3.png', './zombie4.png', './zombie5.png')
    background2Image = loadImage("background2.png")
    shieldImage = loadImage("shield.png")
    instructionsImage = loadImage("instructions1.png")
    playButtonImage = loadImage("./playButton.png");
    bulletImg = loadImage("./bullet1.png")
    bulletImg1 = loadImage("./bulletcount.png")
    healthImg = loadImage("./Health.png")
    scoreboardImg = loadImage("./score.png")
    replayImg = loadImage("./replay1.png")
    levelcompletedImg = loadImage("./levelcompleted.png")
    homeImg = loadImage("./home.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    button1 = createButton('BURSTSHOT');
    button1.position(windowWidth - 350, 850);
    button1.mousePressed(ActivatePowerup1);
    button1.style('background-color', "red")
    button1.style('height', "50px")
    button1.style('width', "100px")
    button1.style('display', "none")


    // button2 = createButton('HEALTH FULL');
    // button2.position(windowWidth - 250, 850);
    // button2.mousePressed(ActivatePowerup2);
    // button2.style('background-color', "green")
    // button2.style('height', "50px")
    // button2.style('width', "100px")

    // button3 = createButton('POWERUP 3');
    // button3.position(windowWidth - 150, 850);
    // button3.mousePressed(ActivatePowerup3);
    // button3.style('background-color', "yellow")
    // button3.style('height', "50px")
    // button3.style('width', "100px")

    x2 = width;
    player = createSprite(80, (windowHeight / 2), 59, 66);
    player.scale =3 ;
    player.addAnimation('running', player_sprite_sheet);
    player.animation.frameDelay = 7;
    player.animation.looping = true;
    // player.addImage(playerImage);

    ground = createSprite(windowWidth / 2, windowHeight * .82, windowWidth, 10);
    leftWall = createSprite(-50, windowHeight / 2, 10, windowHeight);
    rightWall = cameOver = createSprite(windowWidth + 50, windowHeight / 2, 10, windowHeight);
    gameOver = createSprite(windowWidth / 2, windowHeight / 3)
    gameOver.addImage(gameOverImage)
    gameOver.scale = 0.25;
    ground.visible = false;

    bulletGroup = new Group();
    germsGroup = new Group();
    zombieGroup = new Group();

    bulletCount = 20;
    gameOver.visible = false;
    instruction = createSprite(windowWidth / 2, windowHeight / 2.5+40, 1, 1);
    playButton = createSprite(windowWidth / 2-10, windowHeight - (windowHeight / 10), 10, 10);
    playButton.addImage(playButtonImage);
    playButton.scale = 0.5;
    instruction.addImage(instructionsImage);
    //playButton.scale = 2;
    instruction.scale = .38;

    bullett = createSprite(width-130,65,10,10);
    bullett.addImage(bulletImg);
    bullett.scale = 0.12;
    
    bullet1 = createSprite(width-50,60,10,10);
    bullet1.addImage(bulletImg1);
    bullet1.scale = 0.05;

    health1 = createSprite(100,100,10,10);
    health1.addImage(healthImg);
    health1.scale = 0.1;

    scoreboard = createSprite(width/2,50,10,10);
    scoreboard.addImage(scoreboardImg);
    scoreboard.scale = 0.12;

    replay = createSprite(width/2,height/2+170,10,10);
    replay.addImage(replayImg);
    replay.scale = 0.5;

    levelcompleted = createSprite(width/2,height/2,10,10);
    levelcompleted.addImage(levelcompletedImg);
    levelcompleted.scale = 0.35;

    home = createSprite(width/2,height/2+30,10,10);
    home.addImage(homeImg);
    home.scale = 0.2;

    bullett.visible = false;
    bullet1.visible = false;
    health1.visible = false;
    scoreboard.visible = false;
    replay.visible = false;
    levelcompleted.visible = false;
    home.visible = false;
   // theme.volume(0.1);
  // if(theme.isPlaying === true)

}


function BackgroundMovement() {
    if (bgImage1) {
        image(bgImage1, x1, 0, width, windowHeight);
        image(bgImage2, x2, 0, width, windowHeight);
    }
    if (bgImage3) {
        image(bgImage3, x3, 0, width, windowHeight);
        image(bgImage4, x4, 0, width, windowHeight);
    }
    x1 -= 1.5;
    x2 -= 1.5;
    x3 -= 1.5;
    x4 -= 1.5;


    if (x1 < -width) {
        x1 = width;
    }

    if (x2 < -width) {
        x2 = width;

    }

    if (x3 < -width) {
        x3 = width;

    }
    if (x4 < -width) {
        x4 = width;

    }

}

function PlayerControls() {
    if (keyWentDown("CTRL") && canShoot && bulletCount > 0) {
        spawnBullets();
        canShoot = false;
        setTimeout(() => { canShoot = true; }, 150);
        bulletCount = bulletCount - 1;
    }
    if (keyWentDown("R") && canReload) {
        bulletCount = 20;
        canReload = false;
        powerUps = "Normal"
        setTimeout(() => { canReload = true; }, 10000);
    }
    if (isShieldActive && shield == null) {
        shield = createSprite(player.position.x + 30, player.position.y);
        shield.addImage(shieldImage)
        shield.scale = 0.15;

    }
    if (isShieldActive) {
        shield.position.x = player.position.x + 30
        shield.position.y = player.position.y
    }


    if ((keyDown(UP_ARROW) || keyWentDown("w") || keyWentDown("space")) && isGrounded) {
        player.velocity.y = -12;
        jump.play();
    }

}

function ApplyGravity() {
    player.velocity.y += GRAVITY;
    if (ground.overlap(player)) {
        player.velocity.y = 0;
        isGrounded = true;
    } else {
        isGrounded = false;
    }
    for (var i = 0; i < zombieGroup.length; i++) {
        zombieGroup.get(i).velocity.y += GRAVITY;
    }
    zombieGroup.overlap(ground, (a, b) => {
        a.velocity.y = 0;
        b.velocity.y = 0;
    })
}


function GameOverConditions() {}

function ZombieControl() {
    if (frameCount % 120 === 0) {
        for (var i = 0; i < zombieGroup.length; i++) {
            if (random(0, 10) < 8) {
                zombieGroup.get(i).velocity.y -= random(11, 15);
            }
        }
    }
}

function HealthController() {
    germsGroup.overlap(player, (a, b) => {
        a.remove();
        manhit.play();
        health = health - 25;
        if (health == 0) {
            player.scale = 0;
            bullett.scale = 0;
            bullet1.scale = 0;
            health1.scale = 0;
            scoreboard.scale = 0;
           gamelosee.play();
            gamestate = "end";

        }
    })
    zombieGroup.overlap(player, (a, b) => {
        a.remove();
        manhit.play();
        health = health - 50;
        if (health == 0) {
            player.scale = 0;
            bullett.scale = 0;
            bullet1.scale = 0;
            health1.scale = 0;
            scoreboard.scale = 0;
            gamelosee.play();
            gamestate = "end";
        }
    })
}

function ActivatePowerup1() {
    if (isPowerUp1Enabled) {
        powerUps = "BurstShot"
        button1.style('display', "none")
    }
}

function ActivatePowerup2() {
    if (isPowerUp2Enabled) {
        health = 100;
    }
}

function ActivatePowerup3() {}

function AddScore(increase) {
    score = score + increase;
    if (score % zombieWorldStartScore == 0 && zombieWorld === false) {
        showLevelText = true;
        zombieWorldStartScore = 25;
        setTimeout(() => {
            SpawnZombielogic();
            bgImage3 = background2Image;
            bgImage4 = background2Image;
            x3 = width;
            x4 = width * 2;
            zombieWorld = true;
            showLevelText = false;
        }, 3000)
    }
    if (score % 10 == 0) {
        isPowerUp1Enabled = true;
        SpawnHealthCollectible();
        button1.style('display', "block")
    }
    if (score % 8 == 0) {
        var y = random(windowHeight * .7, windowHeight * .5)
        SpawnshieldCollectible(windowWidth, y);

    }

}


function draw() {
   
    switch (gamestate) {
        case 'instructions':
            BackgroundMovement();
            ApplyGravity();
            if (mouseIsPressed) {
            playButton.remove();
            instruction.remove();
            theme.loop();
            gamestate = 'play';
            scoreboard.scale = 0.12;
            player.scale = 3;
            bullett.scale = 0.12;
            bullet1.scale = 0.05;
            health1.scale = 0.1;
                
            }
       

            break;
        case 'play':
            BackgroundMovement();
            ApplyGravity()
            PlayerControls();
            HealthController();
            GameOverConditions();
            ZombieControl();
            bullett.visible = true;
            bullet1.visible = true;
            health1.visible = true;
            scoreboard.visible = true;
            player.visible = true;
            germsGroup.overlap(leftWall, (a, b) => {
                a.remove();
            })
            zombieGroup.overlap(leftWall, (a, b) => {
                a.remove();
            })
            bulletGroup.overlap(rightWall, (a, b) => {
                a.remove();
            })
            if (healthCollectible) {
                player.overlap(healthCollectible, (a, b) => {
                    b.remove();
                    health = 100;
                })
            }

            if (shieldCollectible) {
                shieldCollectible.overlap(player, (a, b) => {
                    a.remove();
                    shieldCollectible = null;
                    isShieldActive = true;
                })
            }
            if (isShieldActive && shield) {
                shield.overlap(germsGroup, (a, b) => {
                    a.remove();
                    b.remove();
                    isShieldActive = false;
                    shield = null;
                })
            }
            if (isShieldActive && shield) {
                shield.overlap(zombieGroup, (a, b) => {
                    a.remove();
                    b.remove();
                    isShieldActive = false;
                    shield = null;
                })

            }

            if (showLevelText) {
                strokeWeight(10)
                textStyle(BOLD)
                textSize(48);
                text(" Get ready for zombies  ", (windowWidth / 2 - 250), windowHeight / 2 - 200)

            }

            if(score === 20)
            {
                player.scale = 0;
                bullett.scale = 0;
                bullet1.scale = 0;
                health1.scale = 0;
                scoreboard.scale = 0;
                gamewin.play();
                gamestate = 'win';

            }




            bulletGroup.overlap(germsGroup, (a, b) => {
                a.remove();
                b.remove();
                sprWalker = createSprite(b.position.x, b.position.y, 60, 60);
                sprWalker.scale = .4;
                sprWalker.addAnimation('explode', explode_sprite_sheet);
                sprWalker.scale = .4;
                sprWalker.animation.frameDelay = 1;
                sprWalker.animation.looping = false;
                bulletCock.play();
                AddScore(1);
            });

            zombieGroup.overlap(bulletGroup, (a, b) => {
                a.health--;
                sprWalker = createSprite(b.position.x, b.position.y, 60, 60);
                sprWalker.addAnimation('explode', explode_sprite_sheet);
                sprWalker.scale = .1;
                sprWalker.animation.frameDelay = 1;
                sprWalker.animation.looping = false;
                b.remove();
                if (a.health == 0) {
                    SpawnshieldCollectible(a.position.x, a.position.y);
                    a.remove();
                    AddScore(1);
                    sprWalker = createSprite(a.position.x, a.position.y, 60, 60);
                    sprWalker.addAnimation('explode', explode_sprite_sheet);
                    sprWalker.scale = 1.7;
                    sprWalker.animation.frameDelay = 1;
                    sprWalker.animation.looping = false;
              
                }
                if (zombieGroup.length == 0) {

                    zombieWorld = false;
                    bgImage3 = null;
                    // bgImage = background1Image;
                }
            })

            spawnGerms();

         
            break;
        case 'end':
            gameOver.visible = true;
            replay.visible = true;
            score = 0;
            health = 100;
            bullet = 20;
            theme.pause();

            if (mouseIsPressed&&gamestate === 'end') {
                gameOver.visible = false;
                replay.visible = false;
                gamestate = 'instructions';
                //theme.loop();
            }
   
            if (healthCollectible) {
                healthCollectible.remove();
            }
            for (var i = 0; i < zombieGroup.length; i++) {
                zombieGroup.get(0).remove();
            }
            for (i = 0; i < germsGroup.length; i++) {
                var removableGerm = germsGroup.get(0);
                removableGerm.remove();
            }
            for (i = 0; i < bulletGroup.length; i++) {
                var removableBullets = bulletGroup.get(0);
                removableBullets.remove();
            }
            break;

        case 'win':
            levelcompleted.visible = true;
            home.visible = true;
            score = 0;
            health = 100;
            bullet = 20;
            theme.pause();
            if (mouseIsPressed&&gamestate === 'win') {
                levelcompleted.visible = false;
                home.visible = false;
                gamestate = 'instructions';

            }
   
            if (healthCollectible) {
                healthCollectible.remove();
            }
            for (var i = 0; i < zombieGroup.length; i++) {
                zombieGroup.get(0).remove();
            }
            for (i = 0; i < germsGroup.length; i++) {
                var removableGerm = germsGroup.get(0);
                removableGerm.remove();
            }
            for (i = 0; i < bulletGroup.length; i++) {
                var removableBullets = bulletGroup.get(0);
                removableBullets.remove();
            }
            break;


            
    }

    drawSprites();
    if(gamestate === 'play')
    {
    textSize(30);
    textStyle('Helvetica')
    fill('yellow')
    textStyle(BOLD);
    text(score, width/2-10, 92)
    text(bulletCount, windowWidth - 66, 72);
    fill('green')
    text(health,95, 140)
    }
   
}

function spawnBullets() {
    switch (powerUps) {
        case 'Normal':
            var bullet = createSprite(player.position.x + 100, player.position.y - 45);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5);
            bullet.lifetime = 20;
            bullet.scale = 0.3;
            bulletGroup.add(bullet);
            break;
        case 'BurstShot':
            var bullet = createSprite(player.position.x + 60, player.position.y - 33);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5);
            bullet.lifetime = 20;
            bullet.scale = 0.2;
            bulletGroup.add(bullet);

            bullet = createSprite(player.position.x + 60, player.position.y - 33);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5, 30);
            bullet.lifetime = 20;
            bullet.scale = 0.2;
            bulletGroup.add(bullet);

            bullet = createSprite(player.position.x + 60, player.position.y - 33);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5, -30);
            bullet.lifetime = 20;
            bullet.scale = 0.2;
            bulletGroup.add(bullet);

            bullet = createSprite(player.position.x + 60, player.position.y - 33);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5, 15);
            bullet.lifetime = 20;
            bullet.scale = 0.2;
            bulletGroup.add(bullet);

            bullet = createSprite(player.position.x + 60, player.position.y - 33);
            bullet.addImage(bulletImage);
            bulletSound.play();
            bullet.setSpeed(5, -15);
            bullet.lifetime = 20;
            bullet.scale = 0.2;
            bulletGroup.add(bullet);

            break;
    }
}

function spawnGerms() {
    if (frameCount % 100 === 0 && zombieWorld == false) {
        var rand = Math.round(random(1,3));
        var germ = createSprite(windowWidth, windowHeight * .7);
        switch(rand)
        {
        case 1: germ.addImage(germ1Image); germ.scale = 0.5; break;
        case 2: germ.addImage(germImage2); germ.scale = 0.2; break;
        case 3: germ.addImage(germImage3); germ.scale = 0.25; break;
        default: break;
        }
        germ.position.y = Math.round(random(windowHeight * .7, windowHeight * .5));
        germ.setSpeed(-5);
        germ.lifetime = 100;
        germsGroup.add(germ);
    }
    if (frameCount % 201 === 0 && score > 15) {
        var germ = createSprite(windowWidth, windowHeight * .7);
        germ.addImage(germ2Image);
        germ.position.y = Math.round(random(windowHeight * .7, windowHeight * .5));
        germ.setSpeed(-5);
        germ.lifetime = 100;
        germ.scale = 0.2;
        germsGroup.add(germ);
    }

}

function SpawnHealthCollectible() {

    healthCollectible = createSprite(windowWidth, windowHeight * .7);
    healthCollectible.addImage(dettolHandwash);
    healthCollectible.position.y = Math.round(random(windowHeight * .7, windowHeight * .5));
    healthCollectible.setSpeed(-5);
    healthCollectible.lifetime = 100;
    healthCollectible.scale = 0.5;


}

function SpawnZombie() {
    var zombieEnemy = createSprite(windowWidth, windowHeight * 0.5, 59, 66);
    zombieEnemy.addAnimation('walking', zombie);
    zombieEnemy.scale = 0.2;
    zombieEnemy.animation.frameDelay = 9;
    zombieEnemy.animation.looping = true;
    zombieEnemy.setSpeed(-.5);
    zombieEnemy.health = 10;
    zombieGroup.add(zombieEnemy);
}

function SpawnZombielogic() {
    setTimeout(() => {
        SpawnZombie();
    }, random(0, 5000));
    setTimeout(() => {
        SpawnZombie();
    }, random(6000, 11000));
    setTimeout(() => {
        SpawnZombie();
    }, random(12000, 17000));
}

function SpawnshieldCollectible(x, y) {

    shieldCollectible = createSprite(x, y);
    shieldCollectible.addImage(dettol1);
    shieldCollectible.position.y = Math.round(random(windowHeight * .7, windowHeight * .5));
    shieldCollectible.setSpeed(-5);
    shieldCollectible.lifetime = 100;
    shieldCollectible.scale = 0.15;

}