<script lang="ts">
  import { User, Lock, Check, MessageCircle } from "lucide-svelte";
  import type { Result } from "src/types/result";

  let { result }: { result: Result} = $props();

  let copiedUser = $state(false);
  let copiedPass = $state(false);

  const genericFallbackUrl = "/icon.svg";

  const iconUrl = $derived(
    result.icon && result.icon !== "default-icon"
      ? `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${result.icon.toLowerCase()}.svg`
      : genericFallbackUrl,
  );

  function handleCopy(text: string, type: "user" | "pass") {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === "user") {
      copiedUser = true;
      setTimeout(() => (copiedUser = false), 2000);
    } else {
      copiedPass = true;
      setTimeout(() => (copiedPass = false), 2000);
    }
  }
</script>

<li
  class="flex flex-col gap-3 p-4 rounded-box w-full overflow-hidden transition-all list-row"
>
  <div
    class="flex flex-col lg:flex-row gap-4 w-full justify-between items-start"
  >
    <div class="flex gap-4 min-w-0 flex-1 w-full">
      <div class="flex-none">
        <div
          class="size-12 bg-base-100 rounded-lg flex items-center justify-center p-2 shadow-sm border border-base-content/5"
        >
          <img
            class="size-full object-contain brightness-0 invert"
            src={iconUrl}
            alt={result.manufacturer}
            onerror={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = genericFallbackUrl;
            }}
          />
        </div>
      </div>

      <div class="min-w-0 flex-1 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span
            class="text-[10px] font-black uppercase tracking-widest opacity-50 truncate"
            >{result.manufacturer}</span
          >
          {#if result.version && result.version !== "all"}
            <span class="badge badge-outline badge-xs opacity-60"
              >v{result.version}</span
            >
          {/if}
        </div>
        <h3
          class="font-bold text-lg leading-tight break-words line-clamp-2 uppercase"
        >
          {result.name}
        </h3>
      </div>
    </div>

    <div
      class="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end"
    >
      {#if result.user}
        <button
          class="btn btn-sm btn-outline hover:border-base-content/30 font-mono flex-1 lg:flex-none min-w-[120px] max-w-full h-auto py-2 gap-2 justify-start
             {copiedUser ? 'btn-success' : ''}"
          onclick={() => handleCopy(result.user, "user")}
        >
          <User size={14} class="flex-none" />
          <span class="truncate max-w-[200px]">{result.user}</span>
          {#if copiedUser}<Check size={14} class="ml-auto" />{/if}
        </button>
      {/if}

      {#if result.pass}
        <button
          class="btn btn-sm btn-outline hover:border-base-content/30 font-mono flex-1 lg:flex-none min-w-[120px] max-w-full h-auto py-2 gap-2 justify-start
             {copiedPass ? 'btn-success' : ''}"
          onclick={() => handleCopy(result.pass, "pass")}
        >
          <Lock size={14} class="flex-none" />
          <span class="truncate max-w-[200px]">{result.pass}</span>
          {#if copiedPass}<Check size={14} class="ml-auto" />{/if}
        </button>
      {/if}
    </div>
  </div>

  <div class="space-y-2 pt-2">
    {#if result.comment}
      <div
        class="flex items-start gap-2 text-xs opacity-70 bg-base-300/40 p-2 rounded-md"
      >
        <MessageCircle size={14} class="mt-0.5 flex-none" />
        <p
          class="italic leading-relaxed break-words whitespace-normal uppercase"
        >
          {result.comment}
        </p>
      </div>
    {/if}

    <div class="flex flex-wrap gap-1">
      {#each result.tags as tag}
        <span class="badge badge-ghost badge-xs lowercase opacity-50"
          >#{tag}</span
        >
      {/each}
    </div>
  </div>
</li>
