import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Container, Grid, Icon, Segment } from 'semantic-ui-react';
import './Home.css';
import ContainerTab from './TabPanel';

class Home extends Component {
    render() {
        return (
          <div className="Home">
              <Container fluid className="top">
              <Grid columns='equal'>
              <Grid.Column className="carlogo">
               <a href="/aq-index" id="carlogoimg">
               <img src="https://instacar.in/wp-content/themes/instacar/images/Insta-car-01-2.png" alt="instacar-logo" />
               </a>
              </Grid.Column>
              <Grid.Column width={8}>
                  
              </Grid.Column>
              <Grid.Column className="support">
               <a href="tel:+91-9902202299">
               <Icon inverted id="supporticon" name='phone' size='large' color="grey"/>
               </a>
               <span id="supportort" style={{color: 'white', fontWeight: 'bolder'}}>24x7 Support</span>
               <span id="supportnumber" style={{color: 'white', fontWeight: 'bolder'}}>+91-9902202299</span>
              </Grid.Column>
              </Grid>
              </Container>
              <Container fluid className="top1">
              <Grid id="top1content" style={{marginBottom: '30px'}}>
                <Grid.Column width={16}>
                <h1 id="top1contenttext" style={{color: 'white'}}>Chauffeur Driven, On Demand.</h1>
                </Grid.Column>
              </Grid>
              <Container>
              <Grid>
                <Segment style={{width: '100%', background: 'border-box'}}>
                  <ContainerTab />
                </Segment>
              </Grid>
              </Container>
              </Container>
            </div>
          );
    }
}

export default Home;
