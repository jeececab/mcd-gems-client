<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  import { getClient, mutate } from 'svelte-apollo';
  import { auth, currentPage } from '../store';
  import { REGISTER_USER } from '../graphql/mutations';

  onMount(() => {
    if ($auth.user) {
      currentPage.set('/account');
      navigate('/account', { replace: true });
    }
  });

  const client = getClient();
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  async function handleSubmit() {
    auth.set({ ...$auth, loading: true });

    try {
      const response = await mutate(client, {
        mutation: REGISTER_USER,
        variables: { name, email, password }
      });

      if (response.data.registerUser.user) {
        auth.set({ loading: false, user: response.data.registerUser });
        currentPage.set('/account');
        navigate('account', { replace: true });
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
  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={name} type="text" placeholder="Username" required />
    <input bind:value={email} type="email" placeholder="Email address" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <input bind:value={confirmPassword} type="password" placeholder="Confirm password" required />
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>
