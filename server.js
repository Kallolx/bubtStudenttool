import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const REPLICATE_API_URL = "https://api.replicate.com/v1/predictions";

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch(REPLICATE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.VITE_REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: req.body.prompt,
          negative_prompt: "ugly, blurry, poor quality, distorted",
          width: 1024,
          height: 1024,
          num_outputs: 1
        }
      }),
    });

    const prediction = await response.json();
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status/:id', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${req.params.id}`,
      {
        headers: {
          "Authorization": `Token ${process.env.VITE_REPLICATE_API_KEY}`,
        },
      }
    );
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 