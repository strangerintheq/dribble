import {
    Mesh,
    BoxGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";
import {gameSettings} from "./GameSettings.js";

const width = gameSettings.gateWidth;
const height = gameSettings.gateHeight;

const coneGeometry = new BoxGeometry(width, 0.05, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#0000ff"});

export class Gate extends Mesh {

    static width = width;

    passed;
    index;

    constructor(index) {
        super(coneGeometry, coneMaterial);
        this.index = index;
    }

    reset(index) {
        this.passed = false;
        this.position.set(
            (Math.random() - 0.5) * (gameSettings.trackWidth - width),
            index * 2 + 2.5,
            0
        );
    }

    check(gameState) {
        if (!this.passed && this.position.distanceTo(gameState.puck.position) < gameSettings.puckRadius + width / 2) {
            gameState.changeScore(10);
            this.passed = true;
            this.position.z = -0.1
        }
    }
}