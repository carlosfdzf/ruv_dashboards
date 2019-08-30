const express = require('express');
const router = express.Router();

//enlace a la base de datos
const pool = require('../database');

//proteccion de rutas 
const { isLoggedIn, isAdminLoggedIn } = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isAdminLoggedIn, async(req, res) => {
    const { title, url, description, level_dashboards } = req.body;
    const newLink = {
        title,
        url,
        description,
        level_dashboards,
    };
    await pool.query('INSERT INTO dashboards set ?', [newLink]);
    await req.flash('success', 'Link agregado correctamente');
    res.redirect('/links');
});


router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('select * from dash_user inner join users on users.id_user = dash_user.id_user inner join dashboards on dashboards.id_dashboard = dash_user.id_dashboard where users.id_user = ? ORDER by title', [req.user.id_user]);
    res.render('links/list', { links });
});

router.get('/dashboardsadmin', isAdminLoggedIn, async(req, res) => {

    const links = await pool.query('select * from dashboards');
    res.render('links/dashboardsadmin', { links });
});

router.get('/delete/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    console.log(req.params)
    await pool.query('DELETE FROM dashboards WHERE id_dashboard = ?', [id]);
    await req.flash('success', 'links Removed successfully');
    res.redirect('/links');
});



router.post('/search', isLoggedIn, async(req, res) => {
    const { username } = req.body;
    const busqueda = "%" + username + "%";
    const links = await pool.query('SELECT * from dashboards where dashboards.title like ? order by title;', busqueda);
    res.render('links/list', { links });
});

router.post('/tablero', isLoggedIn, async(req, res) => {
    const { url } = req.body;
    const newUrl = url.slice(0, -1);
    const links = await pool.query('SELECT * from dashboards where dashboards.title = ? order by title;', newUrl);
    const darAcceso = { accesso: 1 };
    await pool.query('UPDATE users set ? WHERE id_user=?', [darAcceso, req.user.id_user]);
    res.render('tableros/tableros', { link: links[0] });
});

router.get('/tablero/:title', isLoggedIn, async(req, res) => {
    const { title } = req.params;
    const valorAcceso = req.user.accesso
    if (valorAcceso === 1) {
        const quitaracceso = { accesso: 0 };
        await pool.query('UPDATE users set ? WHERE id_user=?', [quitaracceso, req.user.id_user]);
        const links = await pool.query('SELECT * from dashboards where dashboards.title = ? order by title;', title);
        res.render('tableros/dashboards', { link: links[0], layout: false });
    } else {
        res.redirect('/links');
    }
});


router.get('/tablero', isLoggedIn, async(req, res) => {
    res.redirect('/links');
});



router.get('/search', isLoggedIn, async(req, res) => {
    res.redirect('/links');
});

router.post('/dashboard/search', isAdminLoggedIn, async(req, res) => {
    const { username } = req.body;
    const busqueda = "%" + username + "%";
    const links = await pool.query('SELECT * from dashboards where dashboards.title like ? order by title;', busqueda);
    res.render('links/dashboardsadmin', { link: links[0] });
});

router.get('/dashboard/search', isAdminLoggedIn, async(req, res) => {
    res.redirect('/links/dashboardsadmin');
});

router.post('/actualizar/:id',isAdminLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const id_user = req.body.usuario;
    console.log('actualizando')
    console.log(id,' ',id_user)
    await pool.query('INSERT INTO dash_user (id_user,id_dashboard) values (?,?)',[id_user,id]);
    await req.flash('success', 'access Updated successfully');
    let url = '/links/edit/'+id
    res.redirect(url);
});

router.post('/eliminar/:id',isAdminLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const id_user = req.body.dashboard;
    console.log('actualizando')
    console.log(id,' ',id_user)
    await pool.query('DELETE FROM dash_user where id_user=? and id_dashboard=?',[id_user,id]);
    await req.flash('success', 'access Updated successfully');
    let url = '/links/edit/'+id
    res.redirect(url);
});

router.get('/edit/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM dashboards WHERE id_dashboard=?', [id]);
    const user = await pool.query('SELECT * FROM users');
    const dash_user = await pool.query('SELECT * from dash_user inner join users on users.id_user = dash_user.id_user where id_dashboard=?', [id]);

    let user_exists = [];
    let user_exists2 = [];
    let indices = [];
    let idx;

    for (var i = 0; i < dash_user.length; i++) {
        user_exists2[i] = dash_user[i].id_user
    }
    for (var i = 0; i < user.length; i++) {
        user_exists[i] = user[i].id_user
    }

    for (var i = 0; i < user_exists2.length; i++) {
        idx = user_exists.indexOf(user_exists2[i]);
        for (var j = 0; j < user_exists.length; j++) {
            while (idx != -1) {
                delete user[idx]
                indices.push(idx);
                idx = user_exists.indexOf(user_exists2[j], idx + 1);

            }
        }
    }
    res.render('links/edit', { link: link[0], user: user, dash_user: dash_user });
});

router.post('/edit/:id', isAdminLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, description, url, level_dashboards } = req.body;
    const newLink = {
        title,
        description,
        url,
        level_dashboards
    };
    await pool.query('UPDATE dashboards set ? WHERE id_dashboard=?', [newLink, id]);
    await req.flash('success', 'links Updated successfully');
    res.redirect('/links/dashboardsadmin');
});


module.exports = router;