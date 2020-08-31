<script>
  import { getClient, mutate } from 'svelte-apollo';
  import { LOGIN_USER } from '../graphql/queries';

  const client = getClient();
  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      await mutate(client, {
        mutation: LOGIN_USER,
        variables: { email, password }
      });
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
