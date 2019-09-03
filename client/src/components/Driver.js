import React, { Component } from 'react';
import { Container, Grid, Image, Dropdown, Button } from 'semantic-ui-react'

import './Driver.css';
import axios from 'axios';

export default class Driver extends Component {

    state = {
        language: '',
        car: '',
        name: '',
        charge: 0,
    }

    onDriverChange = (event, data) => {
        if(data.value === 15) {
            this.setState({
                name: 'Max',
                charge: 15
            })
        }
        if(data.value === 18) {
            this.setState({
                name: 'Stephen',
                charge: 18
            })
        }
        if(data.value === 20) {
            this.setState({
                name: 'Miller',
                charge: 20
            })
        }
    }

    onLanguageChange = (event, data) => {
        console.log(data.value);

        this.setState({
          language: data.value
        })
      }

      onCarChange = (event, data) => {
        console.log(data.value);

        this.setState({
          car: data.value
        })
      }

      onSubmit = () => {
        console.log('hello');
        var trip = JSON.parse(localStorage.getItem('roundtrip'));
        var packtrip = JSON.parse(localStorage.getItem('packdata'));
        var multi = JSON.parse(localStorage.getItem('multitrip')); 

        if(trip !== null) {
        var d = {
            days: trip.days,
            distancevalue: trip.distancevalue,
            roundendtime: trip.roundendtime,
            roundstarttime: trip.roundstarttime,
            drivername: this.state.name,
            drivercar: this.state.car,
            driverlanguage: this.state.language,
            drivercharger: this.state.charge
        }
        axios.post('/aq-index/book', {data: d}).then((res) => {
            localStorage.removeItem('packdata');
            localStorage.setItem('roundtrip', JSON.stringify(res.data.rounddata));
            this.props.history.push('/aq-index/book');
        })
    }
      if(packtrip !== null) {
         d = {
            drivername: this.state.name,
            drivercar: this.state.car,
            driverlanguage: this.state.language,
            charge: 1500,
            package: packtrip.package,
            state: packtrip.state,
            date: packtrip.date
        }
         localStorage.setItem('packdata', JSON.stringify(d));
         this.props.history.push('/aq-index/book');
      }
      if(multi !== null) {
        if(multi.endpoints === 2) {
         d = {
          days: multi.days,
          distanceonevalue: multi.distanceonevalue,
          distancetwovalue: multi.distancetwovalue,
          endpoints: multi.endpoints,
          multiendtime: multi.multiendtime,
          multistarttime: multi.multistarttime,
          drivername: this.state.name,
          drivercar: this.state.car,
          driverlanguage: this.state.language,
          drivercharger: this.state.charge
      }
    } else if(multi.endpoints === 4) {
      d = {
        days: multi.days,
        distanceonevalue: multi.distanceonevalue,
        distancetwovalue: multi.distancetwovalue,
        distancethreevalue: multi.distancethreevalue,
        distancefourvalue: multi.distancefourvalue,
        endpoints: multi.endpoints,
        multiendtime: multi.multiendtime,
        multistarttime: multi.multistarttime,
        drivername: this.state.name,
        drivercar: this.state.car,
        driverlanguage: this.state.language,
        drivercharger: this.state.charge
    }
    }
     else if(multi.endpoints === 5) {
      d = {
        days: multi.days,
        distanceonevalue: multi.distanceonevalue,
        distancetwovalue: multi.distancetwovalue,
        distancethreevalue: multi.distancethreevalue,
        distancefourvalue: multi.distancefourvalue,
        distancefivevalue: multi.distancefivevalue,
        endpoints: multi.endpoints,
        multiendtime: multi.multiendtime,
        multistarttime: multi.multistarttime,
        drivername: this.state.name,
        drivercar: this.state.car,
        driverlanguage: this.state.language,
        drivercharger: this.state.charge
    }
     }
     else if(multi.endpoints === 3) {
      d = {
        days: multi.days,
        distanceonevalue: multi.distanceonevalue,
        distancetwovalue: multi.distancetwovalue,
        distancethreevalue: multi.distancethreevalue,
        endpoints: multi.endpoints,
        multiendtime: multi.multiendtime,
        multistarttime: multi.multistarttime,
        drivername: this.state.name,
        drivercar: this.state.car,
        driverlanguage: this.state.language,
        drivercharger: this.state.charge
      }
    }
      axios.post('/aq-index/multibook', {data: d}).then((res) => {
          localStorage.removeItem('packdata');
          localStorage.removeItem('roundtrip');
          localStorage.setItem('multitrip', JSON.stringify(res.data.multidata));
          this.props.history.push('/aq-index/book');
      })
      }
    }

    render() {
        var languageOptions = [
            { key: 'English', text: 'English', value: 'English' },
            { key: 'Hindi', text: 'Hindi', value: 'Hindi' },
            { key: 'Kannada', text: 'Kannada', value: 'Kannada' }
          ]
          var DriverOptions = [
            { key: 'Max', text: 'Max', value: 15 },
            { key: 'Stephen', text: 'Stephen', value: 18 },
            { key: 'Miller', text: 'Miller', value: 20 }
          ]
          const CarOptions = [
            {
              key: 'CHEVROLET',
              text: 'CHEVROLET',
              value: 'CHEVROLET',
            },
            {
              key: 'BENZ',
              text: 'BENZ',
              value: 'BENZ',
            //   image: { avatar: true, src: 'https://instacar.in/wp-content/uploads/2016/08/logo-merc.png' },
            },
            {
              key: 'AUDI',
              text: 'AUDI',
              value: 'AUDI',
            //   image: { avatar: true, src: 'https://instacar.in/wp-content/uploads/2016/08/logo-audi.png' },
            }
            ]
        return (
            <div>
                <Container style={{marginTop: '200px'}}>
                    <Grid>
                        <Grid.Column width={3}>
                         <Image 
                          style={{marginTop: '30px'}}
                          src='https://react.semantic-ui.com/images/avatar/large/justen.jpg' 
                          size='tiny' 
                          circular/>
                          <span style={{marginLeft: '-5px', color: 'gray'}}>{this.state.name}</span>
                          <span style={{marginLeft: '15px', color: 'gray'}}>{this.state.charge} Rs/Km</span>
                        </Grid.Column>
                        <Grid.Column width={10}>
                         <Dropdown
                            placeholder='Select Driver'
                            fluid
                            selection
                            options={DriverOptions}
                            selected={this.state.name}
                            onChange={this.onDriverChange}
                         />
                          <Dropdown
                           placeholder='Select Language'
                           fluid
                           button
                           className='icon'
                           labeled
                           icon='world'
                           options={languageOptions}
                           search
                           selected={this.state.language}
                           onChange={this.onLanguageChange}
                           />
                           <Dropdown
                            placeholder='Select Car'
                            fluid
                            selection
                            options={CarOptions}
                            onChange={this.onCarChange}
                            selected={this.state.car}
                            />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Button 
                           style={{marginTop: '60px', marginLeft: '50px'}}
                           onClick={this.onSubmit}
                           disabled={this.state.name && this.state.language && this.state.car  ? false : true}
                           >Book</Button>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}
