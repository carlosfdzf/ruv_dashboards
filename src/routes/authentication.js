const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, alredyLoggedIn, isAdminLoggedIn } = require('../lib/auth');
const pool = require('../database');


router.get('/signup', isAdminLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isAdminLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/useradmin', isAdminLoggedIn, async(req, res) => {
    const usuarios = await pool.query('select * from users');
    res.render('auth/useradmin', { usuarios });
});

router.get('/deleteuser/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
    await req.flash('success', 'links Removed successfully');
    res.redirect('/useradmin');
});

router.post('/actualizar/:id',isAdminLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const id_user = req.body.usuario;
    console.log('actualizando')
    console.log(id,' ',id_user)
    await pool.query('INSERT INTO dash_user (id_user,id_dashboard) values (?,?)',[id,id_user]);
    await req.flash('success', 'access Updated successfully');
    let url = '/edituser/'+id
    res.redirect(url);
});

router.post('/eliminar/:id',isAdminLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const id_user = req.body.dashboard;
    console.log('actualizando')
    console.log(id,' ',id_user)
    await pool.query('DELETE FROM dash_user where id_user=? and id_dashboard=?',[id,id_user]);
    await req.flash('success', 'access Updated successfully');
    let url = '/edituser/'+id
    res.redirect(url);
});



router.get('/edituser/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    const users = await pool.query('SELECT * FROM users WHERE id_user=?', [id]);
    const dashboard = await pool.query('SELECT * FROM dashboards');
    const dash_user = await pool.query('SELECT * from dash_user inner join dashboards on dashboards.id_dashboard = dash_user.id_dashboard where id_user=?', [id]);

    let user_exists = [];
    let user_exists2 = [];
    let indices = [];
    let idx;

    for (var i = 0; i < dash_user.length; i++) {
        user_exists2[i] = dash_user[i].id_dashboard
    }
    for (var i = 0; i < dashboard.length; i++) {
        user_exists[i] = dashboard[i].id_dashboard
    }

    for (var i = 0; i < user_exists2.length; i++) {
        idx = user_exists.indexOf(user_exists2[i]);
        for (var j = 0; j < user_exists.length; j++) {
            while (idx != -1) {
                delete dashboard[idx]
                indices.push(idx);
                idx = user_exists.indexOf(user_exists2[j], idx + 1);

            }
        }
    }
    res.render('auth/edituser', { users: users[0], dashboard:dashboard, dash_user:dash_user});
});

router.post('/edituser/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { name, surname, username, level_users, phone, email } = req.body;
    const newLink = {
        name,
        surname,
        username,
        level_users,
        phone,
        email
    };
    await pool.query('UPDATE users set ? WHERE id_user=?', [newLink, id]);
    await req.flash('success', 'links Updated successfully');
    res.redirect('/useradmin');
});


router.get('/signin', alredyLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, async(req, res) => {
    const quitaracceso = { accesso: 0 };
    const usuario = req.user.id_user;
    await pool.query('UPDATE users set ? WHERE id_user = ?', [quitaracceso, req.user.id_user]);
    const links = await pool.query('SELECT * from users where id_user=?', usuario);
    res.render('profile');
});

router.get('/logout', async(req, res) => {
    const quitaracceso = { accesso: 0 };
    const usuario = req.user.id_user
    await pool.query('UPDATE users set ? WHERE id_user = ?', [quitaracceso, req.user.id_user]);
    const links = await pool.query('SELECT * from users where id_user = ?', usuario);
    req.logOut();
    res.redirect('/signin');

});

router.post('/user/search', isLoggedIn, async(req, res) => {
    const { username } = req.body;
    const usuarios = await pool.query('SELECT * from users where name like "%' + username + '%" order by name;');
    res.render('auth/useradmin', { usuarios });
});

router.get('/user/search', isLoggedIn, async(req, res) => {
    res.redirect('/useradmin');
});

module.exports = router;