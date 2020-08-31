<script>
  import ApolloClient from 'apollo-boost';
  import { setClient } from 'svelte-apollo';
  import { Router, Route /* , Link */ } from 'svelte-routing';
  import Header from './components/UI/Header.svelte';
  import Home from './pages/Home.svelte';
  import LogIn from './pages/LogIn.svelte';
  import SignUp from './pages/SignUp.svelte';
  export let url = ''; //This property is necessary declare to avoid ignore the Router

  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
  setClient(client);
</script>

<style>

</style>

<Router {url}>
  <Header />
  <!-- <nav>
    <Link to="/">Home</Link>
    <Link to="signup">SignUp</Link>
  </nav> -->
  <Route path="signup" component={SignUp} />
  <Route path="login" component={LogIn} />
  <Route path="/">
    <Home />
  </Route>

</Router>
