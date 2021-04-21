import React, { useState, useEffect, Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Graph from "./components/Graph";
import DatePicker from "./components/DatePicker";
import data from "./data/data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: (new Date()).toLocaleString("default", { month: "long" }),
      allTopics: [],
      
    }
  }
  const date = new Date();
  const [month, setMonth] = useState(
    date.toLocaleString("default", { month: "long" })
  );
  const [allTopics, setTopics] = useState([]);
  const [day_data, setDayData] = useState({});
  var [isParent, setIsParent] = useState(false);
  const userName = Object.keys(data)[0];
  const year = date.getFullYear();
  const monthYear = month.toLowerCase() + year;
  const userData = data["Satyam Kumar"];
  var all_topics = [];

  useEffect(() => {
    var dayData = {};
    var jsonTopic = "";
    var jsonSubTopic = "";
    for (var key in userData[monthYear]) {
      var topics = {};

      var jsonData = userData[monthYear][key];
      for (var jsonKey in jsonData) {
        var subTopics = {};
        const jsonKeyValue = jsonKey;
        jsonKey = jsonKey.split("/");
        jsonTopic = jsonKey[0];
        if (jsonKey.length === 2) {
          jsonSubTopic = jsonKey[1];
        } else {
          jsonSubTopic = "total";
        }
        all_topics.push(jsonTopic);
        subTopics[jsonSubTopic] = jsonData[jsonKeyValue];

        topics[jsonTopic] = Object.assign({}, topics[jsonTopic], subTopics);
      }
      dayData[key] = topics;
    }
    setTopics(Array.from(new Set(all_topics)));
    setDayData(dayData);
  }, []);

  const handleGraphs = (e) => {
    const days = Object.keys(day_data);
    var childElements = days.map((day) =>
      day_data[day][e.currentTarget.getAttribute("value")]
        ? Object.keys(day_data[day][e.currentTarget.getAttribute("value")])
        : []
    );
    childElements = new Set(childElements.flat());
    setIsParent(e.currentTarget.getAttribute("value"));
    setTopics(Array.from(childElements));
    
  };
  return (
    <div className="App" id="app">
      <div class="container-fluid">
        <h1 className="heading">Vedic Api Daily Usage</h1>
        <div className="container-fluid dashboard">
          <div className="sidebar card">
            <div className="user">
              <h2 className="userName">{userName}</h2>
              <h4>Api usage for month {month}</h4>
            </div>
          </div>

          <section className="container">
            <DatePicker
              month={month}
              setMonth={setMonth}
              monthList={Object.keys(userData)}
            />
            <ul class="grid-wrapper">
              {allTopics.map((topic, index) => (
                <li onClick={handleGraphs} value={topic} >
                  <Graph
                    title={topic}
                    color={["52, 170, 255", "255, 52, 52"][index % 2]}
                    data={day_data}
                    isParent={isParent}
                    setIsParent={setIsParent}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
