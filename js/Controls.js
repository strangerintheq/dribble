export class Controls {

    constructor() {

        addEventListener("pointerdown", e0 => {
            const listener = e1 => {
                let dx = e1.clientX - e0.clientX;
                if (Math.abs(dx) > 50) {
                    this.onSwipe(Math.sign(dx));
                    removeEventListener("pointermove", listener);
                }
            };
            addEventListener("pointermove", listener);
        });

        addEventListener("click", () => this.onClick());

    }

    onSwipe(dir) {
    }

    onClick() {
    }
}