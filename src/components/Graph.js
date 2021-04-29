import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../static/graphs.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Graph = (topic, index) => {
    const labels = [];
    for (let i = 1; i <= Object.keys(this.props.data).length; ++i) {
      labels.push(i.toString());
    }
    var usage = [];
    if (this.props.isChild) {
      usage = Object.keys(this.props.data).map((day) =>
        this.props.data[day][this.props.isChild]
          ? (this.props.data[day][this.props.isChild][topic] !==undefined ? this.props.data[day][this.props.isChild][topic] : 0)
          : 0
      );
    } else {
      usage = Object.keys(this.props.data).map((day) =>
        this.props.data[day][topic]
          ? Object.values(this.props.data[day][topic]).reduce(
              (a, b) => a + b,
              0
            )
          : 0
      );
    }
    console.log(usage, topic)
    const total = usage.reduce((a, b) => a + b, 0);
    const state = {
      labels: labels,
      datasets: [
        {
          label: topic,
          fontSize: 16,
          fill: true,
          lineTension: 0.5,
          backgroundColor: `${
            ["rgba(52, 170, 255, 0.23)", "rgba(255, 52, 52, 0.23)"][index % 2]
          }`,
          borderColor: `${
            ["rgba(52, 170, 255, 1)", "rgba(255, 52, 52, 1)"][index % 2]
          }`,
          borderWidth: 1,
          pointRadius: 2.5,
          data: usage,
        },
      ],
    };
    return state;
  };

  handleGraphs = (e) => {
    const days = Object.keys(this.props.data);
    const subTopic = e.currentTarget.getAttribute("value");
    var childElements = days.map((day) =>
      this.props.data[day][subTopic]
        ? Object.keys(this.props.data[day][subTopic])
        : []
    );

    childElements = new Set(childElements.flat());
    this.props.handleTopicChange(Array.from(childElements), subTopic);
  };
  render() {
    const { props } = this;
    return (
      <>
        {props.allTopics.map((topic, index) => (
          <li className={!props.isChild ? "pointer": ""} onClick={ !props.isChild ? this.handleGraphs : ''} value={topic} key={index}>
            <div className="graphs">
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
              <h3 value={topic} className="title">
                {topic}
              </h3>
            </div>
          </li>
        ))}
      </>
    );
  }
}

export default User;
