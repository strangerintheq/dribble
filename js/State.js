import {settings} from "./Settings.js";

export class State {

    direction = 2;
    gameActive = false; // Начальное состояние игры неактивное
    score = 0; // Переменная для хранения количества очков
    bestScore = 0; // Переменная для хранения лучшего результата
    gameTime = 0; // Переменная для отслеживания времени игры

    puckPosition = {x: 0, y: 0, z: 0};

    tick(dt) {
        if (!this.gameActive)
            return
        this.gameTime += dt;
        this.puckPosition.y += dt * settings.speed;
        this.puckPosition.x += dt * this.direction;
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
        this.direction = dir * Math.abs(this.direction);
    }

    reset() {
        this.gameActive = true;

        // Сбрасываем счет
        this.score = 0;
        this.changeScore(0);

        // Сбрасываем время игры
        this.gameTime = 0;

        this.puckPosition = {x: 0, y: 0, z: 0};
    }

    gameOver() {
        this.gameActive = false;
    }
}