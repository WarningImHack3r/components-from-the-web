<script lang="ts">
	import { fade } from "svelte/transition";
	import { twMerge } from "tailwind-merge";
	import { SvelteDate } from "svelte/reactivity";

	type Props = {
		mode?: "default" | "people";
		date: Date;
		hoveredDate?: Date | undefined;
		people?: {
			avatar: string;
			date: Date;
		}[];
		class?: string | null | undefined;
	};
	let { mode = "default", date, hoveredDate, people = [], class: className }: Props = $props();

	let trackingDate = $derived(new SvelteDate(hoveredDate ?? date));
	const timeout = 1000;
	$effect(() => {
		// FIXME: when date or hoveredDate are too old, the clock will jump to the current time
		const interval = setInterval(() => {
			trackingDate.setTime(trackingDate.getTime() + timeout);
		}, timeout);
		return () => clearInterval(interval);
	});
</script>

<div class={twMerge("text-center", className)}>
	<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
		<!-- Clock face -->
		{#each [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as angle}
			<line
				x1={(150 + 105 * Math.cos((angle * Math.PI) / 180)).toFixed(2)}
				y1={(150 + 105 * Math.sin((angle * Math.PI) / 180)).toFixed(2)}
				x2={(150 + 130 * Math.cos((angle * Math.PI) / 180)).toFixed(2)}
				y2={(150 + 130 * Math.sin((angle * Math.PI) / 180)).toFixed(2)}
				stroke="gray"
				stroke-opacity={angle % 90 === 0 ? 1 : 0.5}
				stroke-width="3"
				stroke-linecap="round"
			/>
		{/each}
		<!-- Text -->
		{#if mode !== "people"}
			<text
				x="150"
				y="225"
				fill="grey"
				fill-opacity="0.6"
				text-anchor="middle"
				class="font-mono text-xl font-semibold"
				transition:fade={{ duration: 200 }}
			>
				{trackingDate.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit"
				})}
			</text>
		{/if}
		<!-- Clock hands -->
		<!-- Minutes hand and counterweight -->
		<line
			x1="150"
			y1="150"
			x2={(
				150 +
				120 *
					Math.cos(
						((trackingDate.getMinutes() * 6 + trackingDate.getSeconds() / 10) * Math.PI) / 180
					)
			).toFixed(2)}
			y2={(
				150 +
				120 *
					Math.sin(
						((trackingDate.getMinutes() * 6 + trackingDate.getSeconds() / 10) * Math.PI) / 180
					)
			).toFixed(2)}
			stroke="gray"
			stroke-width="8"
			stroke-linecap="round"
		/>
		<line
			x1="150"
			y1="150"
			x2={(
				150 -
				40 *
					Math.cos(
						((trackingDate.getMinutes() * 6 + trackingDate.getSeconds() / 10) * Math.PI) / 180
					)
			).toFixed(2)}
			y2={(
				150 -
				40 *
					Math.sin(
						((trackingDate.getMinutes() * 6 + trackingDate.getSeconds() / 10) * Math.PI) / 180
					)
			).toFixed(2)}
			stroke="gray"
			stroke-width="8"
			stroke-linecap="round"
		/>
		<!-- Hours hand, counterweight and circle -->
		<line
			x1="150"
			y1="150"
			x2={(
				150 +
				70 *
					Math.cos(((trackingDate.getHours() * 30 + trackingDate.getMinutes() / 2) * Math.PI) / 180)
			).toFixed(2)}
			y2={(
				150 +
				70 *
					Math.sin(((trackingDate.getHours() * 30 + trackingDate.getMinutes() / 2) * Math.PI) / 180)
			).toFixed(2)}
			stroke="black"
			stroke-width="8"
			stroke-linecap="round"
		/>
		<line
			x1="150"
			y1="150"
			x2={(
				150 -
				30 *
					Math.cos(((trackingDate.getHours() * 30 + trackingDate.getMinutes() / 2) * Math.PI) / 180)
			).toFixed(2)}
			y2={(
				150 -
				30 *
					Math.sin(((trackingDate.getHours() * 30 + trackingDate.getMinutes() / 2) * Math.PI) / 180)
			).toFixed(2)}
			stroke="black"
			stroke-width="8"
			stroke-linecap="round"
		/>
		<circle cx="150" cy="150" r="5" fill="black" />
		<!-- Seconds hand, counterweight and circle -->
		<line
			x1="150"
			y1="150"
			x2={(
				150 +
				120 *
					Math.cos(
						((trackingDate.getSeconds() * 6 + trackingDate.getMilliseconds() / 166.666) * Math.PI) /
							180
					)
			).toFixed(2)}
			y2={(
				150 +
				120 *
					Math.sin(
						((trackingDate.getSeconds() * 6 + trackingDate.getMilliseconds() / 166.666) * Math.PI) /
							180
					)
			).toFixed(2)}
			stroke="red"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<line
			x1="150"
			y1="150"
			x2={(
				150 -
				30 *
					Math.cos(
						((trackingDate.getSeconds() * 6 + trackingDate.getMilliseconds() / 166.666) * Math.PI) /
							180
					)
			).toFixed(2)}
			y2={(
				150 -
				30 *
					Math.sin(
						((trackingDate.getSeconds() * 6 + trackingDate.getMilliseconds() / 166.666) * Math.PI) /
							180
					)
			).toFixed(2)}
			stroke="red"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<circle cx="150" cy="150" r="3" fill="red" />
	</svg>
</div>
