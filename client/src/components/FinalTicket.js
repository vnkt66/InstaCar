import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {

  render() {
    return (
      <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
        basic
        size='small'
      >
        {/* <Header icon='browser' content='Cookies policy' /> */}
        <Modal.Header>Payment Details</Modal.Header>
        <Modal.Content>
          <h3>Transaction Successful, Your Cab is on the way!!! Keep Required Cash with you!!!</h3>
          <h5>PickUp Address: {this.props.addresses}</h5>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
