import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => 
  <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value, unit}) => <tr><td>{text}</td><td>{value} {unit}</td></tr>

const Statistics = (props) => {
  if (props.all === 0) {
    return 'No feedback given'
  }
  
  return (
    <table>
      <tbody>
    <Statistic text='good' value={props.good} />
    <Statistic text='neutral' value={props.neutral} />
    <Statistic text='bad' value={props.bad} />
    <Statistic text='all' value={props.all} />
    <Statistic text='average' value={props.average} />
    <Statistic text='positive' value={props.positive} unit='%'/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good - bad) / all
  
  const positive = good / all * 100

  return (
    <div>
      <Header text = 'give feedback'/>
      <Button handleClick={() => { setGood(good + 1); setAll(all + 1) }} text="good" />
      <Button handleClick={() => { setNeutral(neutral + 1); setAll(all + 1) }} text="neutral" />
      <Button handleClick={() => { setBad(bad + 1); setAll(all + 1) }} text="bad" />
      <Header text ='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)