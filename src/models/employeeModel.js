require('dotenv').config();
const bcrypt = require('bcrypt');
/**
 *  exports
 */
module.exports = (db) => {
    const { DataTypes, INTEGER } = require('sequelize');
    const employee = db.define('employee', {
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isNew: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    });
    /**
     * belongsTo
     */
    employee.belongsTo(db.role, { foreignKey: 'roleId' });
    /**
     * init
     */
    employee.init = async () => {
        let attributes = ['id'];
        let role = await db.role.findOne({
            raw: true,
            where: {
                name: 'admin',
            },
            attributes,
        });
        let passwordHashed = bcrypt.hashSync('password', 10);
        let [firstemployee, created] = await db.employee.findOrCreate({
            where: {
                id: 1001,
            },
            defaults: {
                id: 1001,
                name: 'Huỳnh Văn Thái',
                email: 'hvthai_admin@domain',
                phone: '0335990263',
                password: passwordHashed,
                roleId: role.id,
            },
        });
    };
    /**
     * return
     */
    return employee;
};
