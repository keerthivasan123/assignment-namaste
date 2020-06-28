import React from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"

import "./App.css"

const monday = 1

class CalanderMod2 extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
  }

  

  render() {
    const {selectedDays, handleDayClick2} = this.props;
    return (
        
      <div onClick={this.hideColorPicker}>
          <h4 className="pl-3">Select a Date & Time</h4>
        
        <DayPicker
        className="pl-3"
        style={{marginLeft: "auto", marginRight: "auto", width: "100px"}}
      onDayClick={handleDayClick2}
      initialMonth={new Date()}
      selectedDays={selectedDays}
    />
      </div>
    )
  }
}

export default CalanderMod2;
