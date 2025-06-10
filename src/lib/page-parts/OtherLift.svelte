<script>
  import { bests } from '$lib/state.svelte.js'

  // Adds a blank new object to the end of the bests.other array
  function addNewLift() {
    bests.other = [
      ...bests.other,
      { type: 'New Lift', weight: '0' }
    ]
  }

  // Removes the lift at the specified index from the bests.other array
  function removeLift(index) {
    bests.other = [
      ...bests.other.slice(0, index),
      ...bests.other.slice(index + 1)
    ]
  }
</script>

{#await bests}
  <p>Loading best other lifts...</p>
{:then bests}
  <div class="notification content section">
    <h2>Other Lifts</h2>

    {#each bests.other as lift, index}
      <div class="box">
        <!-- Allows the user to edit both the label of the lift and the weight -->
        <input class="label" bind:value={lift.type} />
        <input class="input" bind:value={lift.weight} type="number" />
        <button class="button" on:click={() => removeLift(index)}>Remove</button>
      </div>
    {/each}

    <button class="button" on:click={addNewLift}> Add New Lift </button>
  </div>
{/await}
