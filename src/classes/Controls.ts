import type { Settings } from './Settings';

function getElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element #${id} not found`);
    }
    return element;
}

export class Controls {
    private readonly settings: Settings;
    private readonly rateValue: HTMLElement;
    private readonly gravityValue: HTMLElement;

    constructor(settings: Settings) {
        this.settings = settings;
        this.rateValue = getElement('rate-value');
        this.gravityValue = getElement('gravity-value');

        getElement('rate-minus').addEventListener('click', () => this.changeRate(-1));
        getElement('rate-plus').addEventListener('click', () => this.changeRate(1));
        getElement('gravity-minus').addEventListener('click', () => this.changeGravity(-50));
        getElement('gravity-plus').addEventListener('click', () => this.changeGravity(50));

        this.render();
    }

    private changeRate(amount: number): void {
        const next = this.settings.spawnRate + amount;
        this.settings.spawnRate = Math.min(10, Math.max(1, next)); // 10 is max
        this.render();
    }

    private changeGravity(amount: number): void {
        const next = this.settings.gravity + amount;
        this.settings.gravity = Math.min(600, Math.max(50, next)); // 600 is max
        this.render();
    }

    private render(): void {
        this.rateValue.textContent = String(this.settings.spawnRate);
        this.gravityValue.textContent = String(this.settings.gravity);
    }
}