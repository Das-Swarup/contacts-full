import React, { useState } from 'react'

export default function ContactForm() {

  const [formValue, setFormValue] = useState({name:null,number:null,email:null})
  const [message, setMessage]= useState();

  const handleInput=(e)=>{
    const {name,value} = e.target;
    setFormValue({...formValue, [name]:value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const allInputValue = {name:formValue.name,number:formValue.number,email:formValue.email,}
    console.log(allInputValue);

    let res = await fetch("http://localhost:8000/api/addcontacts", {
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(allInputValue)
    })

    let resjson = await res.json()
    if(res.status === 200){
      setMessage(resjson.success)
      console.log(message);
    }
  }

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="" className="form-label">Name</label>
            <input type="text" name='name' className='form-control' value={formValue.name} onChange={handleInput} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="" className="form-label">Contact Number</label>
            <input type="number" name='number' className='form-control' value={formValue.number} onChange={handleInput} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="" className="form-label">Email</label>
            <input type="text" name='email' className='form-control' value={formValue.email} onChange={handleInput}/>
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="" className="form-label"></label>
            <button type='submit' className='btn btn-success'>Submit</button>
          </div>
        </div>
      </div>
    </form>
    </div>
  )
}
