import "./db";
import "./models/contentsModel";
import "./models/userModel";

import app from "./server";

const PORT = 5040;

const handleListen = () =>
	console.log("✅ Server is Listenin on http://localhost:5040");

app.listen(PORT, handleListen);
