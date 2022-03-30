module.exports = (db) => {
    /**
     * variables
     */
    const { DataTypes } = require('sequelize');
    const role = db.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            default: 'Mô tả về quyền hạn còn trống',
        },
    });
    /**
     * init
     */
    role.init = async () => {
        let [newRole, created] = await role.findOrCreate({
            where: {
                name: 'admin',
            },
            defaults: {
                name: 'admin',
                description: 'this is description for admin role',
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        });
    };
    /**
     * return
     */
    return role;
};
