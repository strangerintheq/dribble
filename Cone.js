import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {gameSettings} from "./GameSettings.js";

const height = 0.3;
const coneGeometry = new CylinderGeometry(0, gameSettings.coneRadius, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#ff0000"});
const maxSq = Math.pow(gameSettings.puckRadius + gameSettings.coneRadius,2);

export class Cone extends Mesh {

    passed;
    direction = {x: 0, y: 0};

    constructor() {
        super(coneGeometry, coneMaterial);
        this.rotation.x = Math.PI / 2;
    }

    reset(index) {
        this.passed = false;
        const x = (Math.random() - 0.5) * (gameSettings.trackWidth - gameSettings.coneRadius * 2);
        this.position.set(x, index * 2 + 2, height / 2);
        this.direction = {x: 0, y: 0}
    }

    check(gameState) {
        if (!gameState.gameActive)
            return

        const p1 = gameState.puck.position;
        const p2 = this.position;
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        if (dx * dx + dy * dy < maxSq) {
            gameState.gameOver();
            const a = Math.atan2(dy, dx);
            this.direction.y = Math.sin(a);
            this.direction.x = Math.cos(a);
        }
        if (!this.passed && p1.y > p2.y) {
            this.passed = true;
            gameState.changeScore(gameSettings.conePassScore)
        }
    }

    animate(dt) {
        this.direction.y *= 0.95;
        this.direction.x *= 0.95;
        this.position.y += dt * this.direction.y
        this.position.x += dt * this.direction.x
    }
}