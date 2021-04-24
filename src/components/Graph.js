import React, {Component} from 'react'
import { Line } from 'react-chartjs-2'
import "../static/graphs.css"

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 34 }
  }
  Graph = (props) => {
    const labels = [];
    var usage = []
    for (let i = 1; i <= (Object.keys(props.data)).length; ++i) {
      labels.push(i.toString());
    }
    console.log(props.isParent, "isparent")
    if (props.isParent) {
      usage = (Object.keys(props.data)).map(day => ((props.data[day])[props.isParent])[props.title] ? Object.values(((props.data[day])[props.isParent])[props.title]) : 0)
    } else {
      usage = (Object.keys(props.data)).map(day => (props.data[day])[props.title] ? Object.values((props.data[day])[props.title]).reduce((a, b) => a + b, 0) : 0)
    }
    console.log(usage, props.title)
    const total = usage.reduce((a, b) => a + b, 0)
    const state = {
      labels: labels,
      datasets: [
        {
          label: props.title,
          fontSize: 16,
          fill: true,
          lineTension: 0.5,
          backgroundColor: `rgba(${props.color}, 0.23)`,
          borderColor: `rgba(${props.color})`,
          borderWidth: 1,
          pointRadius: 1,
          data: usage
        }
      ]
    }
    this.setState({ x: 400, stateVar: state , total: total, usage: usage})
    
  }
 
  componentDidMount = () => {
    const { props } = this
    this.Graph(props)
  }
  
  render() {
    const {props} = this
    return (
      <div className="graphs">
        
        <h3 value={props.title } className="title">Total Usage: {this.state.total}</h3>
    
        <Line
          value = {props.title}
          height={400}
          width={550}
          data={this.state.stateVar}
          options={{
            title: {
              display: true,
              text: 'Average Usage per month',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            maintainAspectRatio: true,
            scales: {
              xAxes: [{
                  gridLines: {
                      display:false
                  }
              }],
              yAxes: [{
                  gridLines: {
                  borderDash: [5]
                  }   
              }]
          }
          }}
        />
        <h2 className="title">{props.title}</h2>
      </div>
    )
  }
}
  

export default User;
