import React, { Component } from 'react';
import axios from 'axios';
import RouteResult from './RouteResult';
import './RouteResults.css';

export default class RouteResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    axios.get('api/routes')
      .then(response => {
        this.setState({ routes: response.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { query, routeProps } = this.props;
    return(
      <div className="RouteResults">
        {
          query.length
          ? <header>
              <h2> Routes </h2>
            </header>
          : null
        }
        <div className="results">
          {
            this.state.routes.map(route => {
              const { shortName, description } = route;
              const exp = new RegExp(query, 'i');
              const show = query && (shortName.match(exp) || description.match(exp));

              return show
              ? <RouteResult
                  key={ route.id }
                  route={ route }
                  routeProps={ routeProps }
                />
              : null
            })
          }
        </div>
      </div>
    )
  }
}
