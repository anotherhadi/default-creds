<script lang="ts">
  import { Menu } from "lucide-svelte";
  import type { NavItem } from "../types/nav";

  let {
    title = "",
    navLinks = [],
  }: {
    title?: string;
    navLinks?: NavItem[];
  } = $props();
</script>

<div class="bg-base-200">
  <div class="navbar max-w-5xl m-auto">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <Menu size={20} />
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-300 rounded-box z-50 mt-3 w-52 p-2"
        >
          {#each navLinks as link}
            <li>
              {#if link.children}
                <span>{link.label}</span>
                <ul class="p-2">
                  {#each link.children as sublink}
                    <li><a href={sublink.href}>{sublink.label}</a></li>
                  {/each}
                </ul>
              {:else}
                <a href={link.href}>{link.label}</a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
      <a href="/" class="btn btn-ghost text-xl">{title}</a>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        {#each navLinks as link}
          <li>
            {#if link.children}
              <details>
                <summary>{link.label}</summary>
                <ul class="p-2 bg-base-300 w-52 z-50">
                  {#each link.children as sublink}
                    <li>
                      <a href={sublink.href} class="flex items-center gap-2">
                        {#if sublink.icon}
                          <svelte:component this={sublink.icon} size={16} />
                        {/if}
                        {sublink.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              </details>
            {:else}
              <a href={link.href} class="flex items-center gap-2">
                {#if link.icon}
                  <svelte:component this={link.icon} size={18} />
                {/if}
                {link.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>

    <div class="navbar-end">
      <slot name="action"></slot>
    </div>
  </div>
</div>
