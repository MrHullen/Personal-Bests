<script>
  import { person } from '$lib/state.svelte.js'
  import { logout } from '$lib/db.js'
</script>

<!-- This is me just mucking around - pay no attention. -->
<!-- It does show how to use the photoURL and make it circular with Bulma though. -->
<header class="card">
  <div class="card-content">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" src={person.photoURL} alt={person.displayName} />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{person.displayName}</p>
              <p class="subtitle is-6">{person.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button class="button" on:click={logout}> Logout </button>
        </div>
      </div>
    </div>
  </div>
</header>
