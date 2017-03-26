import React, { Component } from 'react';
import axios from 'axios';
import Icon from '../Icon/Icon';
import RouteIcon from '../RouteIcon/RouteIcon';
import './RouteComponent.css';

export default class RouteComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      route: { stops: [] }
    }
  }

  componentDidMount() {
    const { id } = this.props.routeProps.match.params;
    axios.get(`/api/routes/${id}`)
      .then(response => {
        console.log(response);
        this.setState({ route: response.data })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { toggleView, routeProps } = this.props;
    const { route } = this.state;
    const trip = {
      routeShortName: route.shortName,
      routeId: route.id
    }
    return route.id
      ? <div className="RouteComponent">
          <header>
            <div onClick={ () => { routeProps.history.push('/map') } }>
              <Icon i="arrow-left" />
            </div>
            <div className="details">
              <RouteIcon arrival={ trip } />
              <h4>{ route.description }</h4>
            </div>
            <div onClick={ toggleView }>
              <Icon i="map"/>
            </div>
          </header>
          <div className="stops">
            {
              route.stops.map(stop =>
                <div
                  className="stop"
                  key={ stop.id }
                  onClick={ () => {routeProps.history.push(`/map/stops/${stop.id}`)} }
                >
                  <img
                    src={`/icons/stops/${stop.direction}.svg`}
                    alt='stop icon'
                  />
                  {stop.name}
                </div>
              )
            }
          </div>
        </div>
      : <div className="RouteComponent" />
  }
}
