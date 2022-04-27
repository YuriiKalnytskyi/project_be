module.exports = (sequelize, type) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: type.STRING,
                allowNull: false,
            },

            firstname: {
                type: type.STRING,
                allowNull: false,
            },
            age: {
                type: type.INTEGER,
                allowNull: false,
            },
            gender: {
                type: type.STRING,
                allowNull: false,
            },
            avatar: {
                type: type.STRING,
                allowNull: false,
                defaultValue: '',
            },
            phone: {
                type: type.INTEGER,
            },
            email: {
                type: type.INTEGER,
                allowNull: false,

            },
            password: {
                type: type.INTEGER,
                allowNull: false,
            },
            gallery: [{
                type: type.INTEGER,
            }],
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};
