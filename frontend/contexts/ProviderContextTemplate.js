import React from 'react'

const Context = React.createContext({});
const initialContext = {
  litCeramicIntegration: null
};
import { Integration } from "lit-ceramic-sdk";
import { isLoaded } from '../utils/isLoaded';



// Custom Provider
class Provider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      context: initialContext
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      const lit = new Integration(
        "https://ceramic-clay.3boxlabs.com",
        "mumbai"
      );
      this.setState({litCeramicIntegration: lit});
      lit.startLitClient(window);
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}



// Custom Consumer
class Consumer extends React.Component {
  render() {
    const {children} = this.props;

    return (
      <Context.Consumer>
        { ({context, setContext}) => children(context, setContext) }
      </Context.Consumer>
    );
  }
}



// ContextualComponent HOC
const withConsumer = (Component) => {
  if (isLoaded())
  return function ContextualComponent(props) {
    return (
      <Context.Consumer>
        { (consumer) => <Component {...props} consumer={consumer} /> }
      </Context.Consumer>
    );
  };
}



// Export Methods
export default {Provider, Consumer, withConsumer};