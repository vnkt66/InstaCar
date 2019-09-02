import React, { Component } from 'react';
import axios from 'axios';
import SignIn from './Login';

class CustomerLogin extends Component {
  state = {
    customerpassword: '',
    customeremail: ''
  }
//   componentDidMount() {
//     var usermail = localStorage.getItem('username');
//     this.setState({
//       customermail: usermail
//     })
//     if(usermail !== null) {
//       this.props.history.push('/aq-index');
//   }
//   }

  
onChangepassword = (event) => {
 this.setState({
     customerpassword: event.target.value
 })
}

onChangeemail = (event) => {
  this.setState({
      customeremail: event.target.value
  })
 }

onSubmit = (event) => {
  event.preventDefault();

var data = {
    password: this.state.customerpassword,
    email: this.state.customeremail
}

  axios.post('/aq-index/login', data, { 
    
  })
  .then((res) => {
    localStorage.setItem('token', res.data.token);
    this.props.history.push('/aq-index/book');
  });
}

render() {
  return (
    <div onSubmit={this.onSubmit}>
        <SignIn
              onpasswordchange={(event) => this.onChangepassword(event)}
              onemailchange={(event) => this.onChangeemail(event)}
              onsubmit={(event) => this.onSubmit(event)}
              />
    </div>
  );
  }
}

export default CustomerLogin;