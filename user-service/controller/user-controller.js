import { ormCreateUser as _createUser } from '../model/user-orm.js'
import UserModel from '../model/user-model.js';
import bcrypt from 'bcryptjs';

export async function createUser(req, res) {
    try {
        const { email, username, password , confirmPassword} = req.body;
        if (email && username && password && confirmPassword) {

            if (password !== confirmPassword) {
                return res.status(400).json({message: 'The passwords you entered do not match!'}); 
            }
            const resp = await _createUser(email, username, password);

            if (resp.err && resp.err.code === 11000) {
                console.log(`Error Username/Email already exists`);
                return res.status(409).json({message: 'User already exists!'});
            } else if  (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Email, Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}


export async function loginUser(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and/or Password are missing!'});
        }
        UserModel.find({email: email}).exec().then(
            result => {

                // Account doesn't exist
                if (result.length < 1) {
                    return res.status(401).json({message: 'Email not exist'})
                }
                console.log(result)
                // Todo to verify hashes
                bcrypt.compare(password, result[0]['password'], (err, result) => {
                    if (err) {
                        return {err}
                    }

                    if (!result) {
                        console.log("Invalid password");
                        return res.status(401).json({message: 'Incorrect Username and/or Password'})
                    }

                    console.log("Password matched");
                    return res.status(200).json({message: 'Logged in user successfully!'})

                })
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Authentication failure'})
    }
};
