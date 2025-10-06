// index.js
// File Metadata Microservice

const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

// Configure Multer
// We don't need to save the file, so we use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Configuration ---
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

// --- Root Route ---
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// ------------------------------------------------
// API Endpoint
// ------------------------------------------------

// POST /api/filemetadata
// Use 'upload.single('upfile')' as middleware.
// It expects a single file upload field named 'upfile' (Test 3)
app.post("/api/filemetadata", upload.single("upfile"), (req, res) => {
	// Check if a file was successfully uploaded
	if (!req.file) {
		return res.json({
			error: "No file uploaded. Please select a file for submission.",
		});
	}

	// Extract the required metadata from req.file (Test 4)
	res.json({
		name: req.file.originalname, // Original filename
		type: req.file.mimetype, // MIME type
		size: req.file.size, // File size in bytes (Number)
	});
});

// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
	console.log(
		"Your File Metadata Microservice is listening on port " +
			listener.address().port
	);
});
