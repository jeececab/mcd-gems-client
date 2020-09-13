<script>
  import NavLink from './NavLink.svelte';
  import { auth, message, currentPage, graphql } from '../../store';
  import { navigate } from 'svelte-routing';
  import { mutate } from 'svelte-apollo';
  import { LOGOUT_USER } from '../../graphql/mutations';

  let displayMenu = false;

  function toggleDisplayMenu() {
    displayMenu = !displayMenu;
  }
  function closeMenu() {
    displayMenu = false;
  }
  function handleKeyDown() {}

  async function logout() {
    try {
      auth.set({ ...$auth, loading: true });
      const response = await mutate($graphql, {
        mutation: LOGOUT_USER
      });

      if (response.data.logoutUser) {
        auth.set({ loading: false, user: null });
        currentPage.set('/');
        navigate('/', { replace: true });
      }
    } catch (e) {
      message.set({ content: e.message.replace('GraphQL error: ', ''), show: true });
      auth.set({ ...$auth, loading: false });
    }
  }
</script>

<style>
  .header {
    background: var(--black);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 100%;
  }

  .logo h1 {
    color: var(--red);
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.5em;
  }

  .nav {
    border-bottom: 2px solid rgb(36, 36, 36);
    border-left: 2px solid rgb(36, 36, 36);
    padding: 30px 0 0.5em;
    position: fixed;
    top: 0;
    right: -330px;
    background: var(--black);
    min-width: 330px;
    -webkit-box-shadow: -8px 10px 16px 6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -8px 10px 16px 6px rgba(0, 0, 0, 0.75);
    box-shadow: -8px 10px 16px 6px rgba(0, 0, 0, 0.75);
    transition: right ease-in-out 0.125s;
  }

  .nav.activeMenu {
    right: 0px;
  }

  .navList {
    margin: 0;
    padding: 0;
  }

  .navList li {
    margin: 1em 1.5em;
  }

  .navBtns {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .navList .logoutLi {
    margin: 1em 1.5em 0.5em;
    text-align: center;
  }

  .hamburger {
    cursor: pointer;
    position: fixed;
    top: 0;
    right: 0;
    padding: 2px 0 8px 15px;
    margin-right: 7px;
    border-bottom-left-radius: 100%;
    transition: ease-in-out 0.25s;
    z-index: 3;
  }

  .hamburger div {
    height: 3px;
    background-color: var(--white);
    margin: 7px auto;
    transition: transform ease-in-out 0.125s;
  }

  .hamburger div:nth-child(1) {
    width: 34px;
  }

  .hamburger div:nth-child(2) {
    width: 22px;
  }

  .hamburger div:nth-child(3) {
    width: 10px;
  }

  .hamburger:hover div {
    background-color: var(--white);
  }

  .hamburger.displayed div:nth-child(1) {
    transform: translate(2px, 10px) rotate(45deg);
  }

  .hamburger.displayed div:nth-child(2) {
    transform: translate(2px, 0px) rotate(-45deg);
  }

  .hamburger.displayed div:nth-child(3) {
    opacity: 0;
  }

  .hamburger:focus {
    outline: none;
  }

  .backdrop {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0);
    left: -100vw;
  }

  .backdrop.show {
    background-color: rgba(0, 0, 0, 0.8);
    left: 0;
  }
</style>

<div class="header">
  <div class="logo">
    <h1>myClimbingDrills</h1>
  </div>

  <div
    on:click={toggleDisplayMenu}
    on:keydown={handleKeyDown}
    class="hamburger {displayMenu ? 'displayed' : ''}"
    role="button"
    aria-label="Open the menu"
    tabIndex={0}>
    <div aria-hidden="true" />
    <div aria-hidden="true" />
    <div aria-hidden="true" />
  </div>

  <div on:click={toggleDisplayMenu} class="backdrop {displayMenu ? 'show' : ''}" />

  <nav class="nav {displayMenu ? 'activeMenu' : ''}">
    {#if $auth.user}
      <ul class="navList">
        <li>
          <NavLink to="/" on:clickedLink={closeMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/current-program" on:clickedLink={closeMenu}>Current program</NavLink>
        </li>
        <li>
          <NavLink to="/programs" on:clickedLink={closeMenu}>Programs</NavLink>
        </li>
        <li>
          <NavLink to="/drills" on:clickedLink={closeMenu}>Drills</NavLink>
        </li>
        <li>
          <NavLink to="/account" on:clickedLink={closeMenu}>Account</NavLink>
        </li>
        <li class="logoutLi"><button on:click={logout} class="btn btn-primary--outline">Log out</button></li>
      </ul>
    {:else}
      <ul class="navList">
        <li>
          <NavLink to="/" on:clickedLink={closeMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" on:clickedLink={closeMenu}>About</NavLink>
        </li>
      </ul>
      <div class="navBtns">
        <NavLink to="/login" on:clickedLink={closeMenu} customClass="btn btn-primary">Login</NavLink>
        <NavLink to="/signup" on:clickedLink={closeMenu} customClass="btn btn-primary--outline">Sign up</NavLink>
      </div>
    {/if}
  </nav>
</div>
