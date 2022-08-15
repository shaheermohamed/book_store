import axios from 'axios';
import { FormLabel, TextField ,Box, Button,FormControlLabel,Checkbox} from '@mui/material'
import React,{useEffect, useState}from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const BookDetail = () => {

  const history = useNavigate();
  const [input,setInputs] = useState({});
    const id = useParams().id;
    console.log(id);
    const [checked,setChecked] = useState(false);
    useEffect(() => {
        const fetchHandler = async() => {
            await axios.get(`http://localhost:5000/books/${id}`)
            .then((res) => res.data).then(data => setInputs(data.book))
        }
        fetchHandler()
    }, [id]);
    const sendRequest = async()=>{
      await axios.put(`http://localhost:5000/books/${id}`, {
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
      sendRequest().then(()=>history('/books'))
    }
    const handleChange = (e) =>
      {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]:e.target.value
        }))
    }

    
  return (
    <div>
     {input && <form onSubmit={handleSubmit}>
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

      <Button variant='contained' type='submit'>Update Book</Button>
      </Box>
      
    </form>}
    </div>
  )
}

export default BookDetail