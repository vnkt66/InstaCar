import React from 'react'
import { Tab, Button, Form, Input, Dropdown} from 'semantic-ui-react'
import axios from 'axios';
import PlacesInput from './PlacesInput';
import PlacesInputOne from './PlacesInputOne';
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router';

import './TabPanel.css';

import "react-datepicker/dist/react-datepicker.css";

class ContainerTab  extends React.Component {
    state = {
        startDateone: new Date(),
        startDatetwo: new Date(),
        cityone: 'Bangalore',
        citytwo: '',
        multicitystartDateone: new Date(),
        multicityendDateone: new Date(),
        multicityone: 'Bangalore',
        multicitytwo: '',
        multicityonestartDateone: new Date(),
        multionecityone: '',
        multionecitytwo: '',
        multicitytwostartDateone: new Date(),
        multitwocityone: '',
        multitwocitytwo: '',
        threetwovalue: '',
        threetwodate: new Date(),
        fourtwovalue: '',
        fourtwodate: new Date(),
        fivetwovalue: '',
        fivetwodate: new Date(),
        airdate: new Date(),
        packstate: '',
        packpackage: '',
        adds: [],
        // places: ['', '', '', '', '', '', '']
        places: [],
        count: 2
      };
    
      handleChangeone = date => {
        this.setState({
          startDateone: date
        });
      };
      handleChangetwo = date => {
        this.setState({
          startDatetwo: date
        });
      };
      
      handleChangeplaceone = (event) => {
        this.setState({citytwo: event.target.value}, () => {
          // console.log(this.state.citytwo);
        })
      }

      multicityhandlestartChangeone = date => {
        this.setState({
          multicitystartDateone: date
        });
      };
      multicityhandleendChangeone = date => {
        this.setState({
          multicityendDateone: date
        });
      };
      
      multicityhandleChangeplaceone = (event) => {
        var k = [...this.state.places];
        k[0] = event.target.value;
        this.setState({
            multicityone: event.target.value,
            places: k
          }
          , () => {
          // console.log(this.state.multicityone);
        })
      }

      multicityhandleChangeplacetwo = (event) => {
        var k = [...this.state.places];
        k[1] = event.target.value;
        this.setState({multicitytwo: event.target.value, places: k}, () => {
          // console.log(this.state.multicitytwo);
        })
      }
      multicityhandleonestartChangeone = date => {
        this.setState({
          multicityonestartDateone: date
        });
      };
      multicitytwohandleChangeplaceone = (event) => {
        this.setState({multionecityone: event.target.value}, () => {
          // console.log(this.state.multionecityone);
        })
      }

      multicitytwohandleChangeplacetwo = (event) => {
        var k = [...this.state.places];
        k[2] = event.target.value;
        this.setState({multitwocitytwo: event.target.value, places: k}, () => {
          // console.log(this.state.multitwocitytwo);
          // console.log(this.state.places);
        })
      }
      multicityhandletwostartChangeone = date => {
        this.setState({
          multicitytwostartDateone: date
        });
      };
      multicityonehandleChangeplaceone = (event) => {
        this.setState({multitwocityone: event.target.value}, () => {
          // console.log(this.state.multitwocityone);
        })
      }

      multicityonehandleChangeplacetwo = (event) => {
        this.setState({multionecitytwo: event.target.value}, () => {
          // console.log(this.state.multionecitytwo);
        })
      }

      threetwo = (event) => {
        var k = [...this.state.places];
        k[3] = event.target.value;
        this.setState({
          threetwovalue: event.target.value,
          places: k
        })
      }

      threetwodate = (date) => {
        this.setState({
          threetwodate: date 
        })
      }

      fourtwo = (event) => {
        var k = [...this.state.places];
        k[4] = event.target.value;
        this.setState({
          fourtwovalue: event.target.value,
          places: k
        })
      }

      fourtwodate = (date) => {
        this.setState({
          fourtwodate: date 
        })
      }

      fivetwo = (event) => {
        var k = [...this.state.places];
        k[5] = event.target.value;
        this.setState({
          fivetwovalue: event.target.value,
          places: k 
        })
        console.log(this.state.places);  
      }

      fivetwodate = (date) => {
        this.setState({
          fivetwodate: date 
        })
      }

      airdate = (date) => {
        this.setState({
          airdate: date 
        })
      }

      onAddCity = () => {
        var copied = [...this.state.adds];
        var countcopied = this.state.count + 1;
        if(this.state.count === 2) {
          this.setState({
            multitwocitytwo: this.state.multicityone
          })
        }
        // if(this.state.count === 4) {
        //   this.setState({
        //     fourtwovalue: this.state.multicityone
        //   })
        // }
        if(this.state.adds.length <= 2) {
        copied.push('add');
        this.setState({
           adds: copied,
           count: countcopied
        }, () => {
          console.log(this.state.adds);
          console.log(this.state.count);
          if(this.state.count === 3) {
            this.setState({
              threetwovalue: this.state.multicityone
            })
          }
          if(this.state.count === 4) {
            this.setState({
              fourtwovalue: this.state.multicityone
            })
          }
          if(this.state.count === 5) {
            this.setState({
              fivetwovalue: this.state.multicityone
            })
          }
        })
      }
      }
      
      onRemoveCity = () => {
        // console.log(this.state.adds);
        // var k = [...this.state.adds];
        // if(this.state.adds.length < 1) {
        //   this.props.history.push('/aq-index');
        // }
        if(this.state.adds.length === 0) {
          this.props.history.push('/aq-index');
        }
        if(this.state.count === 2) {
          this.setState({
            multitwocitytwo: '',
          })
        }
        if(this.state.count > 2) {
          var k = this.state.count;
          this.setState({
            count: k - 1
          })
        }
        if(this.state.adds.length <= 3) {
        // var k = this.state.adds.pop();
        this.state.adds.splice(0, 1);
        // console.log(k);
        this.setState((prevState) => ({
          adds: prevState.adds,
          // count: k - 1
        }), () => {
          console.log(this.state.count);
          if(this.state.count === 3) {
            this.setState({
              threetwovalue: ''
            })
          }
          if(this.state.count === 4) {
            this.setState({
              fourtwovalue: ''
            })
          }
          if(this.state.count === 5) {
            this.setState({
              fivetwovalue: ''
            })
          }
        })
      }
      }

      onStateChange = (event, data) => {
        console.log(data.value);

        this.setState({
          packstate: data.value
        })
      }

      onPackageChange = (event, data) => {
        console.log(data.value);

        this.setState({
          packpackage: data.value
        })
      }


      onSubmit1 = () => {
        var roundplaces = {
          oneval:  this.state.cityone,
          twoval: this.state.citytwo,
          onedate: this.state.startDateone,
          twodate: this.state.startDatetwo
        }
        if(roundplaces.oneval !== '' && roundplaces.twoval !== '') {
          axios.post('/aq-index/roundtrip', {rounddata: roundplaces}).then((res) => {
             console.log(res);

             if(res) {
              localStorage.removeItem('multitrip');
              localStorage.removeItem('packdata');
              localStorage.setItem('roundtrip', JSON.stringify(res.data.rounddata));
              this.props.history.push('/aq-index/driver');
             }
          })
        }
      }


    
       onSubmit2 = () => {
        // event.preventDefault();
        console.log('hello');

        if(this.state.count === 2) {
          if(this.state.multicitytwo === this.state.multitwocitytwo) {
            this.props.history.push('/aq-index');
            console.log('SOURCE AND DESTINATION MATCH ERROR!');
          }
        }

        if(this.state.count === 3) {
          if(this.state.multitwocitytwo === this.state.threetwovalue) {
            this.props.history.push('/aq-index');
            console.log('SOURCE AND DESTINATION MATCH ERROR!');
          }
        }
        if(this.state.count === 4) {
          if(this.state.threetwovalue === this.state.fourtwovalue) {
            this.props.history.push('/aq-index');
            console.log('SOURCE AND DESTINATION MATCH ERROR!');
          }
        }
        if(this.state.count === 5) {
          if(this.state.fourtwovalue === this.state.fivetwovalue) {
            this.props.history.push('/aq-index');
            console.log('SOURCE AND DESTINATION MATCH ERROR!');
          }
        }

        if(this.state.threetwovalue !== '') {
          console.log('Three')
          var allplaces = 
          {
          oneone : this.state.multicityone,
          onetwo : this.state.multicitytwo,
          onedeparture: this.state.multicityonestartDateone,
          twoone : this.state.multicitytwo,
          twotwo : this.state.multitwocitytwo,
          twodeparture: this.state.multicitytwostartDateone,
          threeone : this.state.multitwocitytwo,
          threetwo : this.state.threetwovalue,
          threedeparture: this.state.threetwodate,
          fourone : this.state.threetwovalue,
          fourtwo : this.state.fourtwovalue,
          fourdeparture: this.state.fourtwodate,
          fiveone : this.state.fourtwovalue,
          fivetwo : this.state.fivetwovalue,
          fivedeparture: this.state.fivetwodate
          }
          axios.post('/aq-index/multitrip', { multidata: allplaces }).then((res) => {
            if(res) {
              localStorage.removeItem('packdata');
              localStorage.removeItem('roundtrip');
              localStorage.setItem('multitrip', JSON.stringify(res.data.multidata));
              this.props.history.push('/aq-index/driver');
            }
          })
        }        

        if(this.state.multitwocitytwo === '') {
          this.setState({
            multitwocitytwo: this.state.multicityone
          }, () => {
            allplaces = 
              {
              oneone : this.state.multicityone,
              onetwo : this.state.multicitytwo,
              onedeparture: this.state.multicityonestartDateone,
              twoone : this.state.multicitytwo,
              twotwo : this.state.multitwocitytwo,
              twodeparture: this.state.multicitytwostartDateone,
              threeone : this.state.multitwocitytwo,
              threetwo : this.state.threetwovalue,
              threedeparture: this.state.threetwodate,
              fourone : this.state.threetwovalue,
              fourtwo : this.state.fourtwovalue,
              fourdeparture: this.state.fourtwodate,
              fiveone : this.state.fourtwovalue,
              fivetwo : this.state.fivetwovalue,
              fivedeparture: this.state.fivetwodate
              }
            console.log(allplaces);
            axios.post('/aq-index/multitrip', {multidata: allplaces}).then((res) => {
             console.log(res);

             if(res) {
              localStorage.removeItem('packdata');
              localStorage.removeItem('roundtrip');
              localStorage.setItem('multitrip', JSON.stringify(res.data.multidata));
              this.props.history.push('/aq-index/driver');
             }
          })
          })
        }
      }

      onSubmit3 = () => {
        var airportpack = {
          state: this.state.packstate,
          package: this.state.packpackage,
          date: this.state.airdate
        }

        if(airportpack.state !== '' && airportpack.package !== '') {
          axios.post('/aq-index/package', {packdata: airportpack}).then((res) => {
            localStorage.removeItem('roundtrip');
            localStorage.removeItem('multitrip');
            localStorage.setItem('packdata', JSON.stringify(res.data.packdata));
            this.props.history.push('/aq-index/driver');
          })
        }

        // console.log(airportpack);
      }
   


render() {

  var options = [
    { text: 'Bangalore', value: 'Bangalore' },
    { text: 'Chennai', value: 'Chennai' },
    { text: 'Kolkata', value: 'Kolkata' },
  ]

  var airoption = [
    { text: 'Airport Package', value: 'Airport Package'}
  ]
    const panes = [
        {
         menuItem: {
              content: 'ROUND TRIP',
              color: 'grey',
              key: '1'
            },
          render: () => 
              <Tab.Pane attached={false}>
                 <div className="row mx-0 px-0">
                 <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0px', paddingRight: '0'}}>
                       <Form.Field 
                        style={{margin: '0', width: '100%'}}
                        className="input-field"
                        id="autocomplete"
                        value={this.state.cityone}
                        control={Input}
                        style={{maxWidth: '100%'}}
                        type="text"/>
                  </div>
                  <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                      <PlacesInput 
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.handleChangeplaceone}
                       text="Select Destination"
                       value={this.state.citytwo}
                       />
                  </div>
                  <div className="col-md-2 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                    <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      style={{width: '100%'}}
                      id="onethree"
                      selected={this.state.startDateone}
                      onChange={this.handleChangeone}
                      placeholderText="Depart Date"
                      isClearable={true}
                     />
                  </div>
                  <div className="col-md-2 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                    <DatePicker
                      style={{width: '100%'}}
                      className="datepicker"
                      minDate={new Date()}
                      selected={this.state.startDatetwo}
                      onChange={this.handleChangetwo}
                      placeholderText="Return Date"
                      isClearable={true}
                      id="onethree"
                     />
                    </div>
                    <div className="col-md-2 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                    <Button primary onClick={this.onSubmit1}>Book</Button>
                    </div>
                    </div>
              </Tab.Pane>,
        },
        {
          menuItem: {
              content: 'MULTICITY',
              color: 'grey',
              key: '2'
            },
          render: () => 
          <Tab.Pane attached={false}>
            <div className="row mx-0 px-0" id="one">
              <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                       <PlacesInput 
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.multicityhandleChangeplaceone}
                       text="Select Origin"
                       id="oneone"
                       value={this.state.multicityone}
                      
                       />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                       <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.multicityhandleChangeplacetwo}
                       text="Select Destination"
                       id="onetwo"
                       value={this.state.multicitytwo}
                       />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
            <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.multicityonestartDateone}
                      onChange={this.multicityhandleonestartChangeone}
                      placeholderText="Depart Date"
                      style={{width: '100%'}}
                      isClearable={true}
                     />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
            <Button primary style={{margin: '0'}} onClick={this.onSubmit2}>Book</Button>
            </div>
            </div>
            <div className="row mx-0 px-0" id="two">
              <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                     
                     {/* <PlacesInput 
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.multicitytwohandleChangeplaceone}
                       text="Select Origin"
                       value={this.state.multitwocityone}
                       id="twoone"
                       /> */}
                       <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                      //  handleChange={this.multicityhandleChangeplacetwo}
                       text="Select Origin"
                       id="onetwo"
                       value={this.state.multicitytwo}
                       />

              </div>

              <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                      <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.multicitytwohandleChangeplacetwo}
                       text="Select Destination"
                       id="twotwo"
                      //  value={this.state.multitwocitytwo}
                      value={this.state.count === 2 ? this.state.multicityone : this.state.multitwocitytwo}
                       />

              </div>
          
              <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                    <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.multicitytwostartDateone}
                      onChange={this.multicityhandletwostartChangeone}
                      placeholderText="Depart Date"
                      isClearable={true}
                      style={{width: '100%'}}
                     />
                     </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                  <button style={{border: 'none', color: 'gray', padding: '20px 0px 0px 20px', outline: 'none', background: 'none'}} onClick={this.onRemoveCity}>X</button>
                  <button style={{border: 'none', color: 'gray', padding: '20px 0 0 20px', outline: 'none', background: 'none'}} onClick={this.onAddCity}>Add City Upto 5</button>
                </div>
                </div>
                <div className="row mx-0 px-0" id="three" style={{display: this.state.adds.length >= 1 ? 'block' : 'none'}}>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                      //  handleChange={this.multicitytwohandleChangeplacetwo}
                       text="Select Origin"
                       id="twotwo"
                       value={this.state.multitwocitytwo}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.threetwo}
                       text="Select Destination"
                       id="twotwo"
                      //  value={this.state.threetwovalue}
                      value={this.state.count === 3 ? this.state.multicityone : this.state.threetwovalue}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.threetwodate}
                      onChange={this.threetwodate}
                      placeholderText="Depart Date"
                      isClearable={true}
                      style={{width: '100%'}}
                     />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                  {/* <button style={{border: 'none', color: 'gray', padding: '20px 20px', outline: 'none', background: 'none'}}>X</button>
                  <button style={{border: 'none', color: 'gray', padding: '20px 0', outline: 'none', background: 'none'}} onClick={this.onAddCity}>Add City Upto 5</button> */}
                </div>
                </div>
                <div className="row mx-0 px-0" id="five" style={{display: this.state.adds.length >= 2 ? 'block' : 'none'}}>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                      //  handleChange={this.threetwo}
                       text="Select Origin"
                       id="twotwo"
                       value={this.state.threetwovalue}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.fourtwo}
                       text="Select Destination"
                       id="twotwo"
                      //  value={this.state.fourtwovalue}
                      value={this.state.count === 4 ? this.state.multicityone : this.state.fourtwovalue}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.fourtwodate}
                      onChange={this.fourtwodate}
                      placeholderText="Depart Date"
                      isClearable={true}
                      style={{width: '100%'}}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                  {/* <button style={{border: 'none', color: 'gray', padding: '20px 20px', outline: 'none', background: 'none'}}>X</button>
                  <button style={{border: 'none', color: 'gray', padding: '20px 0', outline: 'none', background: 'none'}} onClick={this.onAddCity}>Add City Upto 5</button> */}
                </div>
                </div>
                <div className="row mx-0 px-0" id="five" style={{display: this.state.adds.length >= 3 ? 'block' : 'none'}}>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                      //  handleChange={this.fourtwo}
                       text="Select Origin"
                       id="twotwo"
                       value={this.state.fourtwovalue}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <PlacesInputOne
                       style={{margin: '0', width: '100%'}}
                       handleChange={this.fivetwo}
                       text="Select Destination"
                       id="twotwo"
                      //  value={this.state.fivetwovalue}
                      value={this.state.count === 5 ? this.state.multicityone : this.state.fivetwovalue}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.fivetwodate}
                      onChange={this.fivetwodate}
                      placeholderText="Depart Date"
                      isClearable={true}
                      style={{width: '100%'}}
                />
                </div>
                <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0', paddingRight: '0'}}>
                  {/* <button style={{border: 'none', color: 'gray', padding: '20px 20px', outline: 'none', background: 'none'}}>X</button>
                  <button style={{border: 'none', color: 'gray', padding: '20px 0', outline: 'none', background: 'none'}} onClick={this.onAddCity}>Add City Upto 5</button> */}
                </div>
                </div>
          </Tab.Pane>,
        },
        {
          menuItem: {
              content: 'PACKAGES',
              color: 'grey',
              key: '3'
          },
          render: () => 
          <Tab.Pane attached={false}>
            <div className="row mx-0 px-0">
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0px', paddingRight: '0'}}>
            <Dropdown
             onChange={this.onStateChange}
             upward
             placeholder='From'
             fluid
             search
             selection
             options={options}
            />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0px', paddingRight: '0'}}>
            <Dropdown
             onChange={this.onPackageChange}
             upward
             placeholder='Choose Package'
             fluid
             search
             selection
             options={airoption}
            />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0px', paddingRight: '0'}}>
            <DatePicker
                      className="datepicker"
                      minDate={new Date()}
                      id="onethree"
                      selected={this.state.airdate}
                      onChange={this.airdate}
                      placeholderText="Depart Date"
                      isClearable={true}
                      style={{width: '100%'}}
                />
            </div>
            <div className="col-md-3 px-0 mx-0" style={{paddingLeft: '0px', paddingRight: '0'}}>
            <Button primary onClick={this.onSubmit3}>Book</Button>
            </div>
            </div>
          </Tab.Pane>,
        },
      ]
    return (
        <Tab menu={{ secondary: true }} panes={panes} />
      );
}
} 

export default withRouter(ContainerTab);