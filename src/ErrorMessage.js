import React from 'react'

export default function ErrorMessage({errors}) {
    var id = 1
    const errorValues = Object.values(errors)
        return (
            errorValues.map(error => {
                id += 1
                return <p id='error' key={id}>{error}</p>
            })
        )
    
       
    
}
