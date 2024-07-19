import Aedes from "aedes";
import { createServer } from "net";

import { Pino } from "./Logger";

const aedes = new Aedes();
const server = createServer(aedes.handle);
const port = 1883;
const logger = new Pino();

server.listen(port, () => {
	logger.info(`MQTT BROKER running on port: ${port}`);
});

aedes.on("client", function (client) {
	logger.info(`[CLIENT_CONNECTED] Client ${client.id} connected to broker ${aedes.id}`);
});

aedes.on("publish", (packet, client) => {
	if (!client) {
		return;
	}

	const payload = packet.payload.toString();
	const [nodeId, state] = payload.split("|");
	logger.debug(`Node: ${nodeId} state: ${state} at: ${new Date().toISOString()}`);
});
