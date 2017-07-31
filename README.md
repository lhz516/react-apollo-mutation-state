# React Apollo Mutation State

A React higher order component for Apollo GraphQL mutation, provides mutation loading state as props.

### Usage
Install from NPM
```
$ npm i react-apollo-mutation-state --save
```
Config the HOC
```js
import mutationState from 'react-apollo-mutation-state';

const withMutationState = mutationState({
  // name - {String} Optional. Default: 'mutation'
  // Variable name of the object for passing to props.
  name: 'mutation'
});
```
```js
// For default config
const withMutationState = mutationState();
```
The higher order component `withMutationState` passes an object to props, default called `mutation`.

#### API's for the injected `mutation` object
|API|Type|Description|
|-|-|-|
|mutation.set|Function {Object}|Set loading & error state|
|mutation.loading|Boolean|Read only. Current loading state|
|mutation.error|Object \| Null|Read only. Error object if any|

```js
mutation.set({
  loading: true, // {Boolean} Required, Default: true
  error: null // {Object|Null} Optional, Default: null
});
```

### Example

```js
import mutationState from 'react-apollo-mutation-state';
import { graphql } from 'react-apollo';

const MyComponent = ({submit, mutation}) => (
  <form onSubmit={submit}>
    <input type="text" name="message" />
    {
      mutation.loading ?
        <button disabled>Loading...</button> :
        <button type="submit">Send</button>
    }
    <p>{mutation.error ? mutation.error.message : null}</p>
  </form>
);

const withData = graphql(PARSED_SUBMIT_MUTATION, {
  props: ({mutate, ownProps}) => ({
    const { mutation } = ownProps;
    submit: e => {
      e.preventDefault();
      mutation.set({ loading: true });
      mutate({
        variables: {
          message: e.target.message.value
        },
      }).then(() => {
        mutation.set({ loading: false, error: null });
      }).catch(error => {
        mutation.set({ loading: false, error });
      });
    },
  }),
});

const withMutationState = mutationState();

export default withMutationState(withData(MyComponent));
```
