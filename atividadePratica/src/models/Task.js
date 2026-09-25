export class Task {

    #title;
    #description;
    #category;
    #priority;

    constructor(
        title,
        description,
        category,
        priority
    ) {

        this.setTitle(title);
        this.setDescription(description);
        this.setCategory(category);
        this.setPriority(priority);
    }

    setTitle(title) {

        if (!title || title.trim() === '') {
            throw new Error(
                'Informe o título da tarefa'
            );
        }

        this.#title = title.trim();
    }

    setDescription(description) {

        this.#description =
            description || '';
    }

    setCategory(category) {

        if (!category || category.trim() === '') {
            throw new Error(
                'Informe a categoria'
            );
        }

        this.#category =
            category.trim();
    }

    setPriority(priority) {

        if (
            priority !== 'low' &&
            priority !== 'medium' &&
            priority !== 'high'
        ) {
            throw new Error(
                'Informe a prioridade.'
            );
        }

        this.#priority = priority;
    }
    getTitle() {
        return this.#title;
    }
    getDescription() {
        return this.#description;
    }
    getCategory() {
        return this.#category;
    }
    getPriority() {
        return this.#priority;
    }
}