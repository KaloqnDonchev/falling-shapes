import type { Graphics } from "pixi.js";
import type { Geometry } from "../interfaces/Geometry";

export class PolygonGeometry implements Geometry {
    private readonly points: number[];

    constructor(points: number[]) {
        this.points = points;
    }

    draw(g: Graphics, color: number): void {
        g.poly(this.points).fill(color);
    }

    area(): number {
        const p = this.points;
        const n = p.length / 2;
        let sum = 0;
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            sum += p[i * 2] * p[j * 2 + 1] - p[j * 2] * p[i * 2 + 1];
        }
        return Math.abs(sum) / 2;
    }
}