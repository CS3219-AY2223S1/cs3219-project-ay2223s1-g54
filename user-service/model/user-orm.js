import { createUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, username, password) {

    try {
        const newUser = await createUser({email, username, password});
        const resultSave = await newUser.save();
    } catch (err) {
        // console.log(err)
        return {err};
    }

    return true;
}

