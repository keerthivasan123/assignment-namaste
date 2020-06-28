const {createEvent, getAllEvents, deleteEvent, findEventByDate,registerEvent, findEventByMonth} = require("../controllers/events");
const {check} = require('express-validator');
const validate = require('../controllers/validate');

module.exports = app => {
    app.get('/api/events', getAllEvents);
    app.post('/api/create', [
        check('eventTiming').notEmpty().withMessage('Your EventTiming is required'),
        check('duration').notEmpty().withMessage('Your Duration is required'),
        check('topic').notEmpty().withMessage('Your Topic is required'),
        check('handle').notEmpty().withMessage('Your Handle is required'),
    ], validate,  createEvent);
    
    // app.get('/api/:id', getUserById);
    // app.put('/api/:id',upload.single('profileImage'), updateUser);
    app.delete('/api/:id', deleteEvent);
    app.post('/api/findByDate', findEventByDate);
    app.post('/api/register/:id', registerEvent);
    app.get('/api/findByMonth', findEventByMonth);
    // app.get('/api/approve/:token', approve);
}; 