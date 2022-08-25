/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	HOOK: string;
}

export default {
	/*async fetch(
		_request: Request,
		env: Env,
		_ctx: ExecutionContext
	): Promise<Response> {
		await trigger(env.HOOK);
		return new Response("Ok!");
	},*/
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
		(Number(new Date("2022-09-25T08:00:00.000Z")) - Number(Date.now())) /
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
