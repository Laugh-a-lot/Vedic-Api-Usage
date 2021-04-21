import React from "react";
import "../static/DatePicker.css";
import Dropdown from "react-bootstrap/Dropdown"

function DatePicker(props) {
  const months = ['January', 'February','March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const handleDateChange = (e) => {
    const month = e.toLocaleString("default", { month: "long" });
    const year = e.getFullYear();
    const monthYear = month.toLowerCase() + year;
    console.log(monthYear, props.monthList);
    if (monthYear in props.monthList === true) {
      props.setDate(e);
    }
  
  };

  const handleMonthchange = (e) => {
    console.log(e.target)
    console.log((e.target[0]).value)
    console.log((e.target[1]).value)
  }
  const handleSetMonth = (e) => {
    console.log(e.target)
    /*props.setMonth(e.target.getAttribute('value'))*/
    }
  return (
    <div>
      <p className="month">Select Month</p>
      <form className="dateSelector" onSubmit={handleMonthchange}>
      <Dropdown>
  <Dropdown.Toggle className= "custom-btn" data-value={props.month}id="dropdown-basic">
    {props.month}
  </Dropdown.Toggle >

        <Dropdown.Menu>
          {months.map((month) => (<Dropdown.Item href="" onClick={handleSetMonth} value={month}>{month}</Dropdown.Item>))}
    
    
  </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
  <Dropdown.Toggle className= "custom-btn" id="dropdown-basic" value="2021">
    2021
  </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">2021</Dropdown.Item>
    
    
  </Dropdown.Menu>
      </Dropdown>

      
      
        <button type="submit" class="btn btn-primary" >Get Usage</button>
      </form></div>
  );
}

export default DatePicker;
