import React from 'react'
import './Form.css'
import { useState } from 'react'
const Form = () => {

  const [title , setTitle] = useState('');
  const [text , setText] = useState('');
  const [date , setDate] = useState('');

const titleHandler = (e) =>{
      
    setTitle(e.target.value);
}


const textHandler = (e) =>{
      
    setText(e.target.value);
}

const dateHandler = (e) =>{
      
    setDate(e.target.value);
}



const submitHandler = (e) =>{
    e.preventDefault();
    console.log(title , text, date);
    setDate('');
    setText('');
    setTitle('');
}





  return (
    <form className='section'>
        <label >Title</label>
        <br/>
      <input type='text'  value={title}
      onChange={titleHandler}/>
      <br/>

      <label >Opening text</label>
      <br/>

      <input type='text' value={text} onChange={textHandler}/>
      <br/>


      <label >Release Date</label>
      <br/>

      <input type='text'value={date} onChange={dateHandler}/>
      <br/>

     <button type='submit' onClick={submitHandler}>Add movie</button>
    </form>
  )
}

export default Form
