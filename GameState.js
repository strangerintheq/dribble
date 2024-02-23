import {gameSettings} from "./GameSettings.js";

export class GameState {

    direction = 2;
    gameActive = false; // Начальное состояние игры неактивное
    score = 0; // Переменная для хранения количества очков
    bestScore = 0; // Переменная для хранения лучшего результата
    gameTime = 0; // Переменная для отслеживания времени игры

    gameObjects;
    puck;

    constructor(gameObjects, puck) {
        this.gameObjects = gameObjects;
        this.puck = puck;
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
        if (this.gameActive)
            return;
        this.gameActive = true;

        this.score = 0; // Сбрасываем счет
        this.gameTime = 0; // Сбрасываем время игры
        this.puck.reset()
        this.gameObjects.children.forEach((gameObject, index) => gameObject.reset(index));
        this.changeScore(0);
    }

    // движение шайбы
    movePuck(dt) {
        this.gameTime += dt; // Увеличиваем время игры
        this.puck.position.y += dt * gameSettings.speed;
        this.puck.position.x += dt * this.direction;
    }

    // Проверка столкновения со стенками
    checkWallCollision() {
        const p = this.puck.position;
        const hr = gameSettings.puckRadius / 2;
        const hw = gameSettings.trackWidth / 2;

        if (p.x + hr >= hw) {
            p.x = hw - hr;
            this.direction = -Math.abs(this.direction);
            this.changeScore(gameSettings.trackCollisionScore)
        }

        if (p.x + hw <= hr) {
            p.x = hr - hw;
            this.direction = Math.abs(this.direction);
            this.changeScore(gameSettings.trackCollisionScore)
        }
    }

    gameOver() {
        this.gameActive = false;
    }
}