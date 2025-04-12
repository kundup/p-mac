import { Idle, DownWalking, UpWalking, LeftWalking } from "./gamestate.js";

export class Player {
    constructor(game){
        this.game = game;
        this.x = 100;
        this.y = 100;
        this.width = 30;
        this.height = 30;        
        this.image = document.getElementById("player");        
        this.frameX =4;
        this.frameMax = 5;
        this.speedX = 0;
        this.speedY = 0;
        this.speedMax = 3;
        this.fps = 5;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;        
        this.init();                  
    }
    init (){
        this.inputState = [new Idle(this), new DownWalking(this), new UpWalking(this), new LeftWalking(this)];
        this.currentState = this.inputState[0]
        this.currentState.enter();
    }

    draw(contex){
        contex.drawImage(this.image, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltatime, input){ 
        this.currentState.handleInput(input);
        // horizontal movement and vertical movement
        this.x += this.speedX;        
        this.y += this.speedY 
        // boundary condition       
        if (this.x >= this.game.width) this.x = 0;
        else if (this.x + this.width < 0) this.x = this.game.width;
        // vertical boundary check
        if (this.y >= this.game.height) this.y = 0;
        else if (this.y + this.height <= 0) this.y = this.game.height;    
        // fps settings
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