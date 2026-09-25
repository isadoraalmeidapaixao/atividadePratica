import { TaskCardModel } from './TaskCardModel';

export class CompletedTaskCardModel
    extends TaskCardModel {

    constructor(
        title,
        total,
        completed
    ) {
        super(title);

        this.total = total;
        this.completed = completed;
    }

    getIcon() {
        return '✅';
    }

    getFormattedValue() {

        if (this.total === 0) {
            return '0% concluído';
        }

        const percentage =
            Math.round(
                (this.completed /
                    this.total) * 100
            );

        return `${percentage}% concluído`;
    }
}