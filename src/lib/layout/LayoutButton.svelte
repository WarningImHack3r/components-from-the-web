<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	type Props = {
		children?: Snippet;
		onclick?: () => void;
		class: string | null | undefined;
	};
	let { children, onclick, class: className }: Props = $props();
</script>

<button
	type="button"
	{onclick}
	class={twMerge(
		"aspect-square rounded-xl border-[0.5px] bg-neutral-100 p-2 shadow-xl shadow-black/50 duration-200 hover:scale-110 dark:bg-neutral-700",
		className
	)}
>
	{@render children?.()}
</button>
