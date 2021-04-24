import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Graph from "./components/Graph";
import DatePicker from "./components/DatePicker";
import data from "./data/data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().toLocaleString("default", { month: "long" }),
      allTopics: [],
      isParent: false,
      day_data: {},
      date: new Date(),
      userName: Object.keys(data)[0],
      userData: data["Satyam Kumar"],
    };
  }
  modifiedData = () => {
    var dayData = {};
    var all_topics = []
    const year = this.state.date.getFullYear();
    const monthYear = this.state.month.toLowerCase() + year;
    for (var key in this.state.userData[monthYear]) {
      var topics = {};
      
      var jsonTopic = "";
      var jsonSubTopic = "";
      
      var jsonData = this.state.userData[monthYear][key];
      for (var jsonKey in jsonData) {
        var subTopics = {};
        var jsonKeyValue = jsonKey;
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
    
    this.setState({
      allTopics: Array.from(new Set(all_topics)),
      day_data: dayData,
    });
    
  };
  
  handleGraphs = (e) => {
    const days = Object.keys(this.state.day_data);
    var childElements = days.map((day) =>
      this.state.day_data[day][e.currentTarget.getAttribute("value")]
        ? Object.keys(
            this.state.day_data[day][e.currentTarget.getAttribute("value")]
          )
        : []
    );
    childElements = new Set(childElements.flat());
    this.setState({
      isParent: e.currentTarget.getAttribute("value"),
      allTopics: Array.from(childElements),
    });
  };

  componentDidMount = () => {
    this.modifiedData();
  };

  render()
  
  {
    return (
      <div className="App" id="app">
        <div class="container-fluid">
          <h1 className="heading">Vedic Api Daily Usage</h1>
          <div className="container-fluid dashboard">
            <div className="sidebar card">
              <div className="user">
                <h2 className="userName">Satyam Kumar</h2>
                <h4>April</h4>
              </div>
            </div>

            <section className="container">
              <DatePicker
                month={this.state.month}
                monthList={Object.keys(this.state.userData)}
              />
              <ul class="grid-wrapper">
                {this.state.allTopics.map((topic, index) => (
                  <li onClick={this.handleGraphs} value={topic} key={index}>
                    <Graph
                      title={topic}
                      color={["52, 170, 255", "255, 52, 52"][index % 2]}
                      data={this.state.day_data}
                      isParent={this.state.isParent}
                      key={index}
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
}

export default App;
