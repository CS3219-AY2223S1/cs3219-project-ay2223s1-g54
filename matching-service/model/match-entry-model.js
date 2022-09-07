import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const MatchEntry = sequelize.define('MatchEntry', {
        email: DataTypes.STRING,
        difficulty: DataTypes.INTEGER,
        start_time: DataTypes.INTEGER // epoch time
    }, { freezeTableName: true });
    return MatchEntry;
}
