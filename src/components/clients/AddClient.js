import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  // just a form for add client with react-bootstrap

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    balance: ''
  }

  onSubmit = e => {
    e.preventDefault()
    
    const newClient = this.state
    const {firestore, history} = this.props

    if(newClient.balance === '') {
      newClient.balance = 0
    }

    firestore
    .add({ collection: 'clients' }, newClient)
    .then(() => history.push('/'));

  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  
  render() {
    // ######################      TODO: make it beautiful         ########################## //
    const { disableBalanceOnAdd } = this.props.settings;
    const {firstName, lastName, phone, balance, email} = this.state

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formGroupFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={this.onChange} value={firstName} />
              </Form.Group>
              <Form.Group controlId="formGroupLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={this.onChange} value={lastName}/>
              </Form.Group>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Email" onChange={this.onChange} value={email}/>
              </Form.Group>
             
              <Form.Group controlId="formGroupPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Enter phone" onChange={this.onChange} value={phone} />
              </Form.Group>
              <Form.Group controlId="formGroupBalance">
                <Form.Label>Balance</Form.Label>
                <Form.Control type="text" name="balance" placeholder="Enter Balance" onChange={this.onChange} value={balance} disabled={disableBalanceOnAdd}/>
              </Form.Group>
              <Button type="submit" variant="primary" block>
                Submit {/* this is for sapce after the word "Submit" */}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);