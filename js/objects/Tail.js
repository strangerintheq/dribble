import {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    Object3D,
    CanvasTexture
} from "https://unpkg.com/three@0.121.1/build/three.module.js";
import {settings} from "../Settings.js";

let planeGeometry = new PlaneGeometry(.1, .1, 1, 1);
let meshBasicMaterial = new MeshBasicMaterial({
    color: "#000000",
    map: new CanvasTexture(document.createElement("canvas"))
});
meshBasicMaterial.onBeforeCompile = (m) => {
    m.fragmentShader = m.fragmentShader
        .split("#include <common>")
        .join(`#include <common>
            uniform float t;
        `)
        .split("#include <color_fragment>")
        .join(`
            float cc = smoothstep(0.400,0.41,length(vUv-0.5));
            diffuseColor.rgb = vec3(cc);
     
        `)
}

export class Tail extends Object3D {

    index = 1;

    constructor() {
        super();
        for (let i = 0; i < 10; i++)
            this.add(new Mesh(planeGeometry, meshBasicMaterial))

    }

    tick(state, dt) {
        let p0 = state.puckPosition;
        let prev = (this.index + this.children.length - 1)%this.children.length
        if (this.children[prev].position.distanceTo(p0) < settings.puckRadius * 2)
            return

        this.children[this.index].position.copy(p0);
        this.children[this.index].position.z = Math.random()*0.05
        this.index = (this.index + 1) % this.children.length;

    }

    reset() {
        this.children.forEach(c => c.position.set(0,0,Math.random()*0.05))
    }
}