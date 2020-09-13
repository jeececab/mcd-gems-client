<script>
  import apolloClient from './graphql/svelte-apollo';
  import { setClient, query, getClient } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { ME } from './graphql/queries';
  import { auth, graphql } from './store';
  import Header from './components/UI/Header.svelte';
  import Home from './pages/Home.svelte';
  import LogIn from './pages/LogIn.svelte';
  import SignUp from './pages/SignUp.svelte';
  import LoadingSpinner from './components/UI/LoadingSpinner.svelte';
  import Message from './components/UI/Message.svelte';
  import PrivateRoute from './components/Routing/PrivateRoute.svelte';
  import Account from './pages/Account.svelte';

  export let url = ''; //This property is necessary declare to avoid ignore the Router

  setClient(apolloClient);
  graphql.set(getClient())

  const me = query($graphql, {
    query: ME
  });

  onMount(async () => {
    try {
      auth.set({ ...$auth, loading: true });
      const result = await me.result();
      auth.set({ loading: false, user: result.data.me });
    } catch (error) {
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
    <Route path="/signup">
      <SignUp />
    </Route>

    <Route path="/login">
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
