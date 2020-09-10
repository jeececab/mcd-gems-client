<script>
  import { Route } from 'svelte-routing';
  import { auth, currentPage } from '../../store';
  import Redirect from './Redirect.svelte';

  export let path;
</script>

{#if $auth.user}
  <Route {path}>
    <slot />
  </Route>
{:else if $currentPage === path}
  <Redirect to="/login" />
{/if}
