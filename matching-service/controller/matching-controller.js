import {
    ormCreateMatchEntry as _createMatchEntry,
    ormListValidMatchEntriesByDifficulty as _listValidMatchEntriesByDifficulty
 } from '../model/match-entry-orm.js'

export async function createMatchEntry(req, res) {
    const { email, difficulty, start_time } = req.body;

    const resp1 = await _listValidMatchEntriesByDifficulty(difficulty, start_time);

    const resp2 = await _createMatchEntry(email, difficulty, start_time);

    return res.status(200).json({message: 'ok'});
}
