import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {gameSettings} from "./GameSettings.js";

const height = 0.3;
const coneGeometry = new CylinderGeometry(0, gameSettings.coneRadius, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#ff0000"});
const max = gameSettings.puckRadius + gameSettings.coneRadius;

export class Cone extends Mesh {

    passed;

    constructor() {
        super(coneGeometry, coneMaterial);
        this.rotation.x = Math.PI / 2;
    }

    reset(index) {
        this.passed = false;
        const x = (Math.random() - 0.5) * (gameSettings.trackWidth - gameSettings.coneRadius * 2);
        this.position.set(x, index * 2 + 2, height / 2);
    }

    check(gameState) {
        if (this.position.distanceTo(gameState.puck.position) < max) {
            gameState.gameOver()
        }
        if (!this.passed && gameState.puck.position.y > this.position.y) {
            this.passed = true;
            gameState.changeScore(gameSettings.conePassScore)
        }
    }
}