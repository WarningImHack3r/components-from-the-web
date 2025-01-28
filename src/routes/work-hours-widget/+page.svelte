<script lang="ts">
	import { FileChartColumn, Info } from "lucide-svelte";
	import { Chart, Highlight, Spline, Svg, Tooltip } from "layerchart";

	const chartData: { date: number; value: number }[] = [
		1, 1, 7, 7, 4, 4, 2, 2, 4, 4, 7, 7, 4, 4, 7, 7
	].map((value, index) => ({ date: index, value }));
</script>

<!-- Card -->
<div class="rounded-2xl border border-gray-400/50 p-4 font-mono shadow-xl dark:bg-neutral-700">
	<!-- Top part	-->
	<div class="flex items-center tracking-tighter">
		<FileChartColumn class="mr-2" />
		<span class="font-medium">Work Hours</span>
		<button
			type="button"
			class="ml-auto cursor-pointer rounded-lg border border-gray-400/40 px-2 py-1 text-sm text-gray-500 hover:bg-neutral-300 dark:text-gray-200 hover:dark:bg-neutral-800"
		>
			See All
		</button>
	</div>
	<hr class="mt-3.5 mb-5 text-gray-400/50" />
	<!-- Main part -->
	<div>
		<!-- Top banner -->
		<div class="mb-5 flex items-center gap-4">
			<!-- Clock -->
			<div class="size-10 rounded-full border-4 border-amber-600"></div>
			<!-- Text -->
			<div class="flex flex-col">
				<span class="text-xs tracking-tight text-gray-400 uppercase">Total work</span>
				<span class="font-semibold">54 hours - 12 mins</span>
			</div>
		</div>
		<!-- Segment control -->
		<div class="flex overflow-clip rounded border border-gray-400/50 text-xs">
			{#each ["5D", "2W", "1M", "6M", "1Y"] as format, i}
				<label
					class={[
						"w-full cursor-pointer border-gray-400/50 py-0.5 text-center text-gray-600 has-checked:bg-neutral-300 has-checked:text-current dark:text-gray-200 has-checked:dark:bg-neutral-800",
						i > 0 && "border-l"
					]}
				>
					<input type="radio" name="segment" checked={i === 0} class="hidden" />{format}
				</label>
			{/each}
		</div>
		<!-- Graph -->
		<div class="h-32 py-4">
			<svelte:boundary>
				<Chart data={chartData} x="date" y="value" tooltip={{ mode: "bisect-x" }}>
					<Svg>
						<Spline draw class="stroke-amber-600 stroke-2" />
						<Highlight points lines />
					</Svg>
					<Tooltip.Root let:data>{data.value}</Tooltip.Root>
				</Chart>

				{#snippet failed(error, reset)}
					<span class="text-sm">Oops! LineChart crashed: {error}</span>
					<button
						type="button"
						onclick={reset}
						class="cursor-pointer rounded-lg border px-2 py-1 text-sm hover:bg-neutral-300"
					>
						Try again
					</button>
				{/snippet}
			</svelte:boundary>
		</div>
		<!-- Note -->
		<div class="flex items-center gap-1 text-gray-500/70 dark:text-gray-300">
			<Info fill="currentColor" color="var(--color-neutral-200)" class="size-4 dark:hidden" />
			<Info fill="currentColor" color="var(--color-neutral-700)" class="hidden size-4 dark:block" />
			<span class="text-xs tracking-tight">Total work hours include extra hours.</span>
		</div>
	</div>
</div>
