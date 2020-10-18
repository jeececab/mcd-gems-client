<script>
  import { graphql, message } from '../../store';
  import { mutate } from 'svelte-apollo';
  import { CHANGE_PASSWORD } from '../../graphql/mutations';
  import LoadingSpinner from '../UI/LoadingSpinner.svelte';

  let isLoading = false;

  let oldPassword = '';
  let newPassword = '';
  let confirmNewPassword = '';

  async function handleSubmit(e) {
    isLoading = true;

    if (newPassword !== confirmNewPassword) {
      message.set({ content: "New password confirmation doesn't match", show: true });
    } else {
      try {
        await mutate($graphql, {
          mutation: CHANGE_PASSWORD,
          variables: { oldPassword, newPassword }
        });

        message.set({ content: 'Success changing password', show: true });
      } catch (e) {
        message.set({ content: e.message.replace('GraphQL error: ', ''), show: true });
      }
    }

    oldPassword = '';
    newPassword = '';
    confirmNewPassword = '';
    isLoading = false;
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

  button {
    display: block;
    margin: 1.5em auto;
  }
</style>

<form on:submit|preventDefault={handleSubmit} class="form">
  <h2>Change password</h2>

  {#if !isLoading}
    <p><label for="old">Old password</label> <input bind:value={oldPassword} name="old" type="password" required /></p>
    <p><label for="new">New password</label> <input bind:value={newPassword} name="new" type="password" required /></p>
    <p>
      <label for="confirm_new">Confirm new password</label>
      <input bind:value={confirmNewPassword} name="confirm_new" type="password" required />
    </p>
    <button class="btn btn-primary" type="submit"> Save new password </button>
  {:else}
    <LoadingSpinner />
  {/if}
</form>
