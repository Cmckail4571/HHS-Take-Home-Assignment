import React, {useEffect, useState} from 'react'
import View1 from './View1';
import View2 from './View2';
import View3 from './View3';

function App() {
  const [client, setClient] = useState({}) // Manages the state for all client form data entered in an object
  const [step, setStep] = useState(1) // Manages the state of the view
  const [errors, setErrors] = useState({}) // Manages the state of errors in the form inputs

  /*
  Handles all form inputs, updates the client state with a new key:value pair
  field = The key used for the pair, normally the name property of the input
  value = The value used for the pair, normally the value property of the input
  */
  const handleClientInfoChange = (field, value) => {
    setClient(prevClient => {
      return {...prevClient, [field]: value}
    })
  }
  
  /*
   MOD 10 function used for validating Health Card Data
   value = The number you want to validate
  */
  function checkCard(value)
    {
        const nDigits = value.length;
 
        var nSum = 0;
        var isSecond = false;
        for (var i = nDigits-1; i >= 0; i--)
        {
            var d = value[i];
            console.log('==Digit Before==',d)
      
            if (isSecond)
                d = d * 2;
            console.log('==Digit ifDouble==',d)
            //Adds the first digit to sum by dividing by 10 and getting the floor. Numbers 10 or greater return a 1 and numbers 9 or lower return a 0 
            nSum += Math.floor(d / 10);
            console.log('==Digit one==',Math.floor(d / 10))
            //Adds the second digit to sum by getting mod 10. Numbers 10 or greater return the remainder (second digit) and numbers 9 or lower return with no change
            nSum += d % 10;
            console.log('==Digit two==',Math.floor(d % 10))
            //Sets the isSecond flag to its inverse, this should make sure every second number has isSecond = True
            isSecond = !isSecond;
        }
        console.log('==Digit Sum Final Result==', nSum%10)
        return (nSum % 10 === 0);
    }
  
  
  /*
  Validates all user form inputs
  field = The field name being evaluated
  value = The Value from the field
  */
  const validateInput = (field, value) => {
    
    const validName = new RegExp('^[A-Za-z]+$') //Regular expression that accepts 1 or more lowercase or uppercase letters
    
    //Checks if the feild is first_name and the value matches the regex validName, and sets a new error in the error State 
    if(field === 'first_name' && !value.match(validName)){
      setErrors(prevErrors => {
        return {...prevErrors, 'first_name': 'Error: Invalid characters detected in First Name, names must contain only letters'}
      })
    }
    else if (field === 'first_name' && value.match(validName))
    {
      if (errors.first_name) {
        setErrors(prevErrors => {
          const {first_name, ...rest} = prevErrors;
          return rest
        })
      }
    }

    //Checks if the field is last_name and the value matches the regex validName, and sets a new error in the error State 
    if(field === 'last_name' && !value.match(validName)){
      setErrors(prevErrors => {
        return {...prevErrors, 'last_name': 'Error: Invalid characters detected in Last Name, names must contain only letters'}
      })
    }
    else if (field === 'last_name' && value.match(validName))
    {
      if (errors.last_name) {
        setErrors(prevErrors => {
          const {last_name, ...rest} = prevErrors;
          return rest
        })
      }
    }

    //Checks if the field is used to enter date_of_birth
    if(field === 'date_of_birth'){
      const currentDate = new Date(); //Creates a date object using the current date
      const selectedDate = new Date(value); //Creates a date object using the users selected dates
      //Compares the currentDate and selectedDate, sets a new error in the error State if currentDate is less than selectedDate
      if(currentDate < selectedDate){
        setErrors(prevErrors => {
          return {...prevErrors, 'date_of_birth': 'Error: Invalid date detected in Date of Birth, date of birth can not be greater than current date'}
        })
      }
      else{
        if (errors.date_of_birth) {
          setErrors(prevErrors => {
            const {date_of_birth, ...rest} = prevErrors;
            return rest
          })
        }
      }
    }
    
    if(field === 'health_card_number'){
      if(value.length === 10 && !checkCard(value)){
        setErrors(prevErrors => {
          return {...prevErrors, 'health_card_number': 'Error: Invalid Health Card Number detected'}
        })
      }
      else if(value.length < 10 || value.length > 10){
        setErrors(prevErrors => {
          return {...prevErrors, 'health_card_number': 'Error: Invalid health card number detected, Health card number must be exactly 10 digits'}
        })
      }
      else{
        if (errors.health_card_number) {
          setErrors(prevErrors => {
            const {health_card_number, ...rest} = prevErrors;
            return rest
          })
        }
      }

    }

    const validGender = ['Male', 'Female', 'Other'] //Array of valid gender options
    //Checks if the field is used for enter date_of_birth
    if(field === 'gender'){
      //Checks if the value is not in the list of genders and sets a new error in the error State if true 
      if(!validGender.includes(value)){
        console.log(!validGender.includes(value))
        setErrors(prevErrors => {
          return {...prevErrors, 'gender': 'Error: Invalid gender detected'}
        })
      }
      else{
        if (errors.gender) {
          setErrors(prevErrors => {
            const {gender, ...rest} = prevErrors;
            return rest
          })
        }
      }
    }
  }

  /*
  returns boolean value to determine the state of the submit button in view1
  */
  const veiw1Validation = () => (client.first_name && !errors.first_name && client.last_name && !errors.last_name)

  /*
  returns boolean value to determine the state of the submit button in view2
  */
  const veiw2Validation = () => (client.date_of_birth && !errors.date_of_birth && client.health_card_number && !errors.health_card_number && client.gender && !errors.gender)

  /*
  Handles the incrementing of the step state
  */
  function handleStepChange(){
    setStep(prevStep => { return prevStep+1})
  }

  /*
  useEffect hook for console logging changes in state
  */
  useEffect( ()=> {
    var flag = veiw1Validation()
    console.log('==flag==', flag)
    console.log('==errorsState==', errors)
    console.log('==clientState==', client)
    console.log('==StepState==', step)
  }, [client, step, errors])
  


  return (
    <>
    {
      step === 1 && <View1 step={handleStepChange} change={handleClientInfoChange} validate={validateInput} submitState={veiw1Validation} errors = {errors}/>
    }
    {
      step === 2 && <View2 step={handleStepChange} change={handleClientInfoChange} validate={validateInput} submitState={veiw2Validation} errors = {errors}/>
    }
    {
      step === 3 && <View3 client={client}/>
    }
    </>
  );
}

export default App;
