import React from 'react'

const Course = ({ course }) => {
  return  (
    <div>
  <Header title={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
  </div>
  )}

const Total = ({ parts }) => {
const add = (a, b) => a + b
const number = parts.map((part) => part.exercises)
return (
  <p><b>Total exercises {number.reduce(add)}</b></p>
)}

const Header = ({ title }) => <h2>{title}</h2>

const Content = ({ parts }) => {
return (
  <ul>
    {parts.map((part) => 
      <Part key={part.id} part={part} /> 
      )}
  </ul>
)
}

const Part = ({ part }) => {
return (
  <li>{part.name} {part.exercises}</li>
)
}

const App = ({ courses }) => {
  

  return (
  <div>
    <h1>Web development curriculum</h1>
    {courses.map((course => 
    <Course key={course.id} course={course} />
    ))}
  </div>
  )}

export default App;
