<script lang="ts">
	import type { ComponentType } from "svelte";
	import { type Icon, Smile, Tag, Truck, X } from "lucide-svelte";

	type Option = {
		name: string;
		description: string;
		icon: ComponentType<Icon>;
		color: string;
		isChecked: boolean;
	};
	const options = $state<Option[]>([
		{
			name: "Good",
			description: "Top-notch quality",
			icon: Smile,
			color: "#22c55e",
			isChecked: false
		},
		{
			name: "Fast",
			description: "Get it done quickly",
			icon: Truck,
			color: "#3b82f6",
			isChecked: false
		},
		{
			name: "Cheap",
			description: "Low cost",
			icon: Tag,
			color: "#8b5cf6",
			isChecked: false
		}
	]);

	function updateSelections(index: number) {
		const selectedOptions = options.filter(option => option.isChecked);
		if (selectedOptions.length > 2) {
			const previousOption = options[index - 1 < 0 ? options.length - 1 : index - 1];
			previousOption.isChecked = false;
		}
	}
</script>

<div class="relative overflow-clip rounded-3xl">
	<!-- Right shadows -->
	<div class="absolute -right-12 bottom-1/3 left-3/4 top-1/4 rounded-full bg-green-500/15"></div>
	<div class="absolute -right-12 bottom-1/4 left-3/4 top-1/2 rounded-full bg-blue-500/15"></div>
	<div class="absolute -right-12 bottom-0 left-3/4 top-3/4 rounded-full bg-violet-500/15"></div>
	<!-- Left shadows -->
	<div class="absolute -left-12 bottom-1/3 top-1/4 w-24 rounded-full bg-green-500/15"></div>
	<div class="absolute -left-12 bottom-1/4 top-1/2 w-24 rounded-full bg-blue-500/15"></div>
	<div class="absolute -left-12 bottom-8 top-3/4 w-24 rounded-full bg-violet-500/15"></div>
	<!-- Top shadow -->
	<div class="absolute -top-8 bottom-3/4 left-1/4 right-1/4 rounded-full bg-white/5"></div>
	<!-- Card -->
	<section
		class="rounded-3xl border-[0.5px] border-neutral-600 bg-[rgba(89,_89,_89,_0.05)] p-6 shadow-[0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-blur-lg"
	>
		<header class="flex items-start justify-between gap-24">
			<div class="flex flex-col gap-0.5">
				<h2 class="text-xl font-medium">Choose what suits you...</h2>
				<h3 class="text-sm font-light text-neutral-500">You can only pick two, sorry!</h3>
			</div>
			<button type="button" class="rounded-lg bg-white p-1 font-semibold text-black">
				<X class="size-5" strokeWidth={2.5} />
			</button>
		</header>
		<div class="my-6 flex flex-col gap-5">
			{#each options as option, i}
				{@const OptionIcon = option.icon}
				<div style="--color: {option.color}" class="flex items-center">
					<div class="rounded-xl bg-neutral-700 p-2.5 shadow-lg shadow-neutral-900/75">
						<OptionIcon
							class="size-6 text-white duration-300 dark:text-inherit {option.isChecked
								? '!text-[--color]'
								: ''}"
						/>
					</div>
					<div class="ml-4 flex flex-col">
						<span class="text-lg font-light">{option.name}</span>
						<span class="text-xs font-light text-neutral-500">{option.description}</span>
					</div>
					<!-- Switch -->
					<label class="relative ml-auto inline-block h-8 w-14">
						<input
							type="checkbox"
							bind:checked={option.isChecked}
							onchange={e => {
								if (!e.currentTarget.checked) return;
								updateSelections(i);
							}}
							class="peer size-0 opacity-0"
						/>
						<!-- Background & Thumb (::before) -->
						<span
							class="absolute inset-0 cursor-pointer rounded-full bg-neutral-500 duration-300 before:absolute before:bottom-0.5 before:left-0.5 before:size-7 before:rounded-full before:bg-gradient-to-b before:from-white before:from-25% before:to-white/65 before:duration-300 before:ease-out before:content-[''] peer-checked:bg-[--color] before:peer-checked:translate-x-6"
						></span>
					</label>
				</div>
			{/each}
		</div>
	</section>
</div>
