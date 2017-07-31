import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withMutationState() {
  return (SourceComponent) => {
    class MutationState extends React.Component {
      state = { loading: false, error: null };

      set = ({ loading = false, error = null }) => this.setState({ loading, error });

      get loading() { return this.state.loading }

      get error() { return this.state.error }

      render() {
        const mutationState = {
          set: this.set,
          loading: this.loading,
          error: this.error
        };

        return (
          <SourceComponent
            {...this.props}
            mutationState={mutationState}
          />
        );
      }
    }

    MutationState.displayName = `MutateState(${getDisplayName(SourceComponent)})`;
    hoistNonReactStatic(MutationState, SourceComponent);
    return MutationState;
  };
}
