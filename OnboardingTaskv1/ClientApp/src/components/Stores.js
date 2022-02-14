import React, { useState } from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';

export class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storesList: [],
            //modalTitle: "",
            storeId: 0,
            storeName: "",
            storeAddress: ""
        };
        this.updateStore = this.updateStore.bind(this);
        //this.loadData = this.loadData.bind(this);
        //this.update = this.update.bind(this);
        //this.delete = this.delete.bind(this);
        //const [open, setOpen] = React.useState(false);
        this.loadStoreNameSortAsc = this.loadStoreNameSortAsc.bind(this);
        this.loadStoreNameSortDes = this.loadStoreNameSortDes.bind(this);
        this.loadStoreAddressSortAsc = this.loadStoreAddressSortAsc.bind(this);
        this.loadStoreAddressSortDes = this.loadStoreAddressSortDes.bind(this);
    }

    createStore = () => {
        fetch('/api/Stores/PostStore', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.storeName,
                Address: this.state.storeAddress
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.loadData();
            }, (error) => {
                alert('Failed');
            })
    }

    updateStore = (storeId) => {
        fetch('/api/Stores/PutStore/' + storeId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: storeId,
                Name: this.state.storeName,
                Address: this.state.storeAddress
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.loadData();
            }, (error) => {
                this.loadData();
                //bug here need to be fix
                //alert('Failed');
            })
    }

    deleteStore = (storeId) => {
        fetch('/api/Stores/DeleteStore/' + storeId, {
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

    loadData() {
        fetch('/api/Stores/GetStore')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });

    }

    loadStoreNameSortAsc() {
        fetch('/api/Stores/GetStoreNameSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });

    }

    loadStoreNameSortDes() {

        fetch('/api/Stores/GetStoreNameSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });

    }

    loadStoreAddressSortAsc() {

        fetch('/api/Stores/GetStoreAddressSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });

    }

    loadStoreAddressSortDes() {

        fetch('/api/Stores/GetStoreAddressSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });

    }

    componentDidMount() {
        this.loadData();
    }

    changeStoreName = (e) => {
        this.setState({
            storeName: e.target.value,
        });
    }
    changeStoreAddress = (e) => {
        this.setState({
            storeAddress: e.target.value,
        });
    }

    render() {

        let storesData = this.state;

        let storesList = this.state.storesList;

        let createButton = <button style={{ marginTop: 10 }} class="ui primary button" id="createButton" onClick={() => this.createClick}>New Store</button>;

        let createContent =
            <div class="content">
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input type="text" placeholder='Name' value={this.storeName} onChange={this.changeStoreName} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <input type="text" placeholder='Address' value={this.storeAddress} onChange={this.changeStoreAddress} />
                    </Form.Field>
                </Form>
            </div>;

        let tableData = null;

        if (storesList != "") {
            tableData = storesList.map(stores =>
                <tr key={stores.id}>
                    <td className="two wide">{stores.name}</td>
                    <td className="five wide">{stores.address}</td>
                    <td className="two wide">

                        <Modal
                            trigger={<Button color='yellow'><i className="edit outline icon" ></i>Edit</Button>}
                            header='Edit Store'
                            content={
                                <div class='content'>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input type="text" placeholder={stores.name} onChange={this.changeStoreName} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Address</label>
                                            <input type="text" placeholder={stores.address} onChange={this.changeStoreAddress} />
                                        </Form.Field>
                                    </Form>
                                </div>
                            }
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Edit', content: 'Edit', onClick: this.updateStore.bind(this, stores.id) }]}
                        />

                    </td>
                    <td className="two wide">
                        {/*TODO*/}
                        <Modal
                            trigger={<Button color='red'><i className="remove icon" ></i>Delete</Button>}
                            header='Delete Store'
                            content={`Do you want to delete Store ID : ${stores.id}, Name : ${stores.name} ?`}
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Delete', content: 'Delete', color: 'red', onClick: this.deleteStore.bind(this, stores.id) }]}
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
                        header='Create Store'
                        content={createContent}
                        //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                        actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onClick: this.createStore }]}
                    />
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadStoreNameSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadStoreNameSortAsc}></i></th>
                                <th className="ten wide">Address <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadStoreAddressSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadStoreAddressSortAsc}></i></th>
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