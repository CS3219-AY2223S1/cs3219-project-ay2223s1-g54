import MatchEntryModel from "./match-entry-model.js";

//Set up sqlite driver
import { Op, Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:");

const matchEntryModel = await MatchEntryModel(sequelize);
await matchEntryModel.sync({ force: true });

export async function createMatchEntry(params) {
  return matchEntryModel.create(params);
}

export async function listValidMatchEntriesByDifficulty(params) {
  const { difficulty, start_time } = params;
  return matchEntryModel.findAll({
    where: {
      difficulty: {
        [Op.eq]: difficulty,
      },
      start_time: {
        [Op.gte]: new Date(start_time - 30000).getTime(),
      },
    },
  });
}
