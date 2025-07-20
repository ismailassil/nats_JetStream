const {
	connect,
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
	const consName = 'sub1Consumer';

	const consumer = await js.consumers.get(streamName, consName);

	const jc = JSONCodec();
	const iter = await consumer.consume();

	for await (const m of iter) {
		console.log("Subject:", m.subject);
		console.log(jc.decode(m.data));
		m.ack();
	}
}

main();
