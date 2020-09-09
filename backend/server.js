const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const pws = require('p4ssw0rd');
const cors = require('cors');
const DB = require('./modules/db');
const { response } = require('express');
const { getAllCities } = require('./modules/db');

const app = express();

app.set('port', 9000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// app.use(cookieParser());

app.use(
  session({
    key: 'user_sid',
    secret: 'some_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000000
    }
  })
);

app.use((req, res, next) => {
    // if (req.cookies.user_sid && !req.session.user)
    if ( !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid){
  if (req.session.user){
      res.redirect('/');
  } else {
      next();
  }
};

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/signup');
});

// route for user signup (adding a user object to send to front)
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.send({redirect: '/'});
    })
    .post((req, res) => {
        console.log(req.body);
        // res.send({message: 'Hello from post signup'})
        DB.createUser(req.body)
        .then(user => {
                req.session.user = user[0];
                res.send({user: user });
            if (!user) {
                res.send({redirect:'/login'})
            }
        })
        .catch(error => {
            res.send({message:error.message});
        });
    });


// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.send({redirect: '/profile'});
    })
    .post((req, res) => {
        console.log('server login route:',req.body)
        // res.send({message: 'Hello from login login'})
        const {email, password} = req.body;
        DB.findUser(email)
        .then( user => {
            if (!user) {
                res.send({message: 'Wrong email'});
            } else if (!pws.check(password,user[0].password, 10)) {
                res.send({message: 'Wrong password'});
            } else {
                console.log('success');
                // console.log(user);
                req.session.user = user[0];
                // console.log(req.session.user);
                res.send({redirect:'/profile', user});
            }
        })
        .catch(error => {
            res.send({message:error.message});
        });
    });



// route for user logout
app.get('/logout', (req, res) => {
    // if (req.session.user && req.cookies.user_sid) 
    if (req.session.user){
        // res.clearCookie('user_sid');
        res.session.user = null
        res.send({redirect: '/'});
    } else {
        res.redirect('/login');
    }
});

app.get('/getUserList', (req, res) => {
//   if (req.session.user && req.cookies.user_sid)
  if (req.session.user) {
      console.log(req.session.user.id);
    //   console.log(req.cookies);
      res.send({user:req.session.user})
  } else {
      res.redirect('/login');
  }
});

//route to the users profile, to show favorites
app.get('/getAllCities/:id', (req, res) => {   
    // res.send({message:'getallcities from DB'})
// if (req.session.user ) 
    const {id} = req.params
    console.log('from getAllcities server:', req.params);
    DB.getAllCities(id)
    .then (data => {
        console.log(data);
        res.send(data)
})
.catch(err =>{
    res.send({message: err});
})
});


app.route('/saveFavorites/')
    .get(sessionChecker, (req, res) => {
        res.send({redirect: '/'});
    })
    .post((req, res) => {
        // console.log('save user server:', req.body.user.user[0].id);
        // console.log('save key server:',req.body.key);
        DB.sFavorites( req.body.user.user[0].id, req.body.key)
        .then (user => {
            res.send({message:'Server working'})
        })
        .catch(err =>{
            console.log('err:', err.code);
            if(err.code == 23505){
                // res.send({message: 'To delete favorite cities, just click on add'})
                DB.delFavorite(req.body.key, req.body.user.user[0].id)
                .then (data => { 
                    res.send({message:data});
                })
                .catch(err => {
                    res.send({message: err});
                })
            }
        })
    })


    app.route('/delFavorites/')
    .get(sessionChecker, (req, res) => {
        res.send({redirect: '/'});
    })
    .post((req, res) => {
        // // console.log('save user server:', req.body.user.user[0].id);
        // // console.log('save key server:',req.body.key);
        // DB.sFavorites( req.body.user.user[0].id, req.body.key)
        // .then (user => {
        //     res.send({message:'Server working'})
        // })
        // .catch(err =>{
        //     console.log('err:', err.code);
            if(err.code == 23505){
                // res.send({message: 'To delete favorite cities, just click on add'})
                DB.delFavorite(req.body.key, req.body.user.user[0].id)
                .then (data => { 
                    res.send({message:data});
                })
                .catch(err => {
                    res.send({message: err});
                })
            }
        })


// start the express server
app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`)
});
