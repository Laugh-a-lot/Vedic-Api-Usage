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
  const monthYear = (month.toLowerCase() + year)
  let allTopics = []
  const userData = data["Satyam Kumar"]
  var dayData = {}
  var jsonTopic = ''
  var jsonSubTopic = ''
  


  for (var key in userData[monthYear]) {
    var topics = {}
    
    var jsonData = userData[monthYear][key]
    for (var jsonKey in jsonData)
    {
      var subTopics = {}
      const jsonKeyValue = jsonKey
      jsonKey = jsonKey.split("/")
      jsonTopic = jsonKey[0]
      if (jsonKey.length === 2) {
        jsonSubTopic = jsonKey[1]
        
      } else {
        jsonSubTopic = 'total'
      }
      allTopics.push(jsonTopic)
      subTopics[jsonSubTopic] = jsonData[jsonKeyValue]
      
      topics[jsonTopic] = Object.assign({}, topics[jsonTopic], subTopics)
    }
    
    dayData[key] = topics
    
    

  } 
  allTopics = new Set(allTopics);
  allTopics = Array.from(allTopics)
    
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
              {allTopics.map((topic) => <li><Graph title={topic} color={"black"} data={dayData} /></li> )}
         
      </ul>
  </section>
          </div>
        </div>
      </div>
  );
}

export default App;
