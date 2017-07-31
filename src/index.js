import { Component, createElement } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (options = { name: 'mutation' }) => {
  return (SourceComponent) => {
    class MutationState extends Component {
      state = { loading: false, error: null };

      set = (param = { error: this.state.error }) => {
        const { loading, error } = param;
        if (typeof loading !== 'boolean') {
          throw new Error(`You must provide 'loading' in ${options.name}.set function. For example: ${options.name}.set({ loading: true })`);
        }
        this.setState({ loading, error })
      };

      get loading() { return this.state.loading }

      get error() { return this.state.error }

      render() {
        const mutation = {
          set: this.set,
          loading: this.loading,
          error: this.error
        };

        return createElement(
          SourceComponent,
          Object.assign({}, this.props, { [options.name]: mutation }),
        );
      }
    }

    MutationState.displayName = `MutateState(${getDisplayName(SourceComponent)})`;
    hoistNonReactStatic(MutationState, SourceComponent);
    return MutationState;
  };
}
