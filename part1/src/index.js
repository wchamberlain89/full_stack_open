import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
const Content = ({ parts }) => {
  console.log(parts[0])
  return (
    <>
      <Part 
        part={parts[0]}
      />
      <Part 
        part={parts[1]}
      />
      <Part 
        part={parts[2]}
      />
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
  <p>Number of exercises {getTotal()}</p>
  )
}

const App = () => {
    const course = {
      title: 'Half Stack application development',
      parts :  [{
      name: 'Fundamentals of React',
      exercises: 10
    }, {
      name: 'Using props to pass data',
      exercises: 7
    }, {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
      <Header title={course.title}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))