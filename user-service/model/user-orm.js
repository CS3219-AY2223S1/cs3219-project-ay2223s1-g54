import { createUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, username, password) {
    // try {
    //     const newUser = await createUser({email, username, password});
    //     newUser.save(
    //         (err) => console.log('+++++++++++++++++++++++') + console.log(err));
    //     return true;
    // } catch (err) {
    //     console.log('ERROR: Could not create new user');
    //     return { err };
    // }
    try {
        const newUser = await createUser({email, username, password});
        const result = await newUser.save();
    } catch (err) {
        console.log("+++" + err);
        throw err;
    }

    return true;
}

