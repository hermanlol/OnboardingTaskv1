//import React, { Component } from 'react';

import React, {useState} from 'react';
import { Button, Modal, Form, TextArea, Icon } from 'semantic-ui-react';

export class FetchCustomers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            //modalTitle: "",
            customerId:0,
            customerName: "",
            customerAddress: "",
            showModal: false,
            testData: "Success"
        };
        this.updateCustomer = this.updateCustomer.bind(this);
        this.loadDataSortAsc = this.loadDataSortAsc.bind(this);
        this.loadDataSortDes = this.loadDataSortDes.bind(this);
        this.loadAddressSortAsc = this.loadDataSortAsc.bind(this);
        this.loadAddressSortDes = this.loadDataSortDes.bind(this);
        //this.loadData = this.loadData.bind(this);
        //this.update = this.update.bind(this);
        //this.delete = this.delete.bind(this);
        //const [open, setOpen] = React.useState(false);
    }

    createCustomer = () => {
        fetch('/api/Customers/PostCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.customerName,
                Address: this.state.customerAddress
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.loadData();
            }, (error) => {
                alert('Error, Please try again!');
            })
        //alert('hi');
    }

    //closeModal = () => {
    //    this.setState({ showModal: false })
    //}

    updateCustomer = (customerId) => {
        fetch('/api/Customers/PutCustomer/' + customerId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: customerId,
                Name: this.state.customerName,
                Address: this.state.customerAddress
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.loadData();
            }, (error) => {
                alert('Error, Please try again!');
                this.loadData();
            })
    }

    deleteCustomer = (customerId) => {
        fetch('/api/Customers/DeleteCustomer/' + customerId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.loadData();
            }, (error) => {
                this.loadData();
            })
    }

    loadDataSortAsc() {
        //fetching from URL instead of controller
        //const response = await fetch('/api/customers/GetCustomer');
        //const data = await response.json();
        //this.setState({ customersList: data, loading: false });
        fetch('/api/customers/GetCustomerSortedUp')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });

    }

    loadDataSortDes() {
        //fetching from URL instead of controller
        //const response = await fetch('/api/customers/GetCustomer');
        //const data = await response.json();
        //this.setState({ customersList: data, loading: false });
        fetch('/api/customers/GetCustomerSortedDown')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });

    }

    loadAddressSortAsc() {
        //fetching from URL instead of controller
        //const response = await fetch('/api/customers/GetCustomer');
        //const data = await response.json();
        //this.setState({ customersList: data, loading: false });
        fetch('/api/customers/GetAddressSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });

    }

    loadAddressSortDes() {
        //fetching from URL instead of controller
        //const response = await fetch('/api/customers/GetCustomer');
        //const data = await response.json();
        //this.setState({ customersList: data, loading: false });
        fetch('/api/customers/GetAddressSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });

    }

    loadData() {
        //fetching from URL instead of controller
        //const response = await fetch('/api/customers/GetCustomer');
        //const data = await response.json();
        //this.setState({ customersList: data, loading: false });
        fetch('/api/customers/GetCustomer')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });

    }

    sortResult(prop, asc) {
        var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ customersList: sortedData });
    }


    componentDidMount() {
        this.loadData();
    }
    editClick(id) {
        //ajax call logic
    }

    delete(id) {
        //ajax call logic
    }

    changeCustomerName = (e) => {
        //alert(e.target.value);
        this.setState({
            customerName : e.target.value,
        });
    }
    changeCustomerAddress = (e) => {
        this.setState({
            customerAddress: e.target.value,
        });
    }

    //createClick = () =>{
    //    this.setState({
    //        customerName: "",
    //        customerAddress: ""
    //    });
    //}


    testing = () => {
        alert(this.state.customerName);
        alert(this.state.customerAddress);
    }
    render() {

        let customersData = this.state;

        let customersList = this.state.customersList;

        let createButton = <Button style={{ marginTop: 10 }} className="primary" onClick={()=>this.createClick }>New Customer</Button>;

        let createContent =
            <div class="content">
               <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input type="text" placeholder='Name'  onChange={this.changeCustomerName} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input type="text" placeholder='Address' onChange={this.changeCustomerAddress} />
                    </Form.Field>
                </Form>
            </div>;


        //const [open, setOpen] = React.useState(false);

        //let createAction =
        //    <div class="actions">
        //        <Button class="ui cancel button" onClick={() => { setOpen() }}>Cancel</Button>
        //        <div class="ui green button">Create</div>
        //    </div>;

        let tableData = null;

        

        if (customersList != "") {
            tableData = customersList.map(customers =>
                <tr key={customers.id}>
                    <td className="two wide">{customers.name}</td>
                    <td className="five wide">{customers.address}</td>
                    <td className="two wide">
                        
                        <Modal
                            trigger={<Button color='yellow'><i className="edit outline icon" ></i>Edit</Button>}
                            header='Edit Customer'
                            content={
                                <div class='content'>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input type="text" placeholder={customers.name} defaultValue={customers.name} onChange={this.changeCustomerName} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Address</label>
                                            <input type="text" placeholder={customers.address} defaultValue={customers.address}  onChange={this.changeCustomerAddress} />
                                        </Form.Field>
                                    </Form>
                                </div>
                            }
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Edit', content: 'Edit', onClick: this.updateCustomer.bind(this, customers.id) }]}
                        />
                     
                    </td>
                    <td className="two wide">
                        {/*TODO*/}
                        <Modal
                            trigger={<Button color='red'><i className="remove icon" ></i>Delete</Button>}
                            header='Delete Customer'
                            content={`Do you want to delete Customer ID : ${customers.id}, Name : ${customers.name} ?`}
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Delete', content: 'Delete', color: 'red', onClick: this.deleteCustomer.bind(this, customers.id)}]}
                        />
                    </td>
                </tr>
            )
        }
        return (

            <React.Fragment>
                <div>
                    
                    <Modal
                            trigger={createButton}
                            header='Create Customer'
                            content={createContent}
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onClick: this.createCustomer}]}
                    />
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadDataSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadDataSortAsc}></i> </th>
                                <th className="ten wide">Address <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadAddressSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadAddressSortAsc}></i></th>
                                <th className="two wide">Actions</th>
                                <th className="two wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                        </table>


                </div>


            </React.Fragment>
        )
    }
}



//import React, { Component } from 'react';

//export class FetchCustomers extends Component {
//    static displayName = FetchCustomers.name;

//    constructor(props) {
//        super(props);
//        this.state = { forecasts: [], loading: true };
//    }

//    componentDidMount() {
//        this.populateWeatherData();
//    }

//    static renderForecastsTable(forecasts) {
//        return (
//            <table className='table table-striped' aria-labelledby="tabelLabel">
//                <thead>
//                    <tr>
//                        <th>Date</th>
//                        <th>Temp. (C)</th>
//                        <th>Temp. (F)</th>
//                        <th>Summary</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {forecasts.map(forecast =>
//                        <tr key={forecast.date}>
//                            <td>{forecast.date}</td>
//                            <td>{forecast.temperatureC}</td>
//                            <td>{forecast.temperatureF}</td>
//                            <td>{forecast.summary}</td>
//                        </tr>
//                    )}
//                </tbody>
//            </table>
//        );
//    }

//    render() {
//        let contents = this.state.loading
//            ? <p><em>Loading...</em></p>
//            : FetchData.renderForecastsTable(this.state.forecasts);

//        return (
//            <div>
//                <h1 id="tabelLabel" >Weather forecast</h1>
//                <p>This component demonstrates fetching data from the server.</p>
//                {contents}
//            </div>
//        );
//    }

//    async populateWeatherData() {
//        const response = await fetch('customers');
//        const data = await response.json();
//        this.setState({ forecasts: data, loading: false });
//    }
//}


