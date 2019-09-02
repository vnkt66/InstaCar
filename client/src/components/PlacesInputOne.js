import React from 'react'
import { Form, Input } from 'semantic-ui-react';

import './PlacesInput.css';

class PlacesInputOne extends React.Component {  
    // state = {
    //   city: ''
    // }
    // autocomplete = null
//     autocomplete = null

//   componentDidMount() {
//     this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocompleteone'), {})

//     this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
//   }

  render() {
    return(
      // <div>
          <Form.Field 
            id="autocompleteone"
            className="input-field"
            // placeholder="Select Destination"
            placeholder={this.props.text}
            // onChange={this.handleChange}
            // value={this.state.city}
            onChange={this.props.handleChange}
            value={this.props.value}
            // value={this.autocomplete}
            control={Input}
            // style={{maxWidth: '100%'}}
            style={this.props.style}
            type="text"/>
      // </div>
    )
  }

}

export default PlacesInputOne