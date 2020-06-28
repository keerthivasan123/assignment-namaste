const Event = require("../models/events")
const moment = require('moment-timezone');

exports.getAllEvents = async function (req, res) {
    const events = await Event.find({});
    res.status(200).json({events});
};

exports.createEvent = async function (req, res) {
    try {
        const { eventTiming, duration, topic, handle  } = req.body;
        const utcDate = moment.utc(new Date(eventTiming)).toString();
        const newEvent = new Event({eventTiming: utcDate, duration, topic, handle});
        const event_ = await newEvent.save();
        res.status(200).json({event_,
                success: "created successfully"});

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.deleteEvent = async function (req, res) {
    try { 
        const id = req.params.id;
        const event = await Event.findOneAndDelete({id: id});

        if (!event) return res.status(401).json({message: 'Event does not exist'});

        res.status(200).json({event, success: "Event Deleted Successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.findEventByDate = async function (req, res) {
    try {
        const defaultTimeZone = req.body.defaultTimeZone;
        const date = parseInt(req.body.date);
        const month = parseInt(req.body.month);
        const year = parseInt(req.body.year);
        const events = await Event.find({})
        const filteredEvents = await events.filter((event) => {
            var dec = moment(event.eventTiming);
            var res = dec.tz(defaultTimeZone);
            if(year < res.year()||month < res.month()+1||date <= res.date()){
            return res.toString()}
        })
        res.status(200).json({filteredEvents}); 
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.findEventByMonth = async function (req, res) {
    try {
        const defaultTimeZone = req.body.defaultTimeZone;
        const month = parseInt(req.body.month);
        const events = await Event.find({}, "-attendedUsers")
        const filteredEvents = await events.filter((event) => {
            var dec = moment(event.eventTiming);
            var res = dec.tz(defaultTimeZone);
            if(month === res.month()+1){
            return res.toString()}
        })
        res.status(200).json({filteredEvents});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

exports.registerEvent = async function (req, res) {
    try {
        console.log(req.params.id, req.body)
        const {name, email} = req.body;
        if(!name || !email)
        return res.status(200).json({error: "Not valid"});
        await Event.updateOne({_id: req.params.id}, {$push: {attendedUsers: req.body}},(event) => {
            console.log(event)
            res.status(200).json({event}); 
        })
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}