import React, { useState } from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import { format } from 'date-fns';

export class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesList: [],
            customersList: [],
            productsList: [],
            storesList: [],
            saleId: 0,
            customerId: 0,
            productId: 0,
            storeId: 0,
            dateSold: format(new Date(), 'MM/dd/yyyy')
        };
        this.updateSale = this.updateSale.bind(this);
        this.loadSaleCustomerSortAsc = this.loadSaleCustomerSortAsc.bind(this);
        this.loadSaleCustomerSortDes = this.loadSaleCustomerSortDes.bind(this);
        this.loadSaleProductSortAsc = this.loadSaleProductSortAsc.bind(this);
        this.loadSaleProductSortDes = this.loadSaleProductSortDes.bind(this);
        this.loadSaleStoreSortAsc = this.loadSaleStoreSortAsc.bind(this);
        this.loadSaleStoreSortDes = this.loadSaleStoreSortDes.bind(this);
        this.loadSaleDateSortAsc = this.loadSaleDateSortAsc.bind(this);
        this.loadSaleDateSortDes = this.loadSaleDateSortDes.bind(this);
    }

    loadData() {
        fetch('api/Sales/GetSalesAllData')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleCustomerSortAsc() {
        fetch('api/Sales/GetSalesCustomerSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleCustomerSortDes() {
        fetch('api/Sales/GetSalesCustomerSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }
    
    loadSaleProductSortAsc() {
        fetch('api/Sales/GetSalesProductSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleProductSortDes() {
        fetch('api/Sales/GetSalesProductSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleStoreSortAsc() {
        fetch('api/Sales/GetSalesStoreSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }


    loadSaleStoreSortDes() {
        fetch('api/Sales/GetSalesStoreSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleDateSortAsc() {
        fetch('api/Sales/GetSalesDateSortedAsc')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }

    loadSaleDateSortDes() {
        fetch('api/Sales/GetSalesDateSortedDes')
            .then(response => response.json())
            .then(data => {
                this.setState({ salesList: data, dateSold: format(new Date(), 'MM/dd/yyyy') });
            });

    }
    






    loadCustomer() {
        fetch('api/Customers/GetCustomerJustData')
            .then(response => response.json())
            .then(data => {
                this.setState({ customersList: data });
            });
    }

    loadProduct() {
        fetch('api/Products/GetProductJustData')
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
    }

    loadStore() {
        fetch('api/Stores/GetStoreJust')
            .then(response => response.json())
            .then(data => {
                this.setState({ storesList: data });
            });
    }
    createSale = () => {
        fetch('api/Sales/PostSales', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductId: this.state.productId,
                CustomerId: this.state.customerId,
                StoreId: this.state.storeId,
                DateSold: this.state.dateSold
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.loadData();
            }, (error) => {
                alert('Failed');
            })
        //alert('hi');
    }


    changeDate = (e) => {
        this.setState({
            dateSold: e.target.value,
        });
    }

    handleCustomerChange = (e, { value }) => { this.setState({ customerId: value }) }
    handleStoreChange = (e, { value }) => this.setState({ storeId: value })
    handleProductChange = (e, { value }) =>  this.setState({ productId: value })

    updateSale = (saleId) => {
        fetch('/api/Sales/PutSales/' + saleId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: saleId,
                ProductId: this.state.productId,
                CustomerId: this.state.customerId,
                StoreId: this.state.storeId,
                DateSold: this.state.dateSold
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.loadData();
            }, (error) => {

                this.loadData();
            })
    }

    deleteSale = (saleId) => {
        fetch('/api/Sales/DeleteSales/' + saleId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                this.loadData();
            }, (error) => {
                this.loadData();
            })
    }

    componentDidMount() {
        this.loadData();
        this.loadCustomer();
        this.loadProduct();
        this.loadStore();
    }

    changedateSold = (e) => {
        this.setState({
            dateSold: e.target.value,
        });
    }
    changeStoreId = (e) => {
        this.setState({
            storeId: e.target.value,
        });
    }
    changeProductId = (e) => {
        this.setState({
            productId: e.target.value,
        });
    }
    render() {

        let salesList = this.state.salesList;

        //Fetching customers id and name
        let customersList = this.state.customersList;
        const customersOptions = customersList.map(customer => ({
            key: customer.customerId,
            text: customer.customerName,
            value: customer.customerId
        }));
        //Fetching Products Id and name

        let productsList = this.state.productsList;
        const productsOptions = productsList.map(product => ({
            key: product.productId,
            text: product.productName,
            value: product.productId
        }));

        //Fetching Store ID and name
        let storesList = this.state.storesList;
        const storesOptions = storesList.map(store => ({
            key: store.storeId,
            text: store.storeName,
            value: store.storeId
        }));

        let createButton = <button style={{ marginTop: 10 }} class="ui primary button" id="createButton" >New Sales</button>;

        let tableData = null;

        const { value } = this.state;

        let createContent =
            <div class="content">
                <Form>
                    <Form.Field>
                        <label>Date</label>
                        <input type="text" defaultValue={this.state.dateSold} onChange={this.changedateSold} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown placeholder="Customer Name" search selection options={customersOptions} onChange={this.handleCustomerChange} value={value} />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown placeholder="Product Name" search selection options={productsOptions} onChange={this.handleProductChange} value={value} />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown placeholder="Store Name" search selection options={storesOptions} onChange={this.handleStoreChange} value={value} />
                    </Form.Field>
                </Form>
            </div>;

        if (salesList != "") {
            tableData = salesList.map(sales =>
                <tr key={sales.id}>
                    <td className="two wide">{sales.customerName}</td>
                    <td className="two wide">{sales.productName}</td>
                    <td className="two wide">{sales.storeName}</td>
                    <td className="two wide">{sales.dateSold.slice(0, 10)}</td>

                    <td className="two wide">

                        <Modal
                            trigger={<Button color='yellow'><i className="edit outline icon" ></i>Edit</Button>}
                            header='Edit Sale'
                            content={
                                <div class='content'>
                                    <Form>
                                        <Form.Field>
                                            <label>Date</label>
                                            <input type="text" defaultValue={`${sales.dateSold.slice(5, 7)}/${sales.dateSold.slice(8, 10)}/${sales.dateSold.slice(0, 4)}`} onChange={this.changeDate} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Customer Name</label>
                                            <Dropdown search selection options={customersOptions} onChange={this.handleCustomerChange} placeholder={sales.customerName} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Product</label>
                                            <Dropdown search selection options={productsOptions} onChange={this.handleProductChange} placeholder={sales.productName} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Store</label>
                                            <Dropdown search selection options={storesOptions} onChange={this.handleStoreChange} placeholder={sales.storeName} />
                                        </Form.Field>
                                    </Form>
                                </div>
                            }
                            //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Edit', content: 'Edit', onClick: this.updateSale.bind(this, sales.id) }]}
                        />

                    </td>
                    <td className="two wide">
                        <Modal
                            trigger={<Button color='red'><i className="remove icon" ></i>Delete</Button>}
                            header='Delete Sale'
                            content={`Do you want to delete Sale ID : ${sales.id}?`}
                           //actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onActionClick: (event: onClick = {create},data: 'hi') }]}
                            actions={['Cancel', { key: 'Delete', content: 'Delete', color: 'red', onClick: this.deleteSale.bind(this, sales.id) }]}
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
                        actions={['Cancel', { key: 'Create', content: 'Create', positive: true, onClick: this.createSale }]}
                    />
                    
                    <table className="ui celled striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Customer <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadSaleCustomerSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadSaleCustomerSortAsc}></i></th>
                                <th className="two wide">Product <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadSaleProductSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadSaleProductSortAsc}></i></th>
                                <th className="two wide">Store <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadSaleStoreSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadSaleStoreSortAsc}></i></th>
                                <th className="two wide">DateSold <i aria-hidden="true" class="chevron fitted up icon" onClick={this.loadSaleDateSortDes}></i><i aria-hidden="true" class="chevron fitted down icon" onClick={this.loadSaleDateSortAsc}></i></th>
                                <th className="two wide">Action</th>
                                <th className="two wide">Action</th>
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