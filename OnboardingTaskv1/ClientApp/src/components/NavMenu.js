import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Menu, Segment } from 'semantic-ui-react';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

      this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {
        activeItem: 'Customers'
      };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    return (
        <header>

            <div>
                <Menu pointing secondary>
                    <Menu.Item as={Link} to="/Customers"
                        name='Customers'
                        active={this.state.activeItem === 'Customers'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/Products"
                        name='Products'
                        active={this.state.activeItem === 'Products'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/Stores"
                        name='Stores'
                        active={this.state.activeItem === 'Stores'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item as={Link} to="/Sales"
                        name='Sales'
                        active={this.state.activeItem === 'Sales'}
                        onClick={this.handleItemClick}
                    />

                </Menu>

            </div>

 
      </header>
    );
  }
}
