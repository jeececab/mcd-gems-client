<script>
  import { mutate } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import { auth, currentPage, graphql, message } from '../store';
  import { navigate } from 'svelte-routing';
  import { LOGIN_USER } from '../graphql/mutations';
  import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';

  onMount(() => {
    if ($auth.user) {
      currentPage.set('/account');
      navigate('/account', { replace: true });
    }
  });

  let isLoading = false;
  let email = '';
  let password = '';

  async function handleSubmit() {
    isLoading = true;

    try {
      auth.set({ ...$auth });
      const response = await mutate($graphql, {
        mutation: LOGIN_USER,
        variables: { email, password }
      });

      if (response.data.loginUser) {
        auth.set({ user: response.data.loginUser });
        currentPage.set('/account');
        navigate('/account', { replace: true });
      }
    } catch (e) {
      message.set({ content: e.message.replace('GraphQL error: ', ''), show: true });
      auth.set({ ...$auth });
    }

    isLoading = false;
  }
</script>

<style>
  form {
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 2.5em auto;
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

{#if isLoading}
  <LoadingSpinner />
{:else}
  <div class="container">
    <form on:submit|preventDefault={handleSubmit} className="form">
      <input bind:value={email} type="email" placeholder="Email address" required />
      <input bind:value={password} type="password" placeholder="Password" required />
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
{/if}
