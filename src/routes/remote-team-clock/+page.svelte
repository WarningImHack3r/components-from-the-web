<script lang="ts">
	import Clock from "$lib/components/Clock.svelte";
	import Switch from "$lib/components/Switch.svelte";

	type RandomUserResponse = {
		results: {
			name: {
				title: string;
				first: string;
				last: string;
			};
			location: {
				street: {
					number: number;
					name: string;
				};
				city: string;
				state: string;
				country: string;
				postcode: string;
				coordinates: {
					latitude: string;
					longitude: string;
				};
				timezone: {
					offset: string;
					description: string;
				};
			};
			picture: {
				large: `https://randomuser.me/api/portraits/${string}/${number}.jpg`;
				medium: `https://randomuser.me/api/portraits/${string}/${string}/${number}.jpg`;
				thumbnail: `https://randomuser.me/api/portraits/thumb/${string}/${number}.jpg`;
			};
		}[];
	};

	fetch("https://randomuser.me/api/?results=5&inc=name,picture,location")
		.then(res => res.json())
		.then((data: RandomUserResponse) => {
			people = data.results.map(result => ({
				avatar: result.picture.thumbnail,
				name: result.name.first,
				city: result.location.city,
				country: result.location.country,
				timezoneOffset: result.location.timezone.offset,
				isOnline: Math.random() > 0.5
			}));
		});

	type Person = {
		avatar: string;
		name: string;
		city: string;
		country: string;
		timezoneOffset: string;
		isOnline: boolean;
	};
	let people = $state<Person[]>([]);
	let hoveredPerson = $state<Person>();
	let toggled = $state(false);

	function offsetToTimes(offset: string): [number, number] {
		const [hours, minutes] = offset.split(":").map(Number);
		return [hours, minutes];
	}

	function dateWithOffset(hours: number, minutes: number) {
		const date = new Date();
		date.setHours(date.getHours() + hours);
		date.setMinutes(date.getMinutes() + minutes);
		return date;
	}
</script>

<div
	class="flex overflow-clip rounded-[2.5rem] bg-white shadow-xl *:p-8 dark:bg-neutral-600 dark:shadow-black"
>
	<!-- Clock part -->
	<section class="w-96">
		<div class="flex h-full flex-col">
			<!-- Header -->
			<div class="flex items-center justify-between">
				<!-- Left part -->
				<div class="flex gap-3">
					<h3 class="text-2xl font-semibold tracking-tight">Team</h3>
					<div class="mt-1 flex items-center gap-2">
						<div class="size-1.5 rounded-full bg-green-500"></div>
						<p class="font-mono text-xs font-semibold text-neutral-500 dark:text-neutral-300/75">
							{people.filter(person => person.isOnline).length} online
						</p>
					</div>
				</div>
				<!-- Switch -->
				<Switch
					toggleClass="bg-neutral-200 peer-checked:bg-black dark:bg-neutral-500 dark:peer-checked:bg-neutral-400"
					onchange={e => (toggled = e.currentTarget.checked)}
				/>
			</div>
			<!-- Clock -->
			<Clock
				mode={toggled ? "people" : "default"}
				date={new Date()}
				hoveredDate={hoveredPerson?.timezoneOffset
					? dateWithOffset(...offsetToTimes(hoveredPerson.timezoneOffset))
					: undefined}
				people={people.map(person => ({
					avatar: person.avatar,
					date: dateWithOffset(...offsetToTimes(person.timezoneOffset))
				}))}
				class="m-auto transition-transform duration-500 {toggled ? 'translate-x-44' : ''}"
			/>
		</div>
	</section>
	<!-- List part -->
	<section
		class={[
			"bg-neutral-100/50 transition-transform duration-500 dark:bg-neutral-700/15",
			toggled && "translate-x-full"
		]}
	>
		<!-- List -->
		<ul class="flex flex-col gap-3">
			{#each people as person}
				{@const [tzHour, tzMinutes] = offsetToTimes(person.timezoneOffset)}
				<!-- People cell -->
				<li
					class="w-72 rounded-xl p-3 outline-1 outline-neutral-300 hover:bg-neutral-200/30 hover:shadow-inner hover:outline dark:outline-neutral-700 dark:hover:bg-neutral-700/30"
					onmouseenter={() => (hoveredPerson = person)}
					onmouseleave={() => (hoveredPerson = undefined)}
				>
					<div class="flex w-full items-center">
						<img src={person.avatar} alt={person.name} class="size-10 rounded-full" />
						<div class="ml-4 flex w-full flex-col">
							<div class="flex w-full items-center">
								<h4 class="line-clamp-1 text-lg font-semibold">{person.name}</h4>
								<div class="col-start-1 col-end-1 row-start-1 row-end-1 ml-auto font-mono text-sm">
									{#if person === hoveredPerson}
										<!-- TODO: animate transitions vertically (broken in Svelte 5??) -->
										<span
											class={{
												"text-red-500": tzHour < 0,
												"text-green-500": tzHour > 0 || tzMinutes > 0,
												"text-neutral-600": tzHour === 0 && tzMinutes === 0,
												"dark:text-neutral-400": tzHour === 0 && tzMinutes === 0
											}}
										>
											{#if tzHour === 0 && tzMinutes === 0}
												No change
											{:else}
												{person.timezoneOffset}
											{/if}
										</span>
									{:else}
										<span class="text-neutral-600 dark:text-neutral-400">
											{dateWithOffset(tzHour, tzMinutes).toLocaleTimeString("en-US", {
												hour: "2-digit",
												minute: "2-digit"
											})}
										</span>
									{/if}
								</div>
							</div>
							<p class="-mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
								{person.city}, {person.country}
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</div>
