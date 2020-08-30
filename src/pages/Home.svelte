<script>
  import { link } from 'svelte-routing';
  // let pageName = 'Home Page';
</script>

<style>
  section {
    background-image: url('/images/ladder.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    width: 100%;
    height: calc(100vh - 40px);
    padding-top: 3em;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .tags {
    background: rgba(0, 0, 0, 0.7);
    padding: 1.75em 1.5em 1.5em 40px;
  }
  .tags p {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0.5em;
    line-height: 1.4;
  }

  .tags h2 {
    color: var(--white);
    font-family: 'Khula', sans-serif;
    font-size: 3.25rem;
    text-transform: uppercase;
    margin: 0;
  }

  .signup {
    background: var(--red);
    border-radius: 50px;
    display: inline-block;
    color: var(--white);
    font-size: 1.5rem;
    text-align: center;
    text-decoration: none;
    margin: 2em auto;
    padding: 0.5em 1em;
  }
</style>

<div class="container">
  <section>
    <div class="tags">
      <h2>Schedule.</h2>
      <h2>Train.</h2>
      <h2>Share.</h2>
      <p>Choose an existing training program or create your own.</p>
      <p>Train and log your progress with drills widgets.</p>
      <p>Share your created programs and drills with others.</p>
      <p>Vote for the best ones to help others choose well.</p>
    </div>
    <a href="/signup" use:link class="signup">Start Training</a>
  </section>
</div>
