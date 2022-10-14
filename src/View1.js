import React from 'react'
import ErrorMessage from './ErrorMessage'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function View1({change, step, validate, submitState, errors}) {
    

    const handleTextChange = e =>{
        if(e.target.value){
            validate(e.target.name, e.target.value)
            change(e.target.name, e.target.value)
        }
    }

    const buttonCheck = () => {
        console.log('submitstate', submitState())
        return submitState()
    }

    const handleSubmitClick = () =>{
        step()
    }
    
    return (
    <Container fluid>
        <h1 className='text-center'>Please Enter The Requested Information</h1>
        <Form style={{ width: '80%', margin: 'auto' }}>
            <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" name="first_name" onChange={handleTextChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" name="last_name" onChange={handleTextChange}/>
            </Form.Group>
            <Form.Text className="text-muted">
            <ErrorMessage errors={errors} />
            </Form.Text>
            <Button variant="primary" type="submit" disabled={!buttonCheck()} onClick={handleSubmitClick}>
                Submit
            </Button>
        </Form>
    </Container>
        
        
  )
}
