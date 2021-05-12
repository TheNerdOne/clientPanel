import React, { Component } from "react";
import { Table, Row, Col, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  constructor(props) {
    super(props);
    this.pSearch = this.pSearch.bind(this);
  }
  state = {
    TotalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString()); //for make sure it's string
      }, 0);
      return { TotalOwed: total }; /// totalowed = total and totalowed get from state ///
    }
    return null;
  }
  pSearch = e => {
    e.preventDefault();
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("p-myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  };
  render() {
    const { clients } = this.props;
    const { TotalOwed } = this.state;

    if (clients) {
      var clientCounter = 1; // the number of each client in the list

      return (
        <div className="">
          <Row>
            <Col md={6}>
              <h2>
                <i className="fa fa-users" /> Clients
              </h2>
            </Col>
            <Col md={6}>
              <h5 className="text-right text-secondary">
                TotalOwed:{" "}
                <span className="text-primary">
                  ${parseFloat(TotalOwed.toFixed(2))}
                </span>
              </h5>
            </Col>
          </Row>
          <Table striped bordered hover id="p-myTable">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>
                  <Form inline className=" pl-2 pr-2">
                    <FormControl
                      type="text"
                      placeholder="Name"
                      className="bg-dark border-0 p-searchBar p-0 w-100"
                      onKeyUp={this.pSearch}
                      id="myInput"
                    />
                  </Form>
                </th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{clientCounter++}</td>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td className="text-center">
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fa fa-arrow-circle-right" /> Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
