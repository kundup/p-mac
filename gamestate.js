const STATE = {
    IDLE : 0,
    DOWNWALKING : 1,
}

export class Idle {
    constructor(player){
        this.player = player;
        this.state = STATE["IDLE"];        
    }
    enter (){
        this.player.frameX = 6
        this.player.frameMax = 7;
    }
    handleInput(input){
        this.enter();
        if (input.includes("ArrowDown")){
            setState(STATE.DOWNWALKING);
        }

    }
}

export class DownWalking {
    constructor(player){
        this.player = player;
        this.state = STATE["DOWNWALKING"];        
    }
    enter (){
        this.player.frameX = 8
        this.player.frameMax = 9;
    }
    handleInput(){
        if (input.includes("ArrowRight")){
            setState(STATE.IDLE);
        }
    }
}