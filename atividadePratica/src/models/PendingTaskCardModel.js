import { TaskCardModel } from './TaskCardModel';

export class PendingTaskCardModel
    extends TaskCardModel {

    constructor(
        title,
        pendingCount
    ) {

        super(title);

        this.pendingCount =
            pendingCount;
    }

    getIcon() {
        return '🕓';
    }

    getFormattedValue() {

        return `${this.pendingCount} pendências`;
    }
}