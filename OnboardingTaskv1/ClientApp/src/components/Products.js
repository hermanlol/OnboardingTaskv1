import React, { useState } from 'react';
import { Button, Modal, Form, TextArea, Icon } from 'semantic-ui-react';

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
            productId: 0,
            productName: "",
            productPrice: 0
        };
        this.updateProduct = this.updateProduct.bind(this);
        this.loadProductNameSortAsc = this.loadProductNameSortAsc.bind(this);
        this.loadProductNameSortDes = this.loadProductNameSortDes.bind(this);
        this.loadProductPriceSortAsc = this.loadProductPriceSortAsc.bind(this);
        this.loadProductPriceSortDes = this.loadProductPriceSortDes.bind(this);
    }

    createProduct = () => {
        fetch('api/Products/PostProduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.productName,
                Price: this.state.productPrice
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

    updateProduct = (productId) => {

        fetch('api/Products/Putproduct/' + productId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: productId,
                Name: this.state.productName,
                Price: this.state.productPrice
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

    deleteProduct = (productId) => {
        fetch('api/Products/Deleteproduct/' + productId, {
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
        fetch('/api/Products/Getproduct')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });

    }

    loadProductNameSortAsc() {

        fetch('/api/Products/GetNameSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });

    }

    loadProductNameSortDes() {

        fetch('/api/Products/GetNameSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });

    }

    loadProductPriceSortAsc() {

        fetch('/api/Products/GetPriceSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });

    }

    loadProductPriceSortDes() {

        fetch('/api/Products/GetPriceSortedDes')
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

        let ProductsData = this.state;

        let productsList = this.state.productsList;

        let createButton = <button style={{ marginTop: 10 }} class="ui primary button" id="createButton" >New Product</button>;

        let createContent =
            <div class="content">
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input type="text" placeholder='Name' value={this.productName} onChange={this.changeProductName} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input type="text" placeholder='Price' value={this.productPrice} onChange={this.changeProductPrice} />
                    </Form.Field>
                </Form>
            </div>;

        let tableData = null;

        if (productsList != "") {
            tableData = productsList.map(products =>
                <tr key={products.id}>
                    <td className="two wide">{products.name}</td>
                    <td className="five wide">{products.price}</td>
                    <td className="two wide">

                        <Modal
                            trigger={<Button color='yellow'><i className="edit outline icon" ></i>Edit</Button>}
                            header='Edit Product'
                            content={
                                <div class='content'>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <input type="text" placeholder={products.name} onChange={this.changeProductName} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Price</label>
                                            <input type="text" placeholder={products.price} onChange={this.changeProductPrice} />
                                        </Form.Field>
                                    </Form>
                                </div>
                            }
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Edit', content: 'Edit', onClick: this.updateProduct.bind(this, products.id) }]}
                        />

                    </td>
                    <td className="two wide">
                        {/*TODO*/}
                        <Modal
                            trigger={<Button color='red'><i className="remove icon" ></i>Delete</Button>}
                            header='Delete Product'
                            content={`Do you want to delete Product ID : ${products.id}, Name : ${products.name} ?`}
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Delete', content: 'Delete', color: 'red', onClick: this.deleteProduct.bind(this, products.id) }]}
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
                        header='Create Product'
                        content={createContent}
                        //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                        actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onClick: this.createProduct }]}
                    />
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadProductNameSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadProductNameSortAsc}></i></th>
                                <th className="ten wide">Price <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadProductPriceSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadProductPriceSortAsc}></i></th>
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