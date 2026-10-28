import type { Graphics } from "pixi.js";

export interface Geometry {
    draw(g: Graphics, color: number): void;
    area(): number;
}