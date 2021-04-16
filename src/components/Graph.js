import React from 'react'
import { Line } from 'react-chartjs-2'
import "../static/graphs.css"


function Graph(props) {
    const labels = [];
    for (let i = 1; i <= (Object.keys(props.data)).length; ++i) {
        labels.push(i.toString());
    }

  const usage = (Object.keys(props.data)).map(day => Object.values((props.data[day])[props.title]).reduce((a,b) => a+b,0))
  console.log(usage)
  const total = usage.reduce((a,b) => a+b,0)
    const state = {
        labels: labels,
        datasets: [
          {
            label: props.title,
            fontSize: 16,
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(52, 170, 255, 0.23)',
            borderColor: props.color,
            borderWidth: 1,
            pointRadius: 2,
            data: usage
          }
        ]
      }
    return (
      <div className="graphs">
        
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
        <h2 >{props.title }</h2>
        </div>
    )
}

export default Graph;
