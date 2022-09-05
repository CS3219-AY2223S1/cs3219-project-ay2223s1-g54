import { ormCreateUser as _createUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { email, username, password , confirmPassword} = req.body;
        if (email && username && password && confirmPassword) {

            if (password != confirmPassword) {
                return res.status(400).json({message: 'The passwords you entered do not match!'}); 
            }
            const resp = await _createUser(email, username, password);
            if (resp.err && resp.err.code == "11000") {
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
