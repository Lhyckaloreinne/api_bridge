import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Replace with your actual Firebase Realtime Database URL
const FIREBASE_URL = "https://water-district-b59bf-default-rtdb.asia-southeast1.firebasedatabase.app/sensors.json";

app.use(express.json());

app.post("/update", async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data from Air780E:", data);

    // ✅ Using built-in fetch (no need for node-fetch)
    const fbResponse = await fetch(FIREBASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (fbResponse.ok) {
      console.log("✅ Data sent to Firebase successfully");
      res.status(200).send("OK");
    } else {
      const errText = await fbResponse.text();
      console.error("❌ Firebase error:", errText);
      res.status(500).send("Firebase error: " + errText);
    }
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).send("Server error: " + err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Air780E Firebase Bridge is running 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
