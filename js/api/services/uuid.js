import { v4 as uuidv4 } from 'uuid';

function uuid() {
    const uuid = uuidv4();
    return uuid;
};

export default uuid;