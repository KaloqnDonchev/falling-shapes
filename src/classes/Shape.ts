import { Graphics } from 'pixi.js';
import type { Geometry } from '../interfaces/Geometry';

export class Shape {
    public readonly view: Graphics;
    public readonly area: number;

    constructor(x: number, y: number, geometry: Geometry, color: number) {
        this.view = new Graphics();
        geometry.draw(this.view, color);
        this.view.position.set(x, y);
        this.area = geometry.area();
    }

    update(deltaMS: number, gravity: number): void {
        this.view.y += gravity * (deltaMS / 1000);
    }
}