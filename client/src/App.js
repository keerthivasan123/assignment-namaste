import React, { useState, useEffect } from 'react';
import Calander from "./CalanderMod2";
import Event from "./Event";
import {getEvents} from "./api"
import moment from 'moment-timezone'; 

export default function App() {
  const [state, setState] = useState({
    events: [],
    defaultTimeZone: moment.tz.guess(),
    selectedDays: [],
    filteredEvents: [],
    error: "",
    day: moment(new Date()).format("YYYY-MM-DD"),
    loading: false,
  })
  const { events, defaultTimeZone,day, filteredEvents, selectedDays, error, loading } = state;

  const preload = async () => {
    setState({
      ...state,
      loading: true
    })
    const today = new Date();
    const defaultTimeZone = moment.tz.guess();
    getEvents(today.getDate(), today.getMonth()+1, today.getFullYear(), defaultTimeZone).then( async (data) => {
      if(data.error) {
        setState({
          ...state, error: data.error
        })
      }
       else {
         const events = data.filteredEvents;
          const selectedDays =  await events.map(event => new Date(event.eventTiming))
          const filteredEvents = await handleDayClick(new Date().getDate(), new Date().getMonth()+1, new Date().getFullYear(), true, events)
          await setState({
            ...state,
            events: events,
            selectedDays: selectedDays,
            filteredEvents: filteredEvents,
            loading: false
          });
          
      }
    })
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div id="loading">
            <div id='loader'><img class="center" src='https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'></img></div>
        </div>
      )
    );
  };

  const handleDayClick = async (date, month, year, selected, events) => {
    if(selected){
      const filteredEvents = await events.filter((event) => {
        var dec = moment(event.eventTiming);
        var res = dec.tz(defaultTimeZone);
        console.log(res.date(), date, month, year, res.month(), res.year())
        if(date === res.date()&&month === res.month()+1&&year === res.year()){
        return res.toString()}
        
    })
    return filteredEvents;
    } else {
      setState({
        ...state,
        filteredEvents: []
      })
    }
  }

  const handleDayClick2 = async (day, { selected }) => {
    const filteredEvents = await handleDayClick(day.getDate(), day.getMonth()+1, day.getFullYear(), selected, events)
    setState({
      ...state,
      filteredEvents: filteredEvents,
      day: moment(day).format("YYYY-MM-DD")
    })
  }

  useEffect(async () => {
     await preload();
  }, []);

  return (
    <div> 
      {loadingMessage()}
      <div className="row pt-5" style={{width: "100%"}}>
        <div className=" col-12 col-md-6 pl-5 pb-5">
          <h3 className="pl-3 pb-5" style={{color: "green"}}> Ashtanga Yoga Live Session</h3>
          <Event 
          filteredEvents = {filteredEvents}
          defaultTimeZone = {defaultTimeZone}
          day = {day}
          />
        </div>
        <div className="col-md-6 col-12" >
          <div style={{width: "350px", padding: 0, margin: 0, color: "green", marginLeft: "auto", marginRight: "auto", }}>
          <Calander style={{padding: "20px"}}
          selectedDays = {selectedDays}
          events = {events}
          handleDayClick2 = {handleDayClick2}/>
          <h3 className="pt-4">TimeZone: {defaultTimeZone}</h3>
          </div> 
        
        </div>
      </div>
    </div>
  )
}

