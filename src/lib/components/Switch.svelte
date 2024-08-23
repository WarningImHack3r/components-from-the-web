<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	type Props = {
		checked?: boolean | null | undefined;
		onchange?: ChangeEventHandler<HTMLInputElement> | null | undefined;
		class?: string | null | undefined;
		toggleClass?: string | null | undefined; // to remove with Tailwind 4?
	};
	let { checked = $bindable(), onchange, class: className, toggleClass }: Props = $props();
</script>

<label class={twMerge("relative ml-auto inline-block h-7 w-12", className)}>
	<input type="checkbox" bind:checked {onchange} class="peer size-0 opacity-0" />
	<!-- Background & Thumb (::before) -->
	<span
		class={twMerge(
			"absolute inset-0 cursor-pointer rounded-full bg-neutral-500 duration-150 before:absolute before:bottom-0.5 before:left-0.5 before:size-6 before:rounded-full before:bg-gradient-to-b before:from-white before:from-25% before:to-white/65 before:duration-150 before:ease-out before:content-[''] peer-checked:bg-neutral-400 before:peer-checked:translate-x-5",
			toggleClass
		)}
	></span>
</label>
