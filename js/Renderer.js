import {
    WebGLRenderer,
    PerspectiveCamera,
} from "https://unpkg.com/three@0.121.1/build/three.module.js";

export class Renderer {

    camera;
    renderer;

    constructor() {
        const renderer = new WebGLRenderer({
            antialias: true
        });
        document.body.appendChild(renderer.domElement);
        this.renderer = renderer;

        const camera = new PerspectiveCamera();
        camera.position.set(0, -5, 3); // Позиция камеры по умолчанию в начале сцены
        this.camera = camera;
    }

    resize() {
        let renderer = this.renderer, camera = this.camera;
        if (renderer.width !== innerWidth || renderer.height !== innerHeight) {
            renderer.setSize(innerWidth, innerHeight);
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
        }
    }

    render(scene) {
        this.renderer.render(scene, this.camera);
    }

    moveCamera(pos) {
        this.camera.position.y = pos.y - 4; // Позиция камеры следует за шайбой по оси Y с наклоном в двое меньше
        this.camera.lookAt(pos.x,pos.y,pos.z); // Камера смотрит на шайбу без изменения позиции по X
    }
}