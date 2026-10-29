import { Container } from 'pixi.js';
import type { Shape } from './Shape';
import type { ShapeGeneration } from './ShapeGeneration';
import { MAX_SHAPE_SIZE } from '../constants';

export class Spawner {
    private readonly shapes: Shape[] = [];
    private readonly layer: Container;
    private readonly shapeGeneration: ShapeGeneration;
    private elapsedMS = 0;
    private readonly spawnIntervalMS = 1000; // 1 shape per second

    constructor(layer: Container, shapeGeneration: ShapeGeneration) {
        this.layer = layer;
        this.shapeGeneration = shapeGeneration;        
    }

    spawnAt(x: number, y: number): void {
        this.add(this.shapeGeneration.createAt(x, y));
    }

    update(deltaMS: number, gravity: number, width: number, height: number): void {
        this.elapsedMS += deltaMS;
        while (this.elapsedMS >= this.spawnIntervalMS) {
            this.elapsedMS -= this.spawnIntervalMS;
            this.add(this.shapeGeneration.createRandom(width));
        }

        for (let i = this.shapes.length - 1; i >= 0; i--) { // in reverse so that it does not skip forward to next index
            const shape = this.shapes[i];
            shape.update(deltaMS, gravity);
            if (shape.y - MAX_SHAPE_SIZE > height) { // is the shape top edge below canvas
                this.remove(shape);
            }
        }
    }

    private add(shape: Shape): void {
        shape.view.eventMode = 'static';
        shape.view.cursor = 'pointer';
        shape.view.on('pointerdown', (event) => {
            event.stopPropagation(); // only removes the clicked one, stopping previous events
            this.remove(shape);
        });

        this.layer.addChild(shape.view);
        this.shapes.push(shape);
    }

    private remove(shape: Shape): void {
        const index = this.shapes.indexOf(shape);
        if (index === -1) return;

        this.shapes.splice(index, 1);
        shape.destroy(); // frees memory
    }

    public get count(): number {
        return this.shapes.length;
    }

    get totalArea(): number {
        let sum = 0;
        for (const shape of this.shapes) {
            sum += shape.area;
        }
        return sum;
    }
}