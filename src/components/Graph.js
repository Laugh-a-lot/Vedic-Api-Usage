import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../static/graphs.css";

class User extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isParent: false,
      modData: props.data,  // it is modified json
      modTopics: props.allTopics,// Here I've initiated the state modData with a list of all the topics like ['horoscope', 'prediction'...]
      labels: []
    };
   for (let i = 1; i <= Object.keys(this.props.data).length; ++i) {
      this.state.labels.push(i.toString());
    }
  }
  Graph = (topic, index) => {
    var usage = [];
    console.log("child comp is loading", this.state.isParent, topic)
    if (this.state.isParent) {
     
      usage = Object.keys(this.state.modData).map((day) =>
        this.state.modData[day][this.state.isParent][topic]
          ? ((this.state.modData[day])[this.state.isParent])[topic]
          : 0
      )
    } else {
      usage = Object.keys(this.state.modData).map((day) =>
        this.state.modData[day][topic]
          ? Object.values(this.state.modData[day][topic]).reduce(
              (a, b) => a + b,
              0
          )
          : 0
      );
    }

    const total = usage.reduce((a, b) => a + b, 0);
    const state = {
      labels: this.state.labels,
      datasets: [
        {
          label: topic,
          fontSize: 16,
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgba(52, 170, 255, 0.23)",
          borderColor: "rgba(52, 170, 255, 1)",
          borderWidth: 1,
          pointRadius: 1,
          data: usage,
        },
      ],
    };
    return state;
  };

  handleGraphs = (e) => {
    const days = Object.keys(this.state.modData);
    console.log(e.currentTarget.getAttribute("value"), "on click")
    var childElements = days.map((day) =>
      this.state.modData[day][e.currentTarget.getAttribute("value")]
        ? Object.keys(
            this.state.modData[day][e.currentTarget.getAttribute("value")]
          )
        : []
    );
    
    childElements = new Set(childElements.flat());
    this.setState({
      isParent: e.currentTarget.getAttribute("value"),
      modTopics: Array.from(childElements),
    });

    
  };
  render() {
    const { props } = this;
   console.log(this.state.modData, this.state.modTopics) // it should show the initially set json and the list of topics but both are empty. 

    return (
      <>
        { this.state.modTopics.map((topic, index) => (
          <li onClick={this.handleGraphs} value={topic} key={index}>
            
            <div className="graphs">
              <h3 value={topic} className="title">
                Total Usage: {this.state.total}
              </h3>
              <Line
                value={topic}
                height={400}
                width={550}
                data={() => this.Graph(topic, index)}
                options={{
                  title: {
                    display: true,
                    text: "Average Usage per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                  maintainAspectRatio: true,
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          borderDash: [5],
                        },
                      },
                    ],
                  },
                }}
              />
              <h2 className="title">{props.title}</h2>
            </div>
          </li>
        ))}
      </>
    );
  }
}

export default User;
