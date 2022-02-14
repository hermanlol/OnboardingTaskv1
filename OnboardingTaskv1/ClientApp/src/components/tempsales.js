import React, { useState } from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesList: [],
            saleId: 0,
            customerId: 0,
            productId: 0,
            storeId: 0,
            dateSold: new Date()
        };
        //this.updatesale = this.updatesale.bind(this);
    }

    //createproduct = () => {
    //    fetch('/api/Products/PostProduct', {
    //        method: 'POST',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            Name: this.state.productName,
    //            Price: this.state.productPrice
    //        })
    //    })
    //        .then(res => res.json())
    //        .then((result) => {
    //            alert(result);
    //            this.loadData();
    //        }, (error) => {
    //            alert('Failed');
    //        })
    //}

    //updateproduct = (productId) => {
    //    fetch('/api/Products/Putproduct/' + productId, {
    //        method: 'PUT',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({
    //            Name: this.state.productName,
    //            Price: this.state.productPrice
    //        })
    //    })
    //        .then(res => res.json())
    //        .then((result) => {
    //            alert(result);
    //            this.loadData();
    //        }, (error) => {
    //            this.loadData();
    //            //bug here need to be fix
    //            //alert('Failed');
    //        })
    //}

    //deleteproduct = (productId) => {
    //    fetch('/api/Products/Deleteproduct/' + productId, {
    //        method: 'DELETE',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        }
    //    })
    //        .then(res => res.json())
    //        .then((result) => {
    //            alert(result);
    //            this.loadData();
    //        }, (error) => {
    //            this.loadData();
    //        })
    //}

    loadData() {
        fetch('/api/Products/GetSalesAllData')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });

    }

    componentDidMount() {
        this.loadData();
    }

    changeProductName = (e) => {
        this.setState({
            productName: e.target.value,
        });
    }
    changeProductPrice = (e) => {
        this.setState({
            productPrice: e.target.value,
        });
    }
    render() {

        let salesList = this.state.salesList;

        let tableData = null;

        if (salesList != "") {
            tableData = salesList.map(sales =>
                <tr key={sales.id}>
                    <td className="two wide">{sales.customerName}</td>
                    <td className="two wide">{sales.productName}</td>
                    <td className="two wide">{sales.storeName}</td>
                    <td className="two wide">{sales.dateSold}</td>
                    {/*<td className="two wide">*/}

                    {/*    <Modal*/}
                    {/*        trigger={<Button color='yellow'><i className="edit outline icon" ></i>Edit</Button>}*/}
                    {/*        header='Edit Product'*/}
                    {/*        content={*/}
                    {/*            <div class='content'>*/}
                    {/*                <Form>*/}
                    {/*                    <Form.Field>*/}
                    {/*                        <label>Name</label>*/}
                    {/*                        <input type="text" placeholder={products.name} onChange={this.changeProductName} />*/}
                    {/*                    </Form.Field>*/}
                    {/*                    <Form.Field>*/}
                    {/*                        <label>Price</label>*/}
                    {/*                        <input type="text" placeholder={products.price} onChange={this.changeProductPrice} />*/}
                    {/*                    </Form.Field>*/}
                    {/*                </Form>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}*/}
                    {/*        actions={['Cancel', { key: 'Edit', content: 'Edit', onClick: this.updateproduct.bind(this, products.id) }]}*/}
                    {/*    />*/}

                    {/*</td>*/}
                    {/*<td className="two wide">*/}
                    {/*    */}{/*TODO*/}
                    {/*    <Modal*/}
                    {/*        trigger={<Button color='red'><i className="remove icon" ></i>Delete</Button>}*/}
                    {/*        header='Delete Product'*/}
                    {/*        content={`Do you want to delete Product ID : ${products.id}, Name : ${products.name} ?`}*/}
                    {/*        //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}*/}
                    {/*        actions={['Cancel', { key: 'Delete', content: 'Delete', color: 'red', onClick: this.deleteproduct.bind(this, products.id) }]}*/}
                    {/*    />*/}
                    {/*</td>*/}
                </tr>
            )
        }
        return (

            <React.Fragment>
                <div>

                    {/*<Modal*/}
                    {/*    trigger={createButton}*/}
                    {/*    header='Create Product'*/}
                    {/*    content={createContent}*/}
                    {/*    //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}*/}
                    {/*    actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onClick: this.createProduct }]}*/}
                    {/*/>*/}
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="ten wide">Price</th>
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