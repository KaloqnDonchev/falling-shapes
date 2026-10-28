import { Graphics } from 'pixi.js';

export class Shape {
    public readonly view: Graphics;

    constructor(x: number, y: number, radius = 30, color = 0xff0000) {
        this.view = new Graphics().circle(0, 0, radius).fill(color);
        this.view.position.set(x, y);
    }

    update(deltaMS: number, gravity: number): void {
        this.view.y += gravity * (deltaMS / 1000);
    }

    get y(): number {
        return this.view.y;
    }

    destroy(): void {
        this.view.destroy();
    }
}