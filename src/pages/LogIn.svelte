<script>
  import { getClient, mutate } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import { auth, currentPage } from '../store';
  import { navigate } from 'svelte-routing';
  import { LOGIN_USER } from '../graphql/mutations';

  onMount(() => {
    if ($auth.logged) {
      currentPage.set('/account');
      navigate('/account', { replace: true });
    }
  });

  const client = getClient();
  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      const response = await mutate(client, {
        mutation: LOGIN_USER,
        variables: { email, password }
      });

      if (response.data.loginUser.user) {
        auth.set({ loading: false, logged: true });
        currentPage.set('/account');
        navigate('/account', { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
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

<div class="container">
  <form on:submit|preventDefault={handleSubmit} className="form">
    <input bind:value={email} type="email" placeholder="Email address" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>
