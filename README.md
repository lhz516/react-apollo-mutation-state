# React Apollo Mutation State

A React HOC for Apollo GraphQL mutation, provides loading & error as props.

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

### FAQ

#### Why use this HOC?

To set loading/error state in a GraphQL mutation container and get loading/error state as props in a UI component so that the UI component can be stateless.

#### Can I use Redux to achieve the same thing?

Yes. However in many cases, one loading (submitting/saving) state is only for a particular button or component. Saving one loading state in Redux store for a single button is kinda too complicated and takes time to modify. So let HOC to make it easy.

#### What's the future of this project?

Currently `react-apollo-mutation-state` only handles loading & error state of mutation, but it definitely can be more. There might be more interactions about mutation using this HOC in the future.
