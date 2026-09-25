export class User {

    #id;
    #email;
    #password;

    constructor(
        id,
        name,
        email,
        password
    ) {

        this.#id = id;

        this.name =
            name || 'Estudante';

        this.setEmail(email);
        this.setPassword(password);
    }

    setEmail(email) {

        if (!email) {
            throw new Error(
                'Preencha o e-mail.'
            );
        }

        if (!email.includes('@')) {
            throw new Error(
                'Digite um e-mail válido.'
            );
        }

        this.#email = email;
    }

    setPassword(password) {

        if (!password) {
            throw new Error(
                'Preencha a senha.'
            );
        }

        this.#password = password;
    }

    getId() {
        return this.#id;
    }

    getEmail() {
        return this.#email;
    }

    getGreeting() {
        return `Olá, ${this.name}!`;
    }

    toObject() {

        return {
            id: this.#id,
            name: this.name,
            email: this.#email
        };
    }
}