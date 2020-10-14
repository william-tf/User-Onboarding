import React from 'react';


export default function Form(props){

    const {form, change, submit, disabled} = props;

    return(
        <div>
        <form onSubmit={submit}>
            <label>
                Name: 
            <input onChange={change} type="text" name="name" value={form.name} placeholder="Enter a name" />
            </label>
            <label>
                Email: 
            <input onChange={change} type="email" name="email" value={form.email} placeholder="Enter an email" />
            </label>
            <label>
                Password: 
            <input onChange={change} type="text" name="password" value={form.password} placeholder="Enter a password" />
            </label>
            <label>
                Accept the Terms and Conditions:
            <input onChange={change} checked={form.terms} type="checkbox" name="terms" />
            </label>
            <button disabled={disabled} >Submit</button>
            </form>
            
            </div>
        
    )
}