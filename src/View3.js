import React from 'react'

export default function View3(client) {
    console.log(client.client.first_name)
    
    const {client: {first_name, last_name, date_of_birth, health_card_number, gender}} = client
    return (
    <div className='text-center'>
        <h2>Summary</h2>
        <p>First Name: {first_name}</p>
        <p>Last Name: {last_name}</p>
        <p>Date of Birth: {date_of_birth}</p>
        <p>Health Card: {health_card_number}</p>
        <p>Gender: {gender}</p>
    </div>
  )
}
