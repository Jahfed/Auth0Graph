class Uuid {
    constructor() {
        this.id = () => {
            let date = new Date().getTime();
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const random = (date + Math.random() * 16) % 16 | 0;
                date = Math.floor(date / 16);
                return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
            })
            return uuid
        }
    }
}

export { Uuid };