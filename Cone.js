import {
    Mesh,
    CylinderGeometry,
    MeshBasicMaterial
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

const radiusTop = 0.05;
const radiusBottom = 0.2;
const height = 0.3;

const coneGeometry = new CylinderGeometry(radiusTop, radiusBottom, height, 32);
const coneMaterial = new MeshBasicMaterial({color: "#ff0000"});

export class Cone extends Mesh {

    static radius = radiusBottom;

    passed;

    constructor() {
        super(coneGeometry, coneMaterial);
        this.rotation.x = Math.PI / 2;
    }

    reset(index, width) {
        this.passed = false;
        this.position.set(
            (Math.random() - 0.5) * (width - Cone.radius * 2),
            index * 2 + 2,
            height / 2
        );
    }
}