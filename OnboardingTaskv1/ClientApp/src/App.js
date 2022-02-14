import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchCustomers } from './components/FetchCustomers';
import { Stores } from './components/Stores';
import { Sales } from './components/Sales';
import { Products } from './components/Products';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={FetchCustomers} />

        <Route path='/Customers' component={FetchCustomers} />
        <Route path='/Stores' component={Stores} />
        <Route path='/Sales' component={Sales} />
        <Route path='/Products' component={Products} />
                

      </Layout>
    );
  }
}
