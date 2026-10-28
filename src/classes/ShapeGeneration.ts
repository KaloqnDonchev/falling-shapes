import { hslToHex, random } from "../utils";
import { MIN_SHAPE_SIZE, MAX_SHAPE_SIZE, CANVAS_WIDTH } from '../constants';
import { Shape } from "./Shape";
import type { Geometry } from "../interfaces/Geometry";
import type { ShapeType } from "../types";
import { PolygonGeometry } from "./PolygonGeometry";
import { CircleGeometry } from "./CircleGeometry";
import { EllipseGeometry } from "./EllipseGeometry";

const SHAPE_TYPES: ShapeType[] = [ 'triangle', 'square', 'pentagon', 'hexagon', 'circle', 'ellipse', 'star'];

export class ShapeGeneration {
    private readonly canvasWidth: number;

    constructor() {
        this.canvasWidth = CANVAS_WIDTH;
    }

    createRandom(): Shape {
        const x = random(MAX_SHAPE_SIZE, this.canvasWidth - MAX_SHAPE_SIZE);
        const y = -MAX_SHAPE_SIZE;
        return new Shape(x, y, this.createGeometry(this.randomType()), this.randomColor());
    }

    private randomType(): ShapeType {
        return SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
    }

    private randomColor(): number {
        return hslToHex(random(0, 360), 0.8, 0.55);
    }

    private createGeometry(shapeType: ShapeType): Geometry {
        const size = random(MIN_SHAPE_SIZE, MAX_SHAPE_SIZE);

        switch (shapeType) {
            case 'triangle':
                return new PolygonGeometry(createPolygon(3, size));
            case 'square':
                return new PolygonGeometry(createPolygon(4, size));
            case 'pentagon':
                return new PolygonGeometry(createPolygon(5, size));
            case 'hexagon':
                return new PolygonGeometry(createPolygon(6, size));
            case 'circle':
                return new CircleGeometry(size);
            case 'ellipse':
                return new EllipseGeometry(size, size * 0.6);
            case 'star':
                return new PolygonGeometry(createStar(5, size, size * 0.45));
        }
    }
}

export function createPolygon(sides: number, radius: number): number[] {
    const points: number[] = [];
    for (let i = 0; i < sides; i++) {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
        points.push(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    return points;
}

export function createStar(spikes: number, outerRadius: number, innerRadius: number): number[] {
    const points: number[] = [];
    const count = spikes * 2;
    for (let i = 0; i < count; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / count;
        points.push(radius * Math.cos(angle), radius * Math.sin(angle));
    }
    return points;
}