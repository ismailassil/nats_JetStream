const {
	connect,
	AckPolicy,
	DeliverPolicy,
	RetentionPolicy,
	DiscardPolicy,
	JSONCodec,
} = require('nats');

require('@dotenvx/dotenvx').config();

const NATS_USER = process.env.NATS_USER ?? '';
const NATS_PASSWORD = process.env.NATS_PASSWORD ?? '';

async function main() {
	const nc = await connect({
		servers: 'nats://localhost:4222',
		user: NATS_USER,
		pass: NATS_PASSWORD,
		name: 'Sub Instance',
	});

	console.log('[NATS] Connected');

	const js = nc.jetstream();

	const streamName = 'PubStream';
	const subName = 'dot.*';
	const consName1 = 'sub1Consumer';
	const consName2 = 'sub2Consumer';
	const jsm = await nc.jetstreamManager();

	try {
		const streamInfo = await jsm.streams.info(streamName);
		console.log('[NATS] Stream already created: ', streamInfo);
	} catch (error) {
		jsm.streams.add({
			name: streamName,
			retention: RetentionPolicy.Limits,
			subjects: [subName],
			discard: DiscardPolicy.Old,
		});
		console.log('[NATS] Stream Created');
	}

	try {
		const cInfo = await jsm.consumers.info(streamName, consName1);

		console.log('[NATS] Consumer found - ' + cInfo.name);
	} catch (error) {
		console.error("[ERROR]", error.message);
		const cInfo = await jsm.consumers.add(streamName, {
			durable_name: consName1,
			ack_policy: AckPolicy.All,
			deliver_policy: DeliverPolicy.All,
		});
		console.log('[NATS] Consumer Created - ' + cInfo.name);
	}
	try {
		const cInfo = await jsm.consumers.info(streamName, consName2);
		
		console.log('[NATS] Consumer found - ' + cInfo.name);
	} catch (error) {
		console.error("[ERROR]", error.message);
		const cInfo = await jsm.consumers.add(streamName, {
			durable_name: consName2,
			ack_policy: AckPolicy.All,
			deliver_policy: DeliverPolicy.All,
			filter_subjects: ["dot.amigo"]
		});
		console.log('[NATS] Consumer Created - ' + cInfo.name);
	}

	const jc = JSONCodec();
	let counter = 1;
	console.log(subName.replace("*", "") + "net")
	setInterval(async () => {
		await js.publish(
			subName.replace("*", "") + "net",
			jc.encode({
				msg: '[NET] Hello from the pub with ID: ' + counter,
			}),
		);
		await js.publish(
			subName.replace("*", "") + "amigo",
			jc.encode({
				msg: '[AMIGO] Hello from the pub with ID: ' + counter,
			}),
		);
		console.log('sent msg: ' + counter++);
	}, 3500);
}

main();
