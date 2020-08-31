import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part part={part}/>)}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Total = ({ parts }) => {
  const getTotal = () => {
    let total = 0; 
    parts.forEach(part => {
      total += part.exercises;
    });
    return total;
  }
  return (
  <p>Total Number of exercises: {getTotal()}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of a component',
        exercises: 16,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))