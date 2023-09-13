const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Serve the JSON file (celebrities.json)
app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./src/data/celebrities.json", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading JSON file" });
  }
});

// Update specific fields for a user based on their id
app.put("/api/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body; // An object containing the updated fields

    // Read the existing data from celebrities.json
    const existingData = await fs.readFile(
      "./src/data/celebrities.json",
      "utf8"
    );
    const parsedData = JSON.parse(existingData);

    // Find the user by id and update specific fields
    const userIndex = parsedData.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      const updatedUser = { ...parsedData[userIndex], ...updatedFields };
      parsedData[userIndex] = updatedUser;

      // Write the updated data back to celebrities.json
      await fs.writeFile(
        "./src/data/celebrities.json",
        JSON.stringify(parsedData, null, 2)
      );

      res.json({ message: "Data updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
