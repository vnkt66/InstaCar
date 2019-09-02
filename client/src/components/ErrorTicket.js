import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlledone extends Component {

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
          <h3>Transaction UnSuccessful, Due to the Less Amount of the Booking Price</h3>
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
