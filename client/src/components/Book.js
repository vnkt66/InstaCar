import React from 'react'
import axios from 'axios';
import { Grid, Form, TextArea } from 'semantic-ui-react';
import { Container, Image } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
// import TimeKeeper from 'react-timekeeper';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

// import moment from 'moment';

import ModalExampleControlled from './FinalTicket';
import ModalExampleControlledone from './ErrorTicket';

class Book extends React.Component {  
  
  state = {
      email: '',
      phone: '',
      name: '',
      custaddress: '',
      custaddress1: '',
      roundtrip: '',
      packtrip: '',
      multitrip: '',
      modalOpen: false,
      modalOpenone: false,
      value: moment(),
      addresses: ''
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ 
        modalOpen: false 
      })
    localStorage.removeItem('roundtrip');
    localStorage.removeItem('packdata');

    this.props.history.push('/aq-index');
  }

  handleOpenone = () => this.setState({ modalOpenone: true })

  handleCloseone = () => {
    this.setState({ 
        modalOpenone: false 
      })
    localStorage.removeItem('roundtrip');
    localStorage.removeItem('packdata');
    localStorage.removeItem('multitrip');
    this.props.history.push('/aq-index');
  }

  onAddressChange = (event) => {
    console.log(event.target.value);

    this.setState({
      addresses: event.target.value
    })
  }

  componentDidMount() {
    var r = localStorage.getItem('roundtrip');
    console.log(localStorage.getItem('roundtrip'));
    var p = localStorage.getItem('packdata');
    var m = localStorage.getItem('multitrip');
    var custdata = JSON.parse(localStorage.getItem('custdata'));

    if(custdata === null) {
      this.props.history.push('/aq-index/login');
    }

    if(custdata !== null) {
      // custdata = JSON.parse(localStorage.getItem('custdata'));

      this.setState({
        email: custdata.usermail,
        phone: custdata.userphone,
        name:  custdata.username,
      })
    }

    if( r === null && p === null && m === null) {
      this.props.history.push('/aq-index');
    }

    var token = localStorage.getItem('token');
    var config = {
        headers: {'Authorization': "bearer " + token}
    };
    
    var bodyParameters = {
       key: "value"
    }

   axios.post('/aq-index/checkout', 
     bodyParameters,
     config
    ).then((res) => {
      console.log(res.data.msg);
      if(res.data.msg === 'token expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('roundtrip');
        localStorage.removeItem('multitrip');
        localStorage.removeItem('packdata');
        this.props.history.push('/aq-index/login');
      } else {
         var roundtrip = JSON.parse(localStorage.getItem('roundtrip'));
         var multitrip = JSON.parse(localStorage.getItem('multitrip'));
         var packtrip = JSON.parse(localStorage.getItem('packdata')); 
         if(roundtrip !== null){
         this.setState({
           roundtrip: roundtrip
         })
        } else if(packtrip !== null) {
          this.setState({
            packtrip: packtrip
          })
        }
        else if(multitrip !== null) {
          this.setState({
            multitrip: multitrip
          })
        }
      }
    })
    console.log(this.custdata);
    console.log(token);
  }

//   onChangeaddress = (event) => {
//     this.setState({
//         custaddress: event.target.value
//     })
//    }

// onChangeaddress1 = (event) => {
//     this.setState({
//         custaddress1: event.target.value
//     })
//    }

//    onSubmit = (event) => {
//     event.preventDefault();

//     const details = {
//        customeremail: this.state.email,
//        customeraddress: this.state.custaddress,
//        customeraddress1: this.state.custaddress1,
//        customerphone: this.state.phone,
//        customername: this.state.name
//     }

//     axios.post('/aq-index/payment', details)
//     .then((res) => {
//         console.log(res);
//         if(res) {
//           console.log(res);
//         }
//         this.props.history.push('/customerproducts');
//     })

//     this.setState({
//       email: this.custdata.usermail,
//       phone: this.custdata.userphone,
//       name: this.custdata.username,
//       custaddress: '',
//       custaddress1: ''
//     })
// }

  handletoken = (token, addresses) => {
  const roundtrip = this.state.roundtrip;
  const multitrip = this.state.multitrip;
  const packtrip = this.state.packtrip;
  console.log({ token, addresses })
  axios.post('/aq-index/payment', { token, roundtrip, packtrip, multitrip}).then((res) => {
     console.log(res.data);
     if(res.data.status === 'success') {
       this.setState({
         modalOpen: true
     })
    }
    if(res.data.status === 'failure') {
      this.setState({
        modalOpenone: true
      })
    }
  })
}

// handleTimeChange = (newTime) => {
//   this.setState({ time: newTime.formatted})
// }
// toggleTimekeeper = (val) => {
//   this.setState({displayTimepicker: val})
// }

handleValueChange = (value) => {
  console.log(value && value.format('HH:mm:ss'));
  this.setState({ value });
};

  render() {
    // const { open } = this.state;
    if(this.state.roundtrip === '') {
      var round = '';
    } else if(this.roundtrip !== '') {
       round =  <Grid centered columns={4}>
      <Grid.Column style={{marginTop: '100px'}}>
        <Image src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' style={{width: '200px'}}/>
        </Grid.Column>
        <Grid.Column style={{marginTop: '70px'}}>
            <h5>{this.state.roundtrip.drivercar}</h5>
            <p>DriverName: {this.state.roundtrip.drivername}</p>
            <p>DriverLanguage: {this.state.roundtrip.driverlanguage}</p>
            <p>Booking Price: {this.state.roundtrip.carrate} Rs</p>
        </Grid.Column>
        {/* <Grid.Column> */}
        {/* {this.state.displayTimepicker ?
                    <TimeKeeper
                      config={{
                         TIMEPICKER_BACKGROUND: 'red',
                         FONT_FAMILY: '"Open Sans", sans-serif'
                       }}
                        time={this.state.time}
                        onChange={this.handleTimeChange}
                        // onDoneClick={() => {
                        //     this.toggleTimekeeper(false)
                        // }}
                        switchToMinuteOnHourSelect={true}
                    />
                    :
                    false
                } */}

                {/* <Icon name='clock outline' onClick={() => this.toggleTimekeeper(true)} size="small"/> */}
                {/* <button onClick={() => this.toggleTimekeeper(true)}>OPEN</button> */}
        {/* </Grid.Column> */}
        <Grid.Column style={{marginTop: '130px', marginLeft: '0px'}}>
          <StripeCheckout 
           stripeKey="pk_test_deBTX2secr2a1z0W7GXFsxUt00FKsvXZSc"
           token={this.handletoken}
           email={this.state.email}
           currency="INR"
           billingAddress
           shippingAddress
           alipay
           bitcoin
           amount={this.state.roundtrip.carrate * 100}
           name={`InstaCar`}/>
        </Grid.Column>
        {/* <Grid.Column style={{marginTop: '130px', marginRight: '10px'}}>
        <h5 style={{color: 'white', marginRight: '10px'}}>Select PickUp Time</h5>
        <TimePicker value={this.state.value} onChange={this.handleValueChange} />
        </Grid.Column> */}

      </Grid>
    }
    if(this.state.packtrip === '') {
      var pack = '';
    } else if(this.state.packtrip !== '') {
      pack = <Grid centered columns={4}>
      <Grid.Column style={{marginTop: '100px'}}>
        <Image src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' style={{width: '200px'}}/>
        </Grid.Column>
        <Grid.Column style={{marginTop: '70px'}}>
            <h5>{this.state.packtrip.drivercar}</h5>
            <p>DriverName: {this.state.packtrip.drivername}</p>
            <p>DriverLanguage: {this.state.packtrip.driverlanguage}</p>
            <p>Booking Price: {this.state.packtrip.charge} Rs</p>
        </Grid.Column>
        <Grid.Column style={{marginTop: '130px', marginLeft: '0px'}}>
          <StripeCheckout 
           stripeKey="pk_test_deBTX2secr2a1z0W7GXFsxUt00FKsvXZSc"
           token={this.handletoken}
           email={this.state.email}
           currency="INR"
           billingAddress
           shippingAddress
           alipay
           bitcoin
           amount={this.state.packtrip.charge * 100}
           name={`InstaCar`}/>
        </Grid.Column>
      </Grid>
    }
    if(this.state.multitrip === '') {
      var multi = '';
    } else if(this.state.multitrip !== '') {
       multi = <Grid centered columns={4}>
      <Grid.Column style={{marginTop: '100px'}}>
        <Image src='https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' style={{width: '200px'}}/>
        </Grid.Column>
        <Grid.Column style={{marginTop: '70px'}}>
            <h5>{this.state.multitrip.drivercar}</h5>
            <p>DriverName: {this.state.multitrip.drivername}</p>
            <p>DriverLanguage: {this.state.multitrip.driverlanguage}</p>
            <p>Booking Price: {this.state.multitrip.carrate} Rs</p>
        </Grid.Column>
        <Grid.Column style={{marginTop: '130px', marginLeft: '0px'}}>
          <StripeCheckout 
           stripeKey="pk_test_deBTX2secr2a1z0W7GXFsxUt00FKsvXZSc"
           token={this.handletoken}
           email={this.state.email}
           currency="INR"
           billingAddress
           shippingAddress
           alipay
           bitcoin
           amount={this.state.multitrip.carrate * 100}
           name={`InstaCar`}/>
        </Grid.Column>
      </Grid>
    }
          return(
              <div className="Book">
              <Container>
              <h2 style={{textAlign: 'center', color: 'white'}}>Your Booking Details</h2>
                 {round}
                 {pack}
                 {multi}
                 <Grid.Column style={{marginTop: '130px', marginRight: '10px'}}>
                  <h5 style={{color: 'white', marginRight: '10px'}}>Select PickUp Time</h5>
                  <TimePicker value={this.state.value} onChange={this.handleValueChange} />
                  </Grid.Column>
                  <Grid.Column>
                  <Form>
                   <TextArea 
                    rows={3} 
                    placeholder='Type Address' 
                    style={{width: '600px'}}
                    onChange={this.onAddressChange}/>
                  </Form>
                  </Grid.Column>
              </Container>
              <ModalExampleControlled 
                  modalOpen={this.state.modalOpen}
                  // modalOpen={true}
                  handleClose={this.handleClose}
                  addresses={this.state.addresses}
                  />
              <ModalExampleControlledone 
                  modalOpen={this.state.modalOpenone}
                  // modalOpen={true}
                  handleClose={this.handleCloseone}
                  />
              </div>
    )
  }

}

export default Book