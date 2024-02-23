import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

export class Puck extends Mesh {

    static puckRadius = 0.1

    constructor() {
        super(new CylinderGeometry(Puck.puckRadius, Puck.puckRadius, 0.1, 32), new MeshBasicMaterial({
            color: "#000000"
        }));
        this.rotation.x = Math.PI / 2;
        this.reset();
    }

    reset() {
        this.position.set(0,0,0)
    }
}