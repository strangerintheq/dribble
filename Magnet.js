import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {gameSettings} from "./GameSettings.js";

const height = 0.05;
const r = gameSettings.magnetRadius;
const coneGeometry = new CylinderGeometry(r, r, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#00ff00"});

export class Magnet extends Mesh {


    constructor() {
        super(coneGeometry, coneMaterial);
        this.rotation.x = Math.PI / 2;
    }

    reset(index) {
        const x = Math.sign(Math.random() - 0.5) * gameSettings.trackWidth/2;
        this.position.set(x, index * 2 + 2, 0);
    }

    check(gameState) {
        // if (this.position.distanceTo(gameState.puck.position) < max) {
        //     gameState.gameOver()
        // }
        // if (!this.passed && gameState.puck.position.y > this.position.y) {
        //     this.passed = true;
        //     gameState.changeScore(gameSettings.conePassScore)
        // }
    }
}