class Uuid {
    constructor() {
    }
    async id() {
        try {
            const uuidUrl = "http://localhost:3000/tools/uuid";
            const response = await fetch(uuidUrl);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error("Failed to fetch UUID");
            }
        } catch (error) {
            throw new Error("Error occurred while fetching UUID: " + error.message);
        }
    }
}

export { Uuid };