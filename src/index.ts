export interface Env {
	HOOK: string;
}

export default {
	async scheduled(
		_controller: ScheduledController,
		env: Env,
		_ctx: ExecutionContext
	): Promise<void> {
		await trigger(env.HOOK);
		console.log(`Ok!`);
	},
};

async function trigger(hook: string) {
	const till = Math.round(
		(Number(new Date("2023-09-23T08:00:00.000Z")) - Number(Date.now())) /
			86400000
	).toString();
	try {
		await Promise.all(
			hook.split(",").map((x) =>
				fetch(x, {
					method: "POST",
					body: JSON.stringify({
						content: `体育祭まで、あと${till}日です。`,
					}),
					headers: {
						"content-type": "application/json;charset=UTF-8",
					},
				})
			)
		);
	} catch (err) {
		console.error(err);
	}
}
