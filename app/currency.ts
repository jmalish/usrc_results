export class Currency {
    constructor(
        public id: number,
        public sessionId: number,
        public driverId: number,
        public reason: string,
        public currencyAdjustment: number
    ) {}
}