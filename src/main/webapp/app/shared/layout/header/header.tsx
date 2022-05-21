import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import {Navbar, Nav, NavbarToggler, Collapse, DropdownItem, Button} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import {Link, useHistory} from "react-router-dom";

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import {languages, locales} from "app/config/translation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };


  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="sm" fixed="top" className="bg-primary">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
            )}

            {props.isAuthenticated && (
              <NavDropdown name="Posts Dashboard">
                <DropdownItem onClick={()=>{
                  history.push("/post");
                }} name="post something">Post</DropdownItem>
              </NavDropdown>
            )}

            {props.isAuthenticated && (
              <Button tag={Link} to={`/post`} color="primary">
                <span className="d-none d-md-inline"><Translate contentKey="entity.action.view">View</Translate></span>
              </Button>
            )}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
