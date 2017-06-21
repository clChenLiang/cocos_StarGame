cc.Class({
    extends: cc.Component,

    properties: {
       pickRadius:0,
        game: {
            default: null,
            serializable: false
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    getPlayerDistance:function(){
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position,playerPos);
        // console.log(dist);aaaaa
        return dist;
    },
    onPicked:function(){
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // console.log("update once");
        if(this.getPlayerDistance() < this.pickRadius ){
            // console.log("picked by player");
            this.onPicked();
            return ;
        }
        
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio*(255 - minOpacity));
        // console.log("opacityRatio:",this.game.starDuration  ,this.node.opacity);
    },
});
