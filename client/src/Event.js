
import React, { Component } from "react";
import EventItems from "./EventItems";
import moment from 'moment-timezone';

export default class Event extends Component {
  render() {
    const { filteredEvents, defaultTimeZone,day } = this.props;
    return (
      
      <div>
        { filteredEvents?
            
            <div className="row ">
              <h3 style={{color: "green"}} className="pl-3">Event of {day}</h3>
        <div className="col-md-12 grid-margin-md stretch-card d-flex_ pr-5" >
          <div className="card">
            <div className="card-body">
              <div className="border p-3 mb-3">
                {filteredEvents.map(event => {
                    var dec = moment(event.eventTiming);
                    var res = dec.tz(defaultTimeZone);
                    var time = res.format("hh:mm A");
          return (
            <EventItems
              key={event._id}
              title={event.topic}
              time={time}
              registered = {event.attendedUsers.length}
              handle = {event.handle}
              duration = {event.duration}
              id = {event._id}
              // handleRegister={() => handleDelete(event._id)}
            />
          );
        })}
              </div>
            </div>
          </div>
        </div>
      </div>
             :
             <div className="row ">
             <div className="col-md-12 grid-margin-md stretch-card d-flex_ pr-5" >
               <div className="card">
                 <div className="card-body">
                   <h1>No Events</h1>
                 </div>
               </div>
             </div>
           </div>
            }
      
        </div>
    );
  }
}
