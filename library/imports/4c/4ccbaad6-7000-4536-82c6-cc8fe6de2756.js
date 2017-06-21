"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        this.timer = 0;
        this.starDuration = 0;

        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
        console.log("game onload");

        this.score = 0;
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        console.log("add new star");
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;

        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        console.log(this.node.width, this.node.height);
        var randY = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight;
        // randY = ( randY > this.node.height?this.node.height:randY );
        randX = cc.randomMinus1To1() * (this.node.width / 2);

        console.log(randX, randY);
        return cc.p(randX, randY);
        // return cc.p(500,300);s
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.timer > this.starDuration) {
            console.log("timer:", this.starDuration, this.timer);
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = "Score:" + this.score.toString();

        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    gameOver: function gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }

});