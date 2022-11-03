import { ProgressAlgorithmType } from "./progress-algorithm-type";
import { TimeProgress } from "./time-progress";

export abstract class BookProgress<T = number | TimeProgress> {
    private _done!: T;

    public get done(): T {
        return this._done;
    }

    public set done(v: T) {
        this._done = v;
    }

    private _total!: T;

    public get total(): T {
        return this._total;
    }

    public set total(v: T) {
        this._total = v;
    }

    private _progressType = ProgressAlgorithmType.Done;

    public get progressType(): ProgressAlgorithmType {
        return this._progressType;
    }

    public set progressType(v: ProgressAlgorithmType) {
        this._progressType = v;
    }

    public get progressPercent(): number {
        if (this.totalNumeric === 0) {
            return 0;
        }

        return Math.floor((this.doneNumeric / this.totalNumeric) * 100);
    }

    public get doneNumeric(): number {
        if (this._total == null || this._done == null) {
            return null!;
        }

        const doneNumeric = this.convertToNumber(this._done);

        if (this.progressType === ProgressAlgorithmType.Left) {
            return this.totalNumeric - doneNumeric;
        } else {
            return doneNumeric;
        }
    }

    public set doneNumeric(v: number) {
        if (this.progressType === ProgressAlgorithmType.Left) {
            const doneNumeric = this.totalNumeric - v;
            this._done = this.convertFromNumber(doneNumeric);
        } else {
            this._done = this.convertFromNumber(v);
        }
    }

    public get totalNumeric(): number {
        return this.convertToNumber(this._total);
    }

    public get doneUnits(): number {
        return this.convertToNumber(this._done);
    }

    public set doneUnits(v: number) {
        this._done = this.convertFromNumber(v);
    }

    public get totalUnits(): number {
        return this.convertToNumber(this._total);
    }

    public set totalUnits(v: number) {
        this._total = this.convertFromNumber(v);
    }

    public abstract convertToNumber(value: T): number;

    public abstract convertFromNumber(value: number): T;
}
