import React, {useState} from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Graph from './components/Graph';
import PieChart from './components/PieChart';
import DatePicker from './components/DatePicker';
import data from './data/data.json';

function App() {
  const [date, setDate] = useState(new Date())
  const month = date.toLocaleString('default', { month: 'long' })
  const userName = Object.keys(data)[0]
  const year = date.getFullYear()
  const userData = data["Satyam Kumar"]
  
  const monthYear = (month.toLowerCase() + year)
  const dayData = userData[monthYear]
  const graphs = Object.keys(dayData["day01"])

  console.log(graphs)
  return (
    <div className="App" id="app">
      <div class="container-fluid">
        <h1 className="heading">Vedic Api Daily Usage</h1>
        <div className="container-fluid dashboard" >
          <div className="sidebar card">
            <div className="user">
            <h2 className="userName">{ userName }</h2>
            <h4>Api usage for month { month }</h4>
            </div>
            
            <PieChart className="container" date={date} days={dayData} />
            <DatePicker date={date} setDate={setDate} monthList={userData}/>
            
          </div>
          
          <section className={"container"}>
            <ul class="grid-wrapper">
              {graphs.map((graph) => <li><Graph title={graph} color={"black"} data={dayData} /></li> )}
         
      </ul>
  </section>
          </div>
        </div>
      </div>
  );
}

export default App;
