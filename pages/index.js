import { Form, Field } from 'react-final-form'
import {
  Box,
  Button,
  Flex
} from '@chakra-ui/react';
import React from 'react';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async (values, form) => {
  // await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2));
  // console.log(values);
  // setTimeout(form.reset, 10);
  // validateNumbers(values);
}

const findNumbers = (values, setShow) => {
  const sid = values.sid;
  const token = values.token;
  const data = {
    sid,
    token
  }
  fetchNumbers(values)
  .then(numbers => fillSelect(numbers, setShow));
}

const fetchNumbers = (values) => {
  return fetch('http://localhost:3000/api/TwilNumbers/TwilioNumbers', {
    method: 'POST',
    body: JSON.stringify(values)
  })
  .then(res => res.json())
}

const fillSelect = (numbers, setShow) => {
  var select = document.getElementById("twil-dd"); 
    var opt = 'Select Number'
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);

  for (let i = 0; i < numbers.length; i++) {
    var opt = numbers[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }

  setShow(true);
}

const clearDrop = () => {
  const node = document.getElementById("twil-dd");
  node.innerHTML = ''
}

// const validateNumbers = (values) => {
//   const accountSid = values.sid;
//   const authToken = values.token;
  
//   let newArr = values.numbers.split(',');
//   newArr.forEach(number => {
//     const n = number.trim();

//     return fetch('http://localhost:3000/api/TwilNumbers/TwilioNumbers', {
//       method: 'POST',
//       body: JSON.stringify(values)
//     })
//     .then(res => res.json())
//   });
// }

const createMessages = (values) => {
  const {sid, token, message} = values;
  const data = {
    sid,
    token,
    message,
    From: values.twilNumber,
  }

  values.numbers.split(',').forEach(number => {
    data["To"] = number.trim();

    return fetch('http://localhost:3000/api/SendSMS/CreateSMS', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  })
}

// Function to create the bottom of the page (after clicking find numbers)
const renderBottom = (submitting, pristine, form, values, setShow) => {
  return (
    <Box>
      <Field name="message">
        {({ input, meta }) => (
          <Box w='89%' m='10px 20px'>
            <label>Message (include links)</label>
            <textarea {...input} placeholder="Message" style={{minHeight: '22px', width: '100%', resize: 'vertical', marginTop:'6px'}}/>
            {meta.touched && meta.error && <span>{meta.error}</span>}
          </Box>
        )}
      </Field>

      <Field
        name="numbers"
        render={({ input, meta }) => (
          <Box w='89%' m='10px 20px'>
            <label>List of phone numbers</label>
            <textarea {...input} placeholder='Phone numbers' style={{minHeight: '22px',width: '100%', resize: 'vertical', marginTop:'6px'}}/>
            {meta.touched && meta.error && <span>{meta.error}</span>}
          </Box>
        )}
      />

      <Flex justifyContent='space-around'>
        <Button type="submit"
          disabled={submitting || pristine}
          onClick={() => {
            createMessages(values)
          }}
        >
          Submit
        </Button>
        <Button type="reset"
          onClick={() => {
            setShow(false);
            form.reset()
            clearDrop()
          }}
          disabled={submitting || pristine}
        >
          Reset form
        </Button>
      </Flex>
      <pre>{JSON.stringify(values, 0, 2)}</pre>
    </Box>
  )
}

export default function MyForm () {
  const [show, setShow] = React.useState(false);

  return (
    <Box 
      border='1px solid black'
      borderRadius='2px'
      m='auto'
      w='26%'
    >
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} style={{margin: '20px auto'}}>
            <Box m='3%'>
              <h2>Send your text</h2>
              <p>Please add your credentials for twilio below</p>
            </Box>
            
            <Box w='90%' m='0 3%'>
              <Flex>
                <Box mb='15px' w='40%'>
                  <Box mt='5px' mb='20px'><label>Twilio Account SID</label></Box>
                  <Box mb='20px'><label>Twilio Auth Token</label></Box>
                  <Box><label>Twilio Phone number</label></Box>
                </Box> 
                <Box mb='15px' w='60%'>
                  <Box mb='15px'><Field name="sid" component="input" placeholder="Account SID" style={{width: '100%', height: '25px'}}/></Box>
                  <Box mb='15px'><Field name="token" component="input" placeholder="Auth Token" style={{width: '100%', height: '25px'}}/></Box>
                  <Box><Field id='twil-dd' name="twilNumber" component="select" placeholder="Phone Number" style={{width: '100%', height: '25px'}}/></Box>
                </Box>
              </Flex>
            </Box>

            <Flex justifyContent='center'>
              <Button type="submit"
                m='0 28%'
                disabled={submitting || pristine}
                onClick={()=> {findNumbers(values, setShow)}}
              >
                Find number(s)
              </Button>
            </Flex>

            {show ? renderBottom(submitting, pristine, form, values, setShow) : ''}

          </form>
        )}
      />
    </Box>
  )
}