import {
    ormCreateMatchEntry as _createMatchEntry,
    ormListValidMatchEntriesByDifficulty as _listValidMatchEntriesByDifficulty
 } from '../model/match-entry-orm.js'
 
export async function createMatchEntry(req, res) {
    const { email, difficulty, start_time } = req.body;

    const valid_entries = await _listValidMatchEntriesByDifficulty(difficulty, start_time);
    if (valid_entries.length == 0) {
        const create_response = await _createMatchEntry(email, difficulty, start_time);
        if (create_response) {
            return res.status(200).json({message: 'ok'});        
        }
        return res.status(200).json({message: 'not ok!'});
    }

    // delete entry
    console.log('Found match.')
    console.log(valid_entries[0])

    const user1_email = valid_entries[0].dataValues['email'];
    const user2_email = email;



    console.log(user1_email);
    console.log(user2_email);

    valid_entries[0].destroy();
    
    return res.status(200).json({message: 'ok'});
}
