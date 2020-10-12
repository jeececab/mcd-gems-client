<script>
  import { auth, graphql } from '../../store';
  import { mutate } from 'svelte-apollo';
  import { UPLOAD_ACCOUNT_INFO } from '../../graphql/mutations';
  import LoadingSpinner from '../UI/LoadingSpinner.svelte';

  let isLoading = false;

  async function handleSubmit(e) {
    isLoading = true

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bio = e.target.bio.value;

    const response = await mutate($graphql, {
      mutation: UPLOAD_ACCOUNT_INFO,
      variables: { name, email, bio }
    });

    auth.set({ ...auth, user: response.data.uploadAccountInfo });

    isLoading = false
  }
</script>

<style>
  .form {
    border: 1px solid var(--darkblue);
    padding: 1em 1em 0;
    margin: 1.5em 0;
    width: 100%;
  }

  h2 {
    margin: 0 0 1em;
  }

  p {
    font-weight: bold;
  }

  input {
    box-sizing: border-box;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    margin: 0.5em 0 0.75em;
    padding: 0.25em;
    width: 100%;
  }

  textarea {
    box-sizing: border-box;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    margin: 0.5em 0 0.75em;
    padding: 0.25em;
    resize: vertical;
    min-height: 4em;
    max-height: 7.45em;
    width: 100%;
  }

  button {
    display: block;
    margin: 1.5em auto;
  }
</style>

<form on:submit|preventDefault={handleSubmit} class="form">
  <h2>Account info</h2>

  {#if !isLoading}
    <p><label for="name">Name</label> <input name="name" type="text" value={$auth.user.name} /></p>
    <p><label for="email">Email</label> <input name="email" type="text" value={$auth.user.email} /></p>
    <p><label for="bio">Bio</label> <textarea name="bio" style={{}} value={$auth.user.bio} /></p>
    <button class="btn btn-primary" type="submit"> Save info </button>
  {:else}
    <LoadingSpinner />
  {/if}
</form>
