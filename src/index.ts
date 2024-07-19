import Aedes from "aedes";
import { createServer } from "net";

const aedes = new Aedes();
const server = createServer(aedes.handle);
const port = 1883;

server.listen(port, () => {
	console.log(`MQTT BROKER running on port: ${port}`);
});

aedes.on("client", function (client) {
	console.log(`[CLIENT_CONNECTED] Client ${client.id} connected to broker ${aedes.id}`);
});

aedes.on("publish", (packet, client) => {
	console.log(
		`[MESSAGE_PUBLISHED] Client ${
			client ? client.id : `BROKER_${aedes.id}`
		} has published message on ${packet.topic} to broker ${aedes.id}`,
	);
	console.log("PACKET: ", packet.payload.toString());
});
