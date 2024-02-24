import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {settings} from "../Settings.js";

const height = 0.3;
const coneGeometry = new CylinderGeometry(0, settings.coneRadius, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#ff0000"});
const maxSq = Math.pow(settings.puckRadius + settings.coneRadius,2);

export class Cone extends Mesh {

    passed;
    direction = {x: 0, y: 0};
    index;

    constructor(index) {
        super(coneGeometry, coneMaterial);
        this.index = index;
        this.rotation.x = Math.PI / 2;
    }

    reset() {
        this.passed = false;
        const x = (Math.random() - 0.5) * (settings.trackWidth - settings.coneRadius * 2);
        this.position.set(x, this.index * 2 + 2, height / 2);
        this.direction = {x: 0, y: 0}
    }

    tick(gameState, dt) {

        this.direction.y *= 0.95;
        this.direction.x *= 0.95;
        this.position.y += dt * this.direction.y;
        this.position.x += dt * this.direction.x;

        if (!gameState.gameActive)
            return

        const p1 = gameState.puckPosition;
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
            gameState.changeScore(settings.conePassScore)
        }
    }

}