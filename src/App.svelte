<script>
  import ApolloClient from 'apollo-boost';
  import { setClient, query } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { ME } from './graphql/queries';
  import { auth } from './store';
  import Header from './components/UI/Header.svelte';
  import Home from './pages/Home.svelte';
  import LogIn from './pages/LogIn.svelte';
  import SignUp from './pages/SignUp.svelte';
  import LoadingSpinner from './components/UI/LoadingSpinner.svelte';
  import Message from './components/UI/Message.svelte';
  import PrivateRoute from './components/Routing/PrivateRoute.svelte';
  import Account from './pages/Account.svelte';
  export let url = ''; //This property is necessary declare to avoid ignore the Router

  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql', credentials: 'include' });
  setClient(client);

  const me = query(client, {
    query: ME
  });

  onMount(async () => {
    auth.set({ ...$auth, loading: true });

    //await new Promise(res => setTimeout(() => res(true), 2000));

    const result = await me.result();

    if (result.data.me) {
      auth.set({ loading: false, user: result.data.me });
    } else {
      auth.set({ ...$auth, loading: false });
    }
  });
</script>

<style>
</style>

{#if $auth.loading}
  <LoadingSpinner />
{:else}
  <Header />

  <Router {url}>
    <Route path="signup">
      <SignUp />
    </Route>

    <Route path="login">
      <LogIn />
    </Route>

    <PrivateRoute path="/account">
      <Account />
    </PrivateRoute>

    <Route path="/">
      <Home />
    </Route>
  </Router>
{/if}

<Message />
