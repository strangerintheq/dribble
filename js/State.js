import {settings} from "./Settings.js";

export const GameState = {
    NOT_STARTED: "NOT_STARTED",
    RUNNING: "RUNNING",
    OVER: "OVER",
    ENDED: "ENDED"
};

export class State {

    gameState;
    score;
    bestScore = 0;
    gameTime;

    puckSpeed;
    puckPosition;
    puckDirection;

    tick(dt) {
        this.gameTime += dt;
        this.puckPosition.y += dt * this.puckDirection.y * this.puckSpeed;
        this.puckPosition.x += dt * this.puckDirection.x * this.puckSpeed;
        if (this.gameState === GameState.OVER || this.gameState === GameState.ENDED) {
            this.puckSpeed = this.puckSpeed * 0.98
            if (this.puckSpeed < 0.1) {
                this.gameState = GameState.ENDED;
            }
        }
    }

    changeScore(amount) {
        this.score = Math.max(0, this.score + amount);
        document.getElementById('score').innerText = "Score: " + this.score;
        // Обновляем лучший результат
        this.bestScore = Math.max(this.score, this.bestScore);
        // Обновляем отображение лучшего результата
        document.getElementById('bestScore').innerText = `Best Score: ${this.bestScore}`;
    }

    changeDirection(dir) {
        this.puckDirection.x = dir * Math.abs(this.puckDirection.x);
    }

    reset() {
        this.score = 0;
        this.changeScore(0);
        this.gameTime = 0;
        this.puckPosition = {x: 0, y: 0, z: 0};
        this.puckDirection = {x: 0, y: 0};
        this.puckSpeed = 0;
        this.gameState = GameState.NOT_STARTED;
        document.querySelector("#gameOver").style.display = "none"
    }

    start(dir) {
        this.puckSpeed = settings.speed;
        this.gameState = GameState.RUNNING;
        this.setPuckDirection(dir === 1 ? 1 : Math.PI - 1);
    }

    gameOver() {
        this.gameState = GameState.OVER;
        document.querySelector("#gameOver").style.display = "unset"
    }

    setPuckDirection(angle) {
        this.puckDirection = {x: Math.cos(angle), y: Math.sin(angle)};
    }

    playSound() {

    }

}


