<script>
  import ApolloClient from 'apollo-boost';
  import { setClient, query } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import { Router, Route /* , Link */ } from 'svelte-routing';
  import { ME } from './graphql/queries';
  import { auth } from './store';
  import Header from './components/UI/Header.svelte';
  import Home from './pages/Home.svelte';
  import LogIn from './pages/LogIn.svelte';
  import SignUp from './pages/SignUp.svelte';
  export let url = ''; //This property is necessary declare to avoid ignore the Router

  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql', credentials: 'include' });
  setClient(client);

  const me = query(client, {
    query: ME
  });

  onMount(async () => {
    auth.set({ ...$auth, loading: true });
    const result = await me.result();
    if (result.data.me.user) {
      auth.set({ loading: false, logged: true });
    } else {
      auth.set({ ...$auth, loading: false });
    }
  });
</script>

<style>

</style>

{#if $auth.loading}
  <p>Loading...</p>
{:else}
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
{/if}
