const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");

// frameworks
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const favicon = require('serve-favicon');


// hash variables
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// models
const User = require("./public/models/user");

// jwt
const jwt = require('jsonwebtoken');
const JWT_SECRET = crypto.randomBytes(64).toString('hex');



const app = express();

app.use(cors());
app.use(express.json());

const createPath = (page) => path.resolve(__dirname, 'views/pages', `${page}.ejs`);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(cookieParser());

// app.use(favicon(path.join(__dirname, 'public/images/favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Secret Key
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}));

mongoose.connect('mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Список страниц
const pages = [
  'about',
  'api',
  'basket',
  'contact',
  'feedback',
  'forher',
  'forhim',
  'login',
  'signup',
  'profile',
  'quiz',
  'sale',
  'todo'
];

// middleware
function checkAuth(req, res, next) {
  if (req.session.userLoggedIn) {
    return res.redirect('/');
  }
  next();
}

// Обработка запросов для каждой страницы
pages.forEach(page => {
  // Добавляем middleware `checkAuth` к страницам `signup` и `login`
  if (page === 'signup' || page === 'login') {
    app.get(`/${page}`, checkAuth, (req, res) => {
      res.render(createPath(page));
    });
  } else {
    // В остальных случаях просто обрабатываем запросы для страниц
    app.get(`/${page}`, (req, res) => {
      res.render(createPath(page));
    });
  }
});

// Обработка запроса для корневой страницы
app.get('/', (req, res) => {
  const { userLoggedIn, email } = req.session;
  if (userLoggedIn) {
    User.findOne({ email })
      .then((user) => {
        res.render(createPath('index'), {
          userLoggedIn,
          user,
          currentUrl: req.url
        });

      })
      .catch(err => {
        // Обработка ошибок при запросе к базе данных
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  } else {
    res.render(createPath('index'), {
      userLoggedIn,
      currentUrl: req.url
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

// Post api

// login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).lean()

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid email' })
  }

  if (await bcrypt.compare(password, user.password)) {
    // успешная аутентификацияВ
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      JWT_SECRET
    )

    // Устанавливаем сессию после успешного входа
    req.session.userLoggedIn = true;
    req.session.email = email;

    return res.json({ status: 'ok', data: token, userLoggedIn: true });
  }

  return res.json({ status: 'error', error: 'Invalid password' })
});

// register
app.post('/api/register', async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof username !== 'string' || username.length < 3 || username.length > 12) {
    return res.json({ status: 'error', error: 'Invalid username' });
}

  if (!emailRegex.test(email)) {
    return res.json({ status: 'error', error: 'Invalid email' });
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' });
  }

  if (plainTextPassword.length < 6) {
    return res.json({ status: 'error', error: 'Invalid password' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: 'error', error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    req.session.userLoggedIn = true;
    req.session.email = email;

    res.json({ status: 'ok', userLoggedIn: true });
  } catch (error) {
    console.error('Error:', error);
    res.json({ status: 'error', error: 'Something went wrong' });
  }
});






// Обработчик ошибки 404 (Страница не найдена)
app.use((req, res, next) => {
  const errorCode = 404;
  const errorMessage = 'Page Not Found';
  res.status(404).render(createPath('error'), { errorCode, errorMessage });
});

// server builder
const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log(`App listening at http://localhost:${PORT}`);
})

process.on('SIGINT', function () {
  console.log('Server shutting down');
  server.close(function () {
    console.log('Server closed');
    process.exit(0);
  });
});
