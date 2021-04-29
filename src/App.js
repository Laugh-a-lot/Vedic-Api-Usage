import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Graph from "./components/Graph";
import DatePicker from "./components/DatePicker";
import data from "./data/data.json";
import Back from './components/Back'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().toLocaleString("default", { month: "long" }), //set the month here from the month picker
      allTopics: [],
      isChild: false,
      day_data: {},
      year: new Date().getFullYear(),                                 //set the year here from year picker
      userName: Object.keys(data)[0],
      userData: data["Satyam Kumar"],
      parentTopics: []
    };
  }
  modifiedData = () => {
    var dayData = {};
    var all_topics = []
    const monthYear = this.state.month.toLowerCase() + this.state.year;
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
    const remTopics =  Array.from(new Set(all_topics))
    this.setState({
      allTopics: remTopics,
      day_data: dayData,
      parentTopics: remTopics
    });
    
  };
  
  handleTopicChange = (newTopicList, subTopic) => {
    this.setState({ allTopics: newTopicList, isChild: subTopic })
    console.log(subTopic)
  };
  handleBackButton = () => {
    this.setState({
      allTopics: this.state.parentTopics,
      isChild: false
    })

  }
  componentDidMount = () => {
    this.modifiedData();
  };

  render()
  
  
  {
    return (
      <div className="App" id="app">
        <div class="container-fluid">
          <div className="container-fluid dashboard">
            <div className="sidebar card">
              <div className="user">
                <h2 className="userName">Satyam Kumar</h2>
                <h4>April</h4>
              </div>
            </div>

            <section className="container m-3">
              
              <DatePicker
                month={this.state.month}
                monthList={Object.keys(this.state.userData)}
              />
              {this.state.isChild ? (<Back handleBackButton={this.handleBackButton}/>) : ""}
              

              <ul class="grid-wrapper">
                <Graph allTopics={this.state.allTopics} data={this.state.day_data} handleTopicChange={this.handleTopicChange} isChild={this.state.isChild}/>
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
