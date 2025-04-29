import { Enemies } from "../enemy.js";

export class EnemyManager {
    constructor(game){
        this.game = game;
        this.enemytypes = [Enemies, Enemies, Enemies, Enemies];
        this.enemylist = [];
    }
    spawnEnemy(count){
        for (let i = 0; i < count; i++){
            const typeIndex = i % this.enemytypes.length; 
            const EnemyClass = this.enemytypes[typeIndex];
            const config = {
                speed : Math.random() * 2 + 1,
                width : 30,
                height : 30,
            }
            const enemy = new EnemyClass (this.game, config);
            this.enemylist.push(enemy);
        }
    }

    drawAllEnemy(ctx){
        this.enemylist.forEach(enemy => {
            enemy.drawEnemies(ctx)
        })

    }
    updateAllEnemy(){
        this.enemylist .forEach(enemy => {
            enemy.updateEnemies(this.game.player, this.enemylist)
        })
    }
    resetAllEnemy (){
        this.enemylist = []
    }


}