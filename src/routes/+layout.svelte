<script lang="ts">
	import "../app.css";
	import type { Snippet } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { ArrowLeft } from "lucide-svelte";
	import { ModeWatcher } from "mode-watcher";
	import ModeSwitcher from "$lib/layout/ModeSwitcher.svelte";
	import LayoutButton from "$lib/layout/LayoutButton.svelte";

	let { children }: { children?: Snippet } = $props();

	let path = $derived(page.url.pathname);
</script>

<svelte:head>
	<title>{path.split("/")[1] || "Home"} | CFTW</title>
</svelte:head>

<ModeWatcher />

{#if page.url.pathname !== "/"}
	<LayoutButton class="fixed left-4 top-4" onclick={() => goto("/")}>
		<ArrowLeft />
	</LayoutButton>
{/if}
<ModeSwitcher class="fixed right-4 top-4" />

<main class="flex h-screen items-center justify-center">
	{@render children?.()}
</main>
