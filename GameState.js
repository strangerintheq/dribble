import {Puck} from "./Puck.js";
import {Cone} from "./Cone.js";
import {Track} from "./Track.js";

export class GameState {

    speed = 2;
    direction = 2;
    gameActive = false; // Начальное состояние игры неактивное
    score = 0; // Переменная для хранения количества очков
    bestScore = 0; // Переменная для хранения лучшего результата
    gameTime = 0; // Переменная для отслеживания времени игры

    cones;
    puck;

    constructor(cones, puck) {
        this.cones = cones;
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
        this.cones.children.forEach((cone, index) => cone.reset(index, Track.width));

        document.getElementById('overlay').style.display = 'none'; // Скрываем кнопку
        this.changeScore(0);
    }

    // движение шайбы
    movePuck(dt) {
        this.gameTime += dt; // Увеличиваем время игры
        this.puck.position.y += dt * this.speed;
        this.puck.position.x += dt * this.direction;
    }

    // Проверка столкновения со стенками
    checkWallCollision() {
        if (this.puck.position.x + Puck.puckRadius / 2 >= Track.width / 2) {
            this.puck.position.x = Track.width / 2 - Puck.puckRadius / 2;
            this.direction = -Math.abs(this.direction);
            this.changeScore(-5)
        }
        if (this.puck.position.x - Puck.puckRadius / 2 <= -Track.width / 2) {
            this.puck.position.x = -Track.width / 2 + Puck.puckRadius / 2
            this.direction = Math.abs(this.direction);
            this.changeScore(-5)
        }
    }

    // Проверка столкновений с конусами
    checkConeCollision(cone) {
        if (cone.position.distanceTo(this.puck.position) < Puck.puckRadius + Cone.radius) {
            // Столкновение, останавливаем движение, фиксируем время и показываем кнопку
            this.gameActive = false;
            document.getElementById('overlay').style.display = 'block';
        }
    }

    // Проверка прохождения мимо конуса
    checkConePass(cone) {
        if (!cone.passed && this.puck.position.y > cone.position.y) {
            cone.passed = true;
            this.changeScore(1)
        }
    }
}