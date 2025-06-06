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
        this.player.frame.x = 4;
        this.player.frame.max = 5;
        this.player.playerSpeed.x = this.player.speedMax;
        this.player.playerSpeed.y = 0;
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
        this.player.frame.x = 0
        this.player.frame.max = 1;
        this.player.playerSpeed.y = this.player.speedMax;
        this.player.playerSpeed.x = 0;
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
        this.player.frame.x = 6;
        this.player.frame.max = 7;
        this.player.playerSpeed.x = 0;
        this.player.playerSpeed.y = -1 * this.player.speedMax;
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
        this.player.frame.x = 2;
        this.player.frame.max = 3;
        this.player.playerSpeed.x = -1 * this.player.speedMax;
        this.player.playerSpeed.y = 0;
    }
    handleInput(input){
        if (input.includes("ArrowRight")){
            this.player.setState(STATE.IDLE);            
        } else if (input.includes("ArrowDown")) this.player.setState(STATE.DOWNWALKING);
        else if (input.includes("ArrowUp")) this.player.setState(STATE.UPWALKING);
    }
}