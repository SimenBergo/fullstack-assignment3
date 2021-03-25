const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app      = express();
const port = process.env.PORT || 3000



require('./auth/auth');
const routes = require('./routes/routes');
const studentRoute = require('./routes/student-routes');
const teacherRoute = require('./routes/teacher-routes');

app.use(express.json());

app.use('/', routes);
app.use('/student', passport.authenticate('jwt', { session: false }), studentRoute);
app.use('/teacher', passport.authenticate('jwt', { session: false }), validateTeacher, teacherRoute);

//Database
mongoose.connect('mongodb://localhost:27017/users-db',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;

function validateTeacher(req,res, next) {
    if(req.user && req.user.role === "Teacher") {
        next();
    } else {
        return res.status(403).json('You are not a teacher. Unauthorized');
    }
}

// Handle errors.
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ error: err });
});

db.on('error', () => {'Error connecting to the database'});
db.on('open', () => {console.log("We have connection to the database")});
app.listen(port, () => console.log(`Express server listening on port ${port}`));