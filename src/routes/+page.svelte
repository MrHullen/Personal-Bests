<script>
  import { onMount } from 'svelte'
  import { person } from '$lib/state.svelte.js'
  import { getBests, setBests, login } from '$lib/db.js'
  import Header from '$lib/page-parts/Header.svelte'
  import OlyLifts from '$lib/page-parts/OlyLifts.svelte'
  import PowerLift from '$lib/page-parts/PowerLift.svelte'
  import OtherLift from '$lib/page-parts/OtherLift.svelte'

  // Wait for the page to be ready before checking localStorage
  onMount(() => {
    // If the user was logged in before...
    if (localStorage.getItem('person')) {
      // Get the user data from localStorage
      let data = JSON.parse(localStorage.getItem('person'))

      // Set the person state with the user data
      person.uid = data.uid
      person.email = data.email
      person.displayName = data.displayName
      person.photoURL = data.photoURL

      // Get the user's best lifts from the database
      getBests()
    }
  })
</script>

{#if person.uid}
  <Header />

  <main class="section">
    <OlyLifts />
    <PowerLift />
    <OtherLift />
    <button class="button is-success" on:click={setBests}>Save Lifts</button>
  </main>
{:else}
  <main class="section">
    <button class="button is-success" on:click={login}> Login </button>
  </main>
{/if}
