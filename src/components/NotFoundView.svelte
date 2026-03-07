<script lang="ts">
  import { cleanUserInput, getRandomEmoji } from "@lib/utils";
  import { onMount } from "svelte";

  let randomEmoji = $state("(·.·)");
  let { lastQuery = "" }: { lastQuery: string } = $props();
  const cleanedText = $derived(cleanUserInput(lastQuery));

  onMount(() => {
    randomEmoji = getRandomEmoji();
  });
</script>

<div class="mx-auto flex flex-col gap-5 justify-center items-center my-14">
  <p class="logo-gradient text-6xl font-bold">{randomEmoji}</p>
  {#if cleanedText}
    <p class="text-2xl">
      Can't find any creds for <span class="text-secondary font-semibold"
        >'{cleanedText}'</span
      >.
    </p>
  {:else}
    <p class="text-2xl">No credentials found for this search.</p>
  {/if}
  <p class="text-xl text-base-content/50">
    You can contribute to the project by submitting new credentials on our
    <a class="text-primary/50" href="https://github.com/anotherhadi/default-creds/blob/main/CONTRIBUTING.md">repo</a>.
  </p>
</div>
