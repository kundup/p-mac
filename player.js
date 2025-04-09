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
        this.speedX = 0;
        this.speedY = 0;
        this.speedMax = 2;
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
        // horizontal movement
        this.x += this.speedX;
        //if (input.includes("ArrowRight")) this.speedX = this.speedMax;
        //else this.speedX = 0;
        // else if (input.includes("ArrowLeft")) this.speedX = -this.speedMax;
        // vertical movement
        this.y += this.speedY
        //if (input.includes("ArrowDown")) this.speedY = this.speedMax;
        //else this.speedY = 0;

        // boundary condition       
        if (this.x >= this.game.width) this.x = 0;
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