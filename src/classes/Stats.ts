export class Stats {
    private readonly countElement: HTMLElement;
    private readonly areaElement: HTMLElement;
    private lastCount = -1;
    private lastArea = -1; // minus can never be initially true

    constructor(countElement: HTMLElement, areaElement: HTMLElement) {
        this.countElement = countElement;
        this.areaElement = areaElement;
    }

    update(count: number, area: number): void {
        const roundedArea = Math.round(area);

        if (count !== this.lastCount) {
            this.countElement.textContent = String(count);
            this.lastCount = count;
        }
        if (roundedArea !== this.lastArea) {
            this.areaElement.textContent = String(roundedArea);
            this.lastArea = roundedArea;
        }
    }
}