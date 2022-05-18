import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert,List } from 'reactstrap';

import { getLoginUrl, REDIRECT_URL } from 'app/shared/util/url-utils';
import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  useEffect(() => {
    const redirectURL = localStorage.getItem(REDIRECT_URL);
    if (redirectURL) {
      localStorage.removeItem(REDIRECT_URL);
      location.href = `${location.origin}${redirectURL}`;
    }
  });

  const imgStyle = {
    maxHeight: 128,
    maxWidth: 128
  }


  return (
    <Row>
      <Col md="4" className="pad">
        <span className="nowar rounded" />
      </Col>
      <Col md="8">
        <h2>
          <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
        </h2>
        <p className="lead">
          <Translate contentKey="home.subtitle">This is your homepage</Translate>
        </p>
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">Please </Translate>
              <a href={getLoginUrl()} className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
              </a>

              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </Alert>
          </div>
        )}

        <p>This project was designed to <span style={{fontWeight: 'bold'}}> help people who are inside war zones</span>.</p>
        <p>We do not want anyone to go through this experience, but to improve the lives of people who are stuck in these areas we created the <span style={{fontWeight: 'bold'}}>IHELP</span> application.</p>
        <p>This way, people in these situations can use our app to distribute ads. You can post 3 different types of ads: request, offer and announcement.</p>
        <List >
        <li><span style={{fontWeight: 'bold'}}>Request ad</span> means that you need something (like medical supplies, food, even a baby stroller).</li>
        <li><span style={{fontWeight: 'bold'}}>Offer ad</span> means that you have a surplus of items and you are willing to give away some of them.</li>
        <li><span style={{fontWeight: 'bold'}}>Announcement ad</span> means that you want to do an announcement, in which to announce latest news or to say that an area is unsafe for civillians.</li>
        </List>
        <p>
          <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
        </p>

        <ul>
          <li>
            <a href="mailto: radurbalaux@yahoo.com" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.homepage">radurbalaux@yahoo.com</Translate>
            </a>
          </li>



          <li>
            <a href="mailto: andraxvasiclache@yahoo.com" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.bugtracker">andraxvasiclache@yahoo.com</Translate>
            </a>
          </li>
          <li>
            <a href="https://github.com/AndraVasilache/ihelp" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.chat">Project github</Translate>
            </a>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default Home;
