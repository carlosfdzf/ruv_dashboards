const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


async function crearusuario() {
    const newUser = {
        username: 'admin',
        password: 'admin',
        name: 'admin',
        surname: 'admin',
        email: 'admin@admin.com',
        phone: '55555555',
        level_users: 5,
        type: 'admin'
    };
    newUser.password = await helpers.encryptPassword(newUser.password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
};

crearusuario();