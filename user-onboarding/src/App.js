import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as yup from "yup";
import "./App.css";
import Form from "./Form";

const schema = yup.object().shape({
  name: yup.string().required("Must enter a name"),
  email: yup.string().email('Valid email is required.').required("Must enter an email"),
  password: yup
    .string()
    .required("Must enter a password")
    .min(8, "Password must be 8 characters long!"),
  terms: yup.boolean().oneOf([true], "You must accept the Terms & Conditions"),
});

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  const [users, setUsers] = useState([])

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  const [disabled, setDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });

  };
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const change = (evt) => {
    const { checked, value, name, type } = evt.target;
    const whichValue = type === "checkbox" ? checked : value;
    setFormErrors(name, whichValue);
    setForm({ ...form, [name]: whichValue });
  };

  

  const submit = (evt) => {
    evt.preventDefault();
    const newUser = {name: form.name.trim(), email: form.email.trim(), password: form.password.trim(), terms: form.terms}
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
        setUsers([...users, res.data])
        setForm({name: "", email: "", password: "", terms: false})
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="App">
      <div>{errors.name}</div>
      <div>{errors.email}</div>
      <div>{errors.password}</div>
      <div>{errors.terms}</div>
      <Form form={form} change={change} submit={submit} disabled={disabled} />
      <pre>{users.length === 0 ? null: JSON.stringify(users)}</pre>
    </div>

//{users.length === 0 ? null : <pre>{users}</pre>}
    
  );
}

export default App;
