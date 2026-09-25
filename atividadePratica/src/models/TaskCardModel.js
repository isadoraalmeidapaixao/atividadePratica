export class TaskCardModel {

    constructor(title) {
        if (new.target === TaskCardModel) {
            throw new Error(
                'TaskCardModel é uma classe base.'
            );
        }
        this.title = title;
    }
    getIcon() {
        throw new Error(
            'getIcon() deve ser sobrescrito.'
        );
    }
    getFormattedValue() {
        throw new Error(
            'getFormattedValue() deve ser sobrescrito.'
        );
    }
}