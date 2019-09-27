import React, { Component } from 'react';
import axios from 'axios'
import { actionCreators } from '../redux/actions/form.actions';
import '../css/style.css';


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
          email: '',
          checkbox: false,
          errors: {
            firstName: 'Required',
            lastName: 'Required',
            address: 'Required',           
            phone: 'Required',
            email: 'Required'
          }
        };
      }

    
      handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        const validEmailRegex = (/[^@]+@[^]+\..+/);
        const validPhoneRegex = (/\+[0-9]{10}$/);

        switch (name) {
          case 'firstName':
            errors.firstName = value.length < 1 ? 'Required' : ''
            break;
          case 'lastName':
            errors.lastName = value.length < 1 ? 'Required' : ''
            break;
          case 'address':
            errors.address = value.length < 1 ? 'Required' : ''
            break;
          case 'phone': 
            errors.phone = value.length < 1 ? 'Required' : (validPhoneRegex.test(value) ? '' : 'Bad input! (+000000000 format)')
            break;
          case 'email':
            errors.email = value.length < 1 ? 'Required' : (validEmailRegex.test(value) ? '' : 'Bad input!')
            break;
          default:
            break;
        }
        this.setState({errors, [name]: value});
      }

    
      handleCheckBox = () => {
        const check = this.state;
        this.setState({checkbox: (check.checkbox ? false : true)});
      }


      handleSubmit = (event) => {
        event.preventDefault();

        const { firstName, lastName, address, phone, email } = this.state;
        const data = { firstName, lastName, address, phone, email };
        axios.post('http://localhost:3001/create', data)
        .then(() => console.log('Form created'))
        .catch(err => {
          console.error(err);
        });

        actionCreators.updateData(data);
        event.target.reset();
        this.errorsReset();
      }


      errorsReset = () => { 
        let errors = this.state.errors;
        errors.firstName = 'Required';
        errors.lastName = 'Required';
        errors.address = 'Required';
        errors.phone = 'Required';
        errors.email = 'Required';
        this.setState({errors})
      }

      
      isDisabled = () => {
        const { errors, checkbox } = this.state;
        return errors.firstName !== '' || errors.lastName !== '' || errors.address !== '' || errors.phone !== '' || errors.email !== '' || checkbox === false;
      }


      render() {
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
              <h2>Please fill out this form:</h2>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='firstName'>
                  <label htmlFor='firstName'>First name</label>
                  <input type='text' name='firstName' onChange={this.handleChange} />
                  <span className='error'>{this.state.errors.firstName}</span>
                </div>
                <div className='lastName'>
                  <label htmlFor='lastName'>Last name</label>
                  <input type='text' name='lastName' onChange={this.handleChange} />
                  <span className='error'>{this.state.errors.lastName}</span>
                </div>
                <div className='address'>
                  <label htmlFor='address'>Address</label>
                  <input type='text' name='address' onChange={this.handleChange} />
                  <span className='error'>{this.state.errors.address}</span>
                </div>
                <div className='phone'>
                  <label htmlFor='phone'>Phone number</label>
                  <input type='text' name='phone' onChange={this.handleChange} />
                  <span className='error'>{this.state.errors.phone}</span>
                </div>
                <div className='email'>
                  <label htmlFor='email'>Email</label>
                  <input type='email' name='email' onChange={this.handleChange} />
                  <span className='error'>{this.state.errors.email}</span>
                </div>
                <div className='checkbox'>
                  <label htmlFor='checkbox'>I agree with all corresponding data.<input type='checkbox' name='checkobx' onChange={this.handleCheckBox}/></label>
                </div>
                <div className='submit'>
                  <button type='submit' disabled={this.isDisabled()}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }

    export default Form;