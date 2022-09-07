import io from '../socket.js'
import {
    ormCreateMatchEntry as _createMatchEntry,
    ormListValidMatchEntriesByDifficulty as _listValidMatchEntriesByDifficulty
 } from '../model/match-entry-orm.js'
 
export async function createMatchEntry(req, res) {
    const { email, difficulty, start_time, socket_id } = req.body;

    const valid_entries = await _listValidMatchEntriesByDifficulty(difficulty, start_time);
    if (valid_entries.length == 0) {
        const create_response = await _createMatchEntry(email, difficulty, start_time, socket_id);
        if (create_response) {
            return res.status(200).json({message: 'ok'});        
        }
        return res.status(200).json({message: 'not ok!'});
    }

    // delete entry
    console.log('Found match.')
    console.log(valid_entries[0])

    const user1_socket_id = valid_entries[0].dataValues['socket_id'];
    const user2_socket_id = socket_id;
    console.log(user1_socket_id);
    console.log(user2_socket_id);

    // create socket room
    

    valid_entries[0].destroy();
    return res.status(200).json({message: 'ok'});
}
