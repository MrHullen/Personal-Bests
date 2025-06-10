<script>
  import { bests } from '$lib/state.svelte.js'
</script>

{#await bests}
  <p>Loading best power lifts...</p>
{:then bests}
  <div class="notification content section">
    <h2>Power Lifts</h2>

    {#each bests.powerlifts as lift}
      <div class="box">
        <label class="label">
          {lift.type}
          <input class="input" bind:value={lift.weight} type="number" />
        </label>
      </div>
    {/each}
    
  </div>
{/await}
