import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const {counter} = props
  const course = {
    name: 'Half Stack application development',
  
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
    ]
  }

  //const total = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      {counter}
    </div>
  )
}

let counter = 1

const Total = (props) => {
  let total = 0
  props.parts.forEach(value => {
    total += value.exercises
  })
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
  <p>
    {props.part} {props.exercises}
  </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name}exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name}exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name}exercises={props.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, 
  document.getElementById('root'))
}

setInterval(() => {
  refresh()
  counter += 1
}, 1000)

//ReactDOM.render(<App counter={counter} />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
