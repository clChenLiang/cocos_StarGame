require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4ccbarWcABFNoLGzI/m3idW', 'Game');
// scripts\Game.js

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

cc._RFpop();
},{}],"Player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '13b86QPqLpOB7O5E3UcZYIo', 'Player');
// scripts\Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,

        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        this.setInputControl();
    },
    setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        var callback = cc.callFunc(this.playJumpSound, this);

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },
    playJumpSound: function playJumpSound() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    setInputControl: function setInputControl() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            conKeyReleased: function conKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // 只是确保速度值为 最大值  ，方向与保持一致
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        //  randX = ( Math.abs(randX) > this.node.width/2 ? this.node.width : randX )
        if (Math.abs(this.node.x) < 400) {
            this.node.x += this.xSpeed * dt;
        } else {
            this.xSpeed = -1 * this.xSpeed;
            this.node.x += this.node.x / Math.abs(this.node.x) * -1;
            //  this.accel = -this.accel;
            //  this.accLeft = !this.accLeft;
            //  this.accRight = ! this.accLeft;
            //  this.node.x += 20;
        }
    }
});

cc._RFpop();
},{}],"Star":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aef8bxgpoFPhpC+z/cDFH5X', 'Star');
// scripts\Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: {
            default: null,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},
    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        // console.log(dist);aaaaa
        return dist;
    },
    onPicked: function onPicked() {
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        // console.log("update once");
        if (this.getPlayerDistance() < this.pickRadius) {
            // console.log("picked by player");
            this.onPicked();
            return;
        }

        var opacityRatio = 1 - this.game.timer / this.game.starDuration;

        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        // console.log("opacityRatio:",this.game.starDuration  ,this.node.opacity);
    }
});

cc._RFpop();
},{}]},{},["Game","Player","Star"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9QbGF5ZXIuanMiLCJhc3NldHMvc2NyaXB0cy9TdGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZTO0FBSWI7QUFDSTtBQUNBO0FBRk87QUFuQkg7O0FBeUJaO0FBQ0E7O0FBRUk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7O0FBRUE7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNIOztBQWhGSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDRztBQUNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0E7QUFGTTtBQU5GOztBQVlaO0FBQ0E7QUFDSTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSDtBQUNEO0FBQ0k7QUFDQTs7QUFFQTs7QUFJQTtBQUdIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFDQTtBQVJSO0FBVUg7QUFDRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0o7QUFDSTtBQUNBO0FBTlI7QUFRSDtBQXZCdUI7QUF5Qi9COztBQUlEO0FBQ0E7QUFDSTtBQUNJO0FBQ0g7QUFDRztBQUNIOztBQUVEO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0M7QUFDTztBQUNOO0FBQ0c7QUFDQTtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Y7QUFFTDtBQWxHSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDRztBQUNDO0FBQ0k7QUFDQTtBQUZFO0FBRkU7O0FBUVo7QUFDQTtBQUdBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNIO0FBeENJIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzdGFyUHJlZmFiOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF4U3RhckR1cmF0aW9uOjAsXHJcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOjAsXHJcbiAgICAgICAgZ3JvdW5kOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsYXllcjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZURpc3BsYXk6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3JlQXVkaW86e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHVybDpjYy5BdWRpb0NsaXBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodC8yO1xyXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG9ubG9hZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgfSxcclxuICAgIHNwYXduTmV3U3RhcjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobmV3U3Rhcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZGQgbmV3IHN0YXJcIik7XHJcbiAgICAgICAgbmV3U3Rhci5zZXRQb3NpdGlvbih0aGlzLmdldE5ld1N0YXJQb3NpdGlvbigpKTtcclxuICAgICAgICBuZXdTdGFyLmdldENvbXBvbmVudCgnU3RhcicpLmdhbWUgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IHRoaXMubWluU3RhckR1cmF0aW9uICsgY2MucmFuZG9tMFRvMSgpKih0aGlzLm1heFN0YXJEdXJhdGlvbiAtIHRoaXMubWluU3RhckR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcclxuICAgIH0sXHJcbiAgICBnZXROZXdTdGFyUG9zaXRpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcmFuZFggPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZS53aWR0aCx0aGlzLm5vZGUuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgcmFuZFkgPSAgdGhpcy5ncm91bmRZICsgY2MucmFuZG9tMFRvMSgpKnRoaXMucGxheWVyLmdldENvbXBvbmVudChcIlBsYXllclwiKS5qdW1wSGVpZ2h0IDtcclxuICAgICAgICAvLyByYW5kWSA9ICggcmFuZFkgPiB0aGlzLm5vZGUuaGVpZ2h0P3RoaXMubm9kZS5oZWlnaHQ6cmFuZFkgKTtcclxuICAgICAgICByYW5kWCA9IGNjLnJhbmRvbU1pbnVzMVRvMSgpKih0aGlzLm5vZGUud2lkdGgvMik7XHJcbiAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhyYW5kWCxyYW5kWSk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgscmFuZFkpO1xyXG4gICAgICAgIC8vIHJldHVybiBjYy5wKDUwMCwzMDApO3NcclxuICAgIH0sXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBpZih0aGlzLnRpbWVyID4gdGhpcy5zdGFyRHVyYXRpb24pe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRpbWVyOlwiLHRoaXMuc3RhckR1cmF0aW9uLHRoaXMudGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XHJcbiAgICB9LFxyXG4gICAgZ2FpblNjb3JlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPTE7XHJcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gXCJTY29yZTpcIit0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sZmFsc2UpO1xyXG4gICAgfSxcclxuICAgIGdhbWVPdmVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAganVtcEhlaWdodDowLFxyXG4gICAgICAgIGp1bXBEdXJhdGlvbjowLFxyXG4gICAgICAgIG1heE1vdmVTcGVlZDowLFxyXG4gICAgICAgIGFjY2VsOjAsXHJcbiAgICAgICAgXHJcbiAgICAgICAganVtcEF1ZGlvOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICB1cmw6Y2MuQXVkaW9DbGlwXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuanVtcEFjdGlvbiA9IHRoaXMuc2V0SnVtcEFjdGlvbigpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24odGhpcy5qdW1wQWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XHJcbiAgICB9LFxyXG4gICAgc2V0SnVtcEFjdGlvbjpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBqdW1wVXAgPSBjYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sY2MucCgwLHRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSk7XHJcbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLGNjLnAoMCwtdGhpcy5qdW1wSGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNjLmNhbGxGdW5jKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShqdW1wVXAsanVtcERvd24sY2FsbGJhY2spKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBwbGF5SnVtcFNvdW5kOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmp1bXBBdWRpbyxmYWxzZSk7ICBcclxuICAgIH0sXHJcbiAgICBzZXRJbnB1dENvbnRyb2w6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcclxuICAgICAgICAgICAgZXZlbnQ6Y2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcclxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOmZ1bmN0aW9uKGtleUNvZGUsZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGtleUNvZGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29uS2V5UmVsZWFzZWQ6ZnVuY3Rpb24oa2V5Q29kZSxldmVudCl7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goa2V5Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHNlbGYubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGlmKHRoaXMuYWNjTGVmdCl7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLmFjY1JpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy54U3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkKXtcclxuICAgICAgICAgICAgLy8g5Y+q5piv56Gu5L+d6YCf5bqm5YC85Li6IOacgOWkp+WAvCAg77yM5pa55ZCR5LiO5L+d5oyB5LiA6Ie0XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICByYW5kWCA9ICggTWF0aC5hYnMocmFuZFgpID4gdGhpcy5ub2RlLndpZHRoLzIgPyB0aGlzLm5vZGUud2lkdGggOiByYW5kWCApXHJcbiAgICAgICAgIGlmKCBNYXRoLmFicyh0aGlzLm5vZGUueCkgPCA0MDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcclxuICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICB0aGlzLnhTcGVlZCA9IC0xKnRoaXMueFNwZWVkO1xyXG4gICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5ub2RlLnggLyBNYXRoLmFicyh0aGlzLm5vZGUueCkgKiAoLTEpO1xyXG4gICAgICAgICAgICAvLyAgdGhpcy5hY2NlbCA9IC10aGlzLmFjY2VsO1xyXG4gICAgICAgICAgICAvLyAgdGhpcy5hY2NMZWZ0ID0gIXRoaXMuYWNjTGVmdDtcclxuICAgICAgICAgICAgLy8gIHRoaXMuYWNjUmlnaHQgPSAhIHRoaXMuYWNjTGVmdDtcclxuICAgICAgICAgICAgLy8gIHRoaXMubm9kZS54ICs9IDIwO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIHBpY2tSYWRpdXM6MCxcclxuICAgICAgICBnYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGdldFBsYXllckRpc3RhbmNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBsYXllclBvcyA9IHRoaXMuZ2FtZS5wbGF5ZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgZGlzdCA9IGNjLnBEaXN0YW5jZSh0aGlzLm5vZGUucG9zaXRpb24scGxheWVyUG9zKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkaXN0KTthYWFhYVxyXG4gICAgICAgIHJldHVybiBkaXN0O1xyXG4gICAgfSxcclxuICAgIG9uUGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3RhcigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5nYWluU2NvcmUoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXBkYXRlIG9uY2VcIik7XHJcbiAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpIDwgdGhpcy5waWNrUmFkaXVzICl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicGlja2VkIGJ5IHBsYXllclwiKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgb3BhY2l0eVJhdGlvID0gMSAtIHRoaXMuZ2FtZS50aW1lci90aGlzLmdhbWUuc3RhckR1cmF0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBtaW5PcGFjaXR5ID0gNTA7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8qKDI1NSAtIG1pbk9wYWNpdHkpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9wYWNpdHlSYXRpbzpcIix0aGlzLmdhbWUuc3RhckR1cmF0aW9uICAsdGhpcy5ub2RlLm9wYWNpdHkpO1xyXG4gICAgfSxcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=