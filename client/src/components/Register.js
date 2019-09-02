import React, { Component } from 'react';
import axios from 'axios';
import SignUp from './CustRegister';

class CustomerRegister extends Component {
  state = {
    customername: '',
    customerpassword: '',
    customeremail: '',
    customerphone: '',
    customermail: ''
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
onChangename = (event) => {
  this.setState({
      customername: event.target.value
  })
}
  
onChangepassword = (event) => {
 this.setState({
     customerpassword: event.target.value
 })
}

onChangephone = (event) => {
  this.setState({
      customerphone: event.target.value
  })
 }

onChangeemail = (event) => {
  this.setState({
      customeremail: event.target.value
  })
 }

onSubmit = (event) => {
  event.preventDefault();

//   const data = new FormData(); 
//   data.append('username', this.state.customername);
//   data.append('password', this.state.customerpassword);
//   data.append('email', this.state.customeremail);
//   data.append('phone', this.state.customerphone);

var data = {
    username: this.state.customername,
    password: this.state.customerpassword,
    email: this.state.customeremail,
    phone: this.state.customerphone
}

  console.log(`Form Submitted`);
  console.log(this.state.customername);
  console.log(this.state.customerpassword);
  console.log(this.state.customeremail);

  axios.post('/aq-index/register', data).then((res) => 
  {
    var custodata = {
      username: res.data.custdata.username,
      usermail: res.data.custdata.usermail,
      userphone: res.data.custdata.phone
    }
    localStorage.removeItem('custdata');
    localStorage.setItem('custdata', JSON.stringify(custodata));
  });
  this.props.history.push('/aq-index/login');
}

render() {
  return (
    <div onSubmit={this.onSubmit}>
        <SignUp 
              onnamechange={(event) => this.onChangename(event)}
              onpasswordchange={(event) => this.onChangepassword(event)}
              onemailchange={(event) => this.onChangeemail(event)}
              onphonechange={(event) => this.onChangephone(event)}
              onsubmit={(event) => this.onSubmit(event)}
              />
    </div>
  );
  }
}

export default CustomerRegister;