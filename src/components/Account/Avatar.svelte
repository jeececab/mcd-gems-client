<script>
  import { auth, graphql } from '../../store';
  import { mutate } from 'svelte-apollo';
  import { UPLOAD_AVATAR } from '../../graphql/mutations.js';

  let isDisplayed = false;
  let isLoading = false;

  function toggleModal() {
    isDisplayed = !isDisplayed;
  }

  function handleClick() {
    document.getElementById('selectAvatar').click();
  }

  async function handleDelete() {
    console.log('delete');
    // await delete avatar mutation
    toggleModal();
  }

  async function handleChange(target) {
    const {
      validity: { valid },
      files: [file]
    } = target;

    const response = await mutate($graphql, {
      mutation: UPLOAD_AVATAR,
      variables: { file }
    });

    auth.set({ ...auth, user: response.data.uploadAvatar });
    isDisplayed = false;
  }
</script>

<style>
  .imgWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--white);
    cursor: pointer;
    border-radius: 0px;
    height: 115px;
    width: 115px;
    margin: 0 auto;
    overflow: hidden;
  }

  .imgWrapper p {
    color: var(--black);
  }

  .imgWrapper img {
    height: 100%;
    width: 100%;
  }

  .imgChange {
    cursor: pointer;
    font-size: 0.75em;
    margin-top: 5px;
    text-align: center;
  }

  .imgChange:hover {
    color: var(--red);
  }

  .modalContainer {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }

  .modalBackdrop {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  .modalContent {
    border-radius: 10px;
    position: relative;
    background: var(--white);
    margin: 5em auto 0;
    padding: 1.5em 0 1.25em;
    width: 90%;
    max-width: 500px;
    z-index: 3;
  }

  .modalImgWrapper {
    border: 2px solid var(--darkblue);
    border-radius: 0px;
    height: 160px;
    width: 160px;
    margin: 0 auto;
    overflow: hidden;
  }

  .modalImgWrapper img {
    height: 100%;
    width: 100%;
  }

  .modalButtons {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 1em;
  }

  .modalButtons button {
    margin: 0.25em 0;
  }

  input {
    display: none;
  }
</style>

<div class="avatarSection">
  <div on:click={toggleModal} class="imgWrapper">
    {#if $auth.user.avatar && !isLoading}
      <img src="data:image/png;base64, {$auth.user.avatar}" alt="User avatar" />
    {:else if !isLoading}
      <img src="/images/portrait_placeholder.jpg" alt="Portrait placeholder" />
    {:else if isLoading}
      <p>Loading...</p>
    {/if}
  </div>

  <p class="imgChange" onClick={toggleModal}>Change profile photo</p>

  {#if isDisplayed}
    <div class="modalContainer">
      <div on:click={toggleModal} class="modalBackdrop" />

      <div class="modalContent">
        <div class="modalImgWrapper">
          {#if !isLoading && $auth.user.avatar}
            <img src="data:image/png;base64, {$auth.user.avatar}" alt="Avatar" />
          {:else}<img src="/images/portrait_placeholder.jpg" alt="Placeholder avatar" />{/if}
        </div>

        <div class="modalButtons">
          <button on:click={handleClick} class="btn btn-secondary">Upload photo</button>
          <button on:click={handleDelete} class="btn btn-secondary--outline">Remove current photo</button>
          <button on:click={toggleModal} class="btn btn-primary--outline">Cancel</button>
        </div>

        <input on:change={e => handleChange(e.target)} id="selectAvatar" type="file" name="image" required />
      </div>
    </div>
  {/if}
</div>
