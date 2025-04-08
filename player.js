import { Idle, DownWalking } from "./gamestate.js";

export class Player {
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 30;        
        this.image = document.getElementById("player");        
        this.frameX;
        this.frameMax = 7;
        this.fps = 5;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;        
        this.init(); 
                 
    }
    init (){
        this.inputState = [new Idle(this), new DownWalking(this)];
        this.currentState = this.inputState[0]
        this.currentState.enter();
    }

    draw(contex){
        contex.drawImage(this.image, 15.2 * this.frameX, 12, this.width * 0.5, this.height * 0.5, this.x, this.y, 45, 45);
    }
    update(deltatime, input){ 
        this.currentState.handleInput(input);
        this.x++;        
        if (this.x >= this.game.width) this.x = 0;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.frameMax)this.frameX ++;
            else this.frameX = this.frameMax-1;
        } else {
            this.frameTimer += deltatime;
        }
        
    }

    setState(state){
        this.currentState = this.inputState[state];
        this.currentState.enter();        

    }
}