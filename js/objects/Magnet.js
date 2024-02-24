import {
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    CanvasTexture
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

import {settings} from "../Settings.js";

const r = settings.magnetRadius;
const planeGeometry = new PlaneGeometry(r*2, r*2);
const coneMaterial = new MeshBasicMaterial({
    transparent: true,
    map: new CanvasTexture(document.createElement("canvas"))
});
const t = {value: 0};
coneMaterial.onBeforeCompile = (m) => {
    m.uniforms.t = t;
    m.fragmentShader = m.fragmentShader
        .split("#include <common>")
        .join(`#include <common>
            uniform float t;
        `)
        .split("#include <color_fragment>")
        .join(`
            diffuseColor.rgba = vec4(sin(t*0.03+44.*length(vUv-0.5)));
            diffuseColor.a *= smoothstep(0.1,0., length(vUv-0.5)-0.4);
            diffuseColor.a *= smoothstep(0.,0.01, vUv.x-0.44);
        `)

    console.log(m.fragmentShader)
}
const max = settings.puckRadius + r;

export class Magnet extends Mesh {

    index;
    activated;

    constructor(index) {
        super(planeGeometry, coneMaterial);
        this.index = index;
        // this.rotation.x = Math.PI / 2;

    }

    reset() {
        this.activated = false;
        const x = Math.sign(Math.random() - 0.5) * (settings.trackWidth/2-settings.puckRadius);
        this.position.set(x, this.index * 2 + 2, 0.01);
        this.rotation.z = x>0 ? Math.PI : 0
    }

    tick(state, dt) {
        t.value += dt;

        if (!this.activated && this.position.distanceTo(state.puckPosition) < max) {
            state.gameOver();
            this.activated = true;
            state.puckSpeed = 0
        }

        if (this.activated) {
            let dx = state.puckPosition.x - this.position.x;
            let dy = state.puckPosition.y - this.position.y;
            let length = Math.hypot(dy, dx)
            let angle = Math.atan2(dy, dx);
            state.puckPosition.x = this.position.x + Math.cos(angle)*length*0.95
            state.puckPosition.y = this.position.y + Math.sin(angle)*length*0.95
        }

    }
}