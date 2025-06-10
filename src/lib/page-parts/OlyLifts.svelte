<script>
  import { bests } from '$lib/state.svelte.js'
</script>

{#await bests}
  <p>Loading best Olympic lifts...</p>
{:then bests}
  <div class="notification content section">
    <h2>Olympic Lifts</h2>

    {#each bests.olympicLifts as lift}
      <div class="box">
        <label class="label">
          {lift.type}
          <input class="input" bind:value={lift.weight} type="number" />
        </label>
      </div>
    {/each}
    
  </div>
{/await}
