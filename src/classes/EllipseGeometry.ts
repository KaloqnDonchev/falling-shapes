import type { Graphics } from "pixi.js";
import type { Geometry } from "../interfaces/Geometry";

export class EllipseGeometry implements Geometry {
    private readonly rx: number;
    private readonly ry: number;

    constructor(rx: number, ry: number) {
        this.rx = rx;
        this.ry = ry;
    }

    draw(g: Graphics, color: number): void {
        g.ellipse(0, 0, this.rx, this.ry).fill(color);
    }

    area(): number {
        return Math.PI * this.rx * this.ry;
    }
}