document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector(".grid")
    const dooler = document.createElement("div");
    let doolerLeftSpace = 50;
    let doolerBottomSpace =  150;
    let isGameOver = false;
    let platformCounts = 5;

    function createDoodler (){
        grid.appendChild(dooler);
        dooler.classList.add("dooler");
        dooler.style.left = doolerLeftSpace + "px";
        dooler.style.bottom = doolerBottomSpace + "px";
    }

    class Platform {
        constructor (newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315;
            this.visual = document.createElement("div");

            const visual = this.visual;
            visual.classList.add("platform");
            visual.style.left = this.left + "px";
            visual.style.bottom = this.bottom + "px";
            grid.appendChild(visual);

        }
    }

    function createPlatforms(){
        for (let i=0; i<platformCounts; i++) {
            let platfomrSpace = 600 / platformCounts;
            let newPlatBottom = 100 + i * platfomrSpace;
            let newPlatform = new Platform(newPlatBottom);

        }
    }

    function start (){
        if (!isGameOver){
            createDoodler();
            createPlatforms();
        }
    }
    // attach button    
    start()

})