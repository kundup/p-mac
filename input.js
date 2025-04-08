export class Input {
    constructor(){
        this.keys = []; 
        this.state = {
            IDLE : 0,
            WALK_IN : 1,
        }     
    }
    handleInput(){
        document.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowDown" || e.key ==="ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight")&& (this.keys.indexOf(e.key)=== -1)){
                this.keys.push(e.key);
            
            }
        })
        document.addEventListener("keyup", (e) => {
            if (e.key == "ArrowDown" || e.key === "ArrowUp"|| e.key === "ArrowLeft" || e.key === "ArrowRight"){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            
            }
        })
    }
}


