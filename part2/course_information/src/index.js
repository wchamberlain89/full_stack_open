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
    return parts.reduce((acc, part) => {
      return acc += part.exercises
    }, 0);
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <>
      {
        courses.map(course => <Course course={course} />) 
      }
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))