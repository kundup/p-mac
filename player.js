import { Idle, DownWalking, UpWalking, LeftWalking } from "./gamestate.js";

export class Player {
    constructor(game){
        this.game = game;
        this.x = 50;
        this.y = 50;
        this.width = 30;
        this.height = 30;        
        this.image = document.getElementById("player");        
        this.frame = {
            x : 4,
            max : 5,
            fps : 5,
            timer : 0
        }
        this.frameInterval = 1000/ this.frame.fps;
        this.playerSpeed = {
            x: 0,
            y : 0
        }    
        this.speedMax = 3; 
        this.gameScore = 0;              
        this.init();                  
    }
    init (){
        this.inputState = [new Idle(this), new DownWalking(this), new UpWalking(this), new LeftWalking(this)];
        this.currentState = this.inputState[0]
        this.currentState.enter();
    }
    draw(contex){
        contex.drawImage(this.image, this.width * this.frame.x, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltatime, input){ 
        this.currentState.handleInput(input);
        // horizontal movement and vertical movement
        this.x += this.playerSpeed.x;        
        this.y += this.playerSpeed.y;
        // boundary condition       
        if (this.x >= this.game.width) this.x = 0;
        else if (this.x + this.width < 0) this.x = this.game.width;
        // vertical boundary check
        if (this.y >= this.game.height) this.y = 0;
        else if (this.y + this.height <= 0) this.y = this.game.height;    
        // fps settings
        if (this.frame.timer > this.frameInterval){
            this.frame.timer = 0;
            if (this.frame.x < this.frame.max)this.frame.x ++;
            else this.frame.x = this.frame.max -1;
        } else {
            this.frame.timer += deltatime;
        }        
        let tileSize = this.game.tile_size;
        // align on the x axis
        if (this.playerSpeed.y !== 0) {
            this.x = Math.round(this.x / tileSize) * tileSize;
        }
        // align on the y axis
        if (this.playerSpeed.x !== 0) {
            this.y = Math.round(this.y / tileSize) * tileSize;
        }
    }    
    setState(state){
        this.currentState = this.inputState[state];        
        this.currentState.enter(); 
    }
    checkCollison (){
        let tile_size = this.game.tile_size;
        const futureRect = {
            x : this.x + this.playerSpeed.x,
            y : this.y + this.playerSpeed.y,
            width : this.width,
            height : this.height
        }
        for (let i = 0; i < this.game.map.length; i++){
            for(let j = 0; j < this.game.map[0].length; j++){
                // wall- detection algorithm
                if (this.game.map[i][j] === 1){
                    const tileRect = this.game.generateObj(j, i, this.game.tile_size)
                    if (this.rectTile(futureRect, tileRect)) {
                        if (
                            futureRect.x < tileRect.x + tileRect.width &&
                            futureRect.x + futureRect.width > tileRect.x
                        ) {
                            if (this.playerSpeed.x > 0) {                                
                                this.x = tileRect.x - this.width;
                            } else if (this.playerSpeed.x < 0) {
                                this.x = tileRect.x + tileRect.width;
                            }
                            this.playerSpeed.x = 0;
                        }            
                        if (
                            futureRect.y < tileRect.y + tileRect.height &&
                            futureRect.y + futureRect.height > tileRect.y
                        ) {
                            if (this.playerSpeed.y > 0) {                
                                this.y = tileRect.y - this.height;
                            } else if (this.playerSpeed.y < 0) {
                                this.y = tileRect.y + tileRect.height;
                            }
                            this.playerSpeed.y = 0;
                        }
                    }
                }
                if (this.game.map[i][j] === 2){
                    const dot = this.game.generateObj(j, i, this.game.tile_size);
                    const players = this.game.generateObj(this.x / this.game.tile_size, this.y / this.game.tile_size, this.game.tile_size)                  

                    if (this.rectTile(players, dot)){
                        this.game.map[i][j] = 0;
                        this.game.dot = this.game.dot.filter (d => !(d.x ===dot.x && d.y === dot.y));
                        this.gameScore += 1; 
                        console.log(this.gameScore);                        
                    }                    
                }                
            }
        }
    }    
    rectTile (a, b){
        return (a.x < b.x + b.width && a.x + a.width > b.x &&
            a.y < b.y + b.height && a.y + a.height > b.y)
    }    
}
