import type { Graphics } from "pixi.js";
import type { Geometry } from "../interfaces/Geometry";

export class CircleGeometry implements Geometry {
    private readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    draw(g: Graphics, color: number): void {
        g.circle(0, 0, this.radius).fill(color);
    }

    area(): number {
        return Math.PI * this.radius ** 2;
    }
}