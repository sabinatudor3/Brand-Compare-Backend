import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/testAPI")
      .then((response) => setData(response.data));
  }, [startDate, endDate]);

  function handleCalendar() {
    for (let i = 0; i < data.length; i++) {
      var brand = data[i].profiles;
      brand.map((el) => {
        console.log(el)
        axios
          .post(
            `http://localhost:9000/testAPI/detail/${el.id}/${el.profile_type}`
          )
          .then((response) => {
            setInfo(response.data);
          });
      });
    }
  }

  var sume = [];
  console.log(info)
  Object.entries(info).forEach(([key, value]) => {
    var sumFan = 0;
    Object.entries(value).forEach(([key2, value2]) => { 
      if(!isNaN(value2.fans) && (new Date(key2)).getTime() >= startDate.getTime() && (new Date(key2)).getTime() <= endDate.getTime()){
        sumFan += value2.fans;
      }
    })
    sume =[...sume, {key, sumFan}];
  })

  

  const itemRows = [];
  for (let item of data) {
    const row = (
      <tr key={item.profiles[0].id}>
        <td key={1}>{item.brandname}</td>
        <td key={2}>{item.profiles.length}</td>
        {/* <td key={3} >{sume}</td> */}
      </tr>
    );
    itemRows.push(row);
  }

  return (
    <div>
      <header className="App-header">
        <h2>Brand Compare</h2>
      </header>
      <div className="form-part">
        <p>Start date:</p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          onCalendarClose={handleCalendar}
        />
        <p>End date:</p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          onCalendarClose={handleCalendar}
        />
        {endDate.getTime() - startDate.getTime() < 0 && (
          <h4 style={{ color: "red" }}>Please choose another date!</h4>
        )}
      </div>
      {endDate - startDate >= 0 && (
        <table className="tab">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Total Profiles</th>
              <th>Total Fans</th>
              <th>Total Engagement</th>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
        </table>
      )}
    </div>
  );
}

export default App;
