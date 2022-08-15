import { FormLabel, TextField ,Box, Button,FormControlLabel,Checkbox} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddBook = () => {
  const history = useNavigate();
  const [input, setInputs] = useState({
    name:'',
    description:'',
    price:'',
    author:'',
    
    image:'',

});
const [checked,setChecked] = useState(false)
const handleChange = (e) => {
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]:e.target.value
  }))
  console.log(e.target.name,"Value",e.target.value);
}
const sendRequest = async()=>{
  await axios.post("http://localhost:5000/books/", {
  name:String(input.name),
  author:String(input.author),
  description:String(input.description),
  price:Number(input.price),
  image:String(input.image),
  availabe:Boolean(checked)
}).then(res=> res.data);
}



const handleSubmit = (e) => {
  e.preventDefault();
  console.log(input,checked);
  sendRequest().then(()=>history('/books'));
}
  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' justifyContent={'center'} maxWidth={700} alignContent='center' alignSelf={'center'} marginLeft='auto' marginRight={'auto'} marginTop={10}>
      <FormLabel>Name</FormLabel>
      <TextField margin='normal' value={input.name} onChange={handleChange} fullWidth variant='outlined' name='name'/>
      <FormLabel>Author</FormLabel>
      <TextField margin='normal' value={input.author} onChange={handleChange} fullWidth variant='outlined' name='author'/>
       <FormLabel>Description</FormLabel>
      <TextField margin='normal' value={input.description} onChange={handleChange} fullWidth variant='outlined' name='description'/>
      <FormLabel>Price</FormLabel>
      <TextField margin='normal' value={input.price} onChange={handleChange} type='number' fullWidth variant='outlined' name='price'/>
      <FormLabel>Image</FormLabel>
      <TextField margin='normal' value={input.image} onChange={handleChange} fullWidth variant='outlined' name='image'/>
      <FormControlLabel control={<Checkbox Checked ={checked} onChange={()=>setChecked(!checked)}/>} label="Available" />

      <Button variant='contained' type='submit'>Add Book</Button>
      </Box>
      
    </form>
  )
}

export default AddBook