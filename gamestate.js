const STATE = {
    IDLE : 0,
    DOWNWALKING : 1,
    UPWALKING : 2,
    LEFTWALKING : 3,
}
class Status {
    constructor(state, player){        
        this.state = state;
        this.player = player
    }
}
export class Idle extends Status {
    constructor(player){
        super(STATE.IDLE, player);                
    }
    enter (){
        this.player.frameX = 4;
        this.player.frameMax = 5;
        this.player.speedX = this.player.speedMax;
        this.player.speedY = 0;
    }
    handleInput(input){
        if (input.includes("ArrowDown")){
            this.player.setState(STATE.DOWNWALKING);        
        }else if (input.includes("ArrowUp")){
             this.player.setState(STATE.UPWALKING)
        }
        else if (input.includes("ArrowLeft")) this.player.setState(STATE.LEFTWALKING);      
    }
}
export class DownWalking extends Status {
    constructor(player){
        super(STATE.DOWNWALKING, player);       
    }
    enter (){
        this.player.frameX = 0
        this.player.frameMax = 1;
        this.player.speedY = this.player.speedMax;
        this.player.speedX = 0;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);
        }else if (input.includes("ArrowUp")) this.player.setState(STATE.UPWALKING);  
        else if (input.includes("ArrowLeft")) this.player.setState(STATE.LEFTWALKING);     
    }
}
export class UpWalking extends Status {
    constructor(player){
        super(STATE.UPWALKING, player);       
    }
    enter (){
        this.player.frameX = 6;
        this.player.frameMax = 7;
        this.player.speedX = 0;
        this.player.speedY = -1 * this.player.speedMax;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);            
        } else if (input.includes("ArrowDown")) this.player.setState(STATE.DOWNWALKING);
        else if (input.includes("ArrowLeft")) this.player.setState(STATE.LEFTWALKING);
    }
}
export class LeftWalking extends Status {
    constructor(player){
        super(STATE.LEFTWALKING, player);         
    }
    enter (){
        this.player.frameX = 2;
        this.player.frameMax = 3;
        this.player.speedX = -1 * this.player.speedMax;
        this.player.speedY = 0;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);            
        } else if (input.includes("ArrowDown")) this.player.setState(STATE.DOWNWALKING);
        else if (input.includes("ArrowUp")) this.player.setState(STATE.UPWALKING);
    }
}