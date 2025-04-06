export class Input {
    constructor(player){
        this.player = player;
        this.keys = [];      
    }
    handleInput(){
        document.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowDown" || e.key ==="ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight")&& (this.keys.indexOf(e.key)=== -1)){
                this.keys.push(e.key);
                console.log(this.keys);
            }
        })
        document.addEventListener("keyup", (e) => {
            if (e.key == "ArrowDown" || e.key === "ArrowUp"|| e.key === "ArrowLeft" || e.key === "ArrowRight"){
                this.keys.splice(this.keys.indexOf(e.key), 1);
                console.log(this.keys);
            }
        })
    }
}


