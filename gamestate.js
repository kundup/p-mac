const STATE = {
    IDLE : 0,
    DOWNWALKING : 1,
}

class Status {
    constructor(state){        
        this.state = state;
    }
}

export class Idle extends Status {
    constructor(player){
        super("IDLE");       
        this.player = player;
          
    }
    enter (){
        this.player.frameX = 6
        this.player.frameMax = 7;
    }
    handleInput(input){
        if (input.includes("ArrowDown")){
            this.player.setState(STATE.DOWNWALKING);
        }

    }
}

export class DownWalking extends Statu {
    constructor(player){
        super("DOWNWALKING");
        this.player = player;
       
    }
    enter (){
        this.player.frameX = 8
        this.player.frameMax = 9;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);
        }
    }
}