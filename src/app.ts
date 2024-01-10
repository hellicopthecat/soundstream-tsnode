import "dotenv/config";
import "./db";
import "./models/contentsModel";
import "./models/userModel";
import "./models/commentModel";

import app from "./server";

const PORT = process.env.PORT || 5040;

const handleListen = () =>
	console.log(`✅ Server is Listenin on http://localhost:${PORT}`);

app.listen(PORT, handleListen);
