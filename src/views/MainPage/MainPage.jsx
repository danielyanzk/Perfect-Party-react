import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Footer from "components/Footer/Footer.jsx";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

import MaterialTable from 'material-table';
import axios from 'axios';
import ls from 'local-storage';

class MainPage extends React.Component {

  constructor(props) {
    let events = [
      { eventId: '2', title: 'Mehmet', location: 'Baran', budget: 1987, menu: 63 },
      { eventId: '12', title: 'Zerya Betül', menu: 'Baran', flower: 2017, budget: 34, },
    ]
    let columns = [
      { title: 'Event Id', field: 'eventId'},
      { title: 'Title', field: 'title' },
      { title: 'Number of Invitees', field: 'invitees', type: 'numeric' },
      { title: 'Budget', field: 'budget', type: 'numeric' },
      { title: 'Start Date', field: 'start', type: 'date' },
      { title: 'End Date', field: 'end', type: 'date' },
      { title: 'Location', field: 'location' },
      { title: 'Menu', field: 'menu' },
      { title: 'Flower', field: 'flower' },
      { title: 'Music', field: 'music' },
    ]
    super(props);
    this.state = {
      columns: columns,
      events: events,
      clientId: ls.get('clientId'),
      eventId: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3003/').then(res => {
      console.log(res.data)
      this.setState({
        events: res.data
      });
    })
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          brand="Perfect Party"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax image={require("assets/img/p7.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Perfect Event</h1>
                  <h3 className={classes.subtitle}>
                    A web application to plan your best event.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <MaterialTable
          title="All Events"
          columns={this.state.columns}
          data={this.state.events}
          actions={[
            {
              icon: 'save',
              tooltip: 'Favourite',
              onClick: (event, rowData) => {
                // Do favourtie operation
                let data = {
                  clientId: this.state.clientId,
                  eventId: rowData['eventId']
                }
                console.log('favourite event')
                console.log('log data')
                console.log(data)
                axios.post('http://localhost:3003/favourite', { data }).then(res => {

                })
              }
            }
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.events];
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ events : data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.events];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ events : data });
                }, 600);
              }),
          }}
        />
        <Footer />

      </div>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(componentsStyle)(MainPage);
