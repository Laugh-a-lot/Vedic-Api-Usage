import React from 'react'
import { Line } from 'react-chartjs-2'
import "../static/graphs.css"


function Graph(props) {
    const labels = [];
    for (let i = 1; i <= (Object.keys(props.data)).length; ++i) {
        labels.push(i.toString());
    }
    const tit = props.title

  const usage = (Object.keys(props.data)).map(day => (props.data[day])[tit])
  const total = usage.reduce((a,b) => a+b,0)
    const state = {
        labels: labels,
        datasets: [
          {
            label: props.title,
            fontSize: 16,
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,0,0,1)',
            borderColor: props.color,
            borderWidth: 2,
            data: usage
          }
        ]
      }
    return (
      <div className="graphs">
        <h2 >{props.title }</h2>
        <h3 >Total Usage: { total}</h3>
    
        <Line
          height={400}
          width={550}
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Usage per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'top'
            },
            maintainAspectRatio: true
          }}
        />
        </div>
    )
}

export default Graph;
