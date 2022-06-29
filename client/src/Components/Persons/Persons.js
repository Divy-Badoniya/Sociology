import React from 'react'
import Person from './Person/Person'
import './styles.css'

const Persons = ({ persons }) => {
  return (
    <div>
      <h3>{persons?.text}</h3> 
      {persons?.data ? persons.data.map((person) => <Person key={person.username} person={person} />) : null}
    </div>
  )
}

export default Persons