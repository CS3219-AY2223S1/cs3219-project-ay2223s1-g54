import { 
    ormCreateUser as _createUser,
    ormCheckUserExists as _checkUserExists, 
    ormLogInUser as _logUserIn,      
} from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password , confirmPassword, email } = req.body;

        if (!username || !password || !confirmPassword || !email) {
            console.log('One of the required fields is missing!');
            return res.status(400).json({message: 'One of the required fields is missing!'});
        }

        if (password !== confirmPassword) {
            return res.status(400).json({message: 'The passwords you entered do not match!'});
        }

        // prevent duplicate username creation in controller layer
        if (await _checkUserExists(username)) {
            console.log(`The username ${username} already exists!`);
            return res.status(409).json({message: `The username already exists!`});
        }

        const newUser = await _createUser(email, username, password);
        if (newUser.username !== username) {
            return res.status(400).json({message: 'Could not create a new user'})
        } else {
            console.log(`Created new user ${newUser.username} successfully!`)
            return res.status(201).json({message: `Created new user ${newUser.username} successfully!`});
        }

    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}


export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            
            const resp = await _logUserIn(email, password);

            if (resp) {
                return res.status(200).json({message: 'Logged in user successfully!'})
            } else {
                return res.status(401).json({message: 'Incorrect Username and/or Password'})
            }

        } else {
            return res.status(400).json({message: 'Email and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging in existing user!'})
    }
}
