import React from 'react'
import ErrorMessage from './ErrorMessage'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function View2({change, step, validate, submitState, errors}) {
    
    const date = new Date();

    const handleInputChange = e =>{
        validate(e.target.name, e.target.value)
        change(e.target.name, e.target.value)
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
                <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="date_of_birth" max={date.toLocaleDateString('en-ca')} onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="healthCardNumber">
                    <Form.Label>Health Card</Form.Label>
                    <Form.Control type="text" placeholder="Enter Health Card Number" name="health_card_number" maxLength='10' onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="genderSelect">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select aria-label="Gender Select" defaultValue={"default"} name='gender' placeholder='Select One' onChange={handleInputChange}>
                        <option value={"default"} disabled>
                            Choose a Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
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
