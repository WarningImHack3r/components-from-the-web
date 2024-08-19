<script lang="ts">
	import { Moon, Sun, SunMoon } from "lucide-svelte";
	import { resetMode, setMode, userPrefersMode } from "mode-watcher";
	import LayoutButton from "$lib/layout/LayoutButton.svelte";

	type Props = {
		class: string | null | undefined;
	};

	let { class: className }: Props = $props();
</script>

<LayoutButton
	onclick={() => {
		switch ($userPrefersMode) {
			case "light":
				setMode("dark");
				break;
			case "dark":
				resetMode();
				break;
			default:
				setMode("light");
				break;
		}
	}}
	class={className}
>
	{#if $userPrefersMode === "light"}
		<Sun />
	{:else if $userPrefersMode === "dark"}
		<Moon />
	{:else}
		<SunMoon />
	{/if}
</LayoutButton>
