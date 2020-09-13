<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { mutate } from 'svelte-apollo';
  import { auth, currentPage, message, graphql } from '../store';
  import { REGISTER_USER } from '../graphql/mutations';
  import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';

  onMount(() => {
    if ($auth.user) {
      currentPage.set('/account');
      navigate('/account', { replace: true });
    }
  });

  let loading = false;
  let name = '';
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  async function handleSubmit() {
    loading = true;

    try {
      const response = await mutate($graphql, {
        mutation: REGISTER_USER,
        variables: { name, username, email, password }
      });

      if (response.data.registerUser) {
        loading = false;
        currentPage.set('/account');
        navigate('account', { replace: true });
      }
    } catch (e) {
      message.set({ content: e.message.replace('GraphQL error: ', ''), show: true });
      loading = false;
    }
  }
</script>

<style>
  form {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 1em auto 2.5em;
    width: 90%;
  }

  input {
    box-sizing: border-box;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    margin: 0.25em 0 0.75em;
    padding: 0.25em;
    width: 100%;
  }
</style>

<div class="container">
  <h2 class="txt-center">Sign up</h2>

  {#if loading}
    <LoadingSpinner />
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <input bind:value={name} type="text" placeholder="Name" required />
      <input bind:value={username} type="text" placeholder="Username" required />
      <input bind:value={email} type="email" placeholder="Email address" required />
      <input bind:value={password} type="password" placeholder="Password" required />
      <input bind:value={confirmPassword} type="password" placeholder="Confirm password" required />
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  {/if}
</div>
