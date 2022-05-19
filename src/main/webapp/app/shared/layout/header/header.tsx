import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import {Navbar, Nav, NavbarToggler, Collapse, DropdownItem} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { useHistory } from "react-router-dom";

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import {languages, locales} from "app/config/translation";

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

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

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

            {/*TODO: DO this when comments are loaded on posts age - it has something to do with dispatcher*/}
            {props.isAuthenticated && props.isAdmin && (
              <EntitiesMenu />
            )}
            <NavDropdown name="Posts Dashboard">
              <DropdownItem onClick={()=>{
                history.push("/post");
              }} name="post something">Post</DropdownItem>
            </NavDropdown>
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
