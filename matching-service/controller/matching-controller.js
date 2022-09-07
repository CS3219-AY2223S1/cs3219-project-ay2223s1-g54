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
    const first_valid_entry = { ...valid_entries[0].dataValues };
    valid_entries[0].destroy();

    const user1_socket_id = first_valid_entry['socket_id'];
    const user2_socket_id = socket_id;
    console.log(user1_socket_id);
    console.log(user2_socket_id);

    // create socket room
    const user1_socket = io.get().sockets.sockets.get(user1_socket_id);
    const user2_socket = io.get().sockets.sockets.get(user2_socket_id);
    const room_id = user1_socket_id + user2_socket_id;
    
    // ensure both users socket can be communicated by server socket
    if (!user1_socket || !user2_socket) {
        io.to(user1_socket).to(user2_socket).emit('matchFailure');
        return res.status(200).json({message: 'not ok!'});
    }
    
    user1_socket.join(room_id);
    user2_socket.join(room_id);
    
    io.to(user1_socket).to(user2_socket).emit('matchSuccess', { room_id });
    return res.status(200).json({message: 'ok'});
}
