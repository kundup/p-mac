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
        super(STATE.IDLE);       
        this.player = player;
          
    }
    enter (){
        this.player.frameX = 6
        this.player.frameMax = 7;
        this.player.speedX = this.player.speedMax;
        this.player.speedY = 0;
    }
    handleInput(input){
        if (input.includes("ArrowDown")){
            this.player.setState(STATE.DOWNWALKING);
        
        }

    }
}

export class DownWalking extends Status {
    constructor(player){
        super(STATE.DOWNWALKING);
        this.player = player;
       
    }
    enter (){
        this.player.frameX = 8
        this.player.frameMax = 9;
        this.player.speedY = this.player.speedMax;
        this.player.speedX = 0;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);
            
        }
    }
}