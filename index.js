// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// app.use(express.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, 'public')));

// // System prompt for travel assistant
// const SYSTEM_PROMPT = `
// You are a smart travel assistant helping users plan trips. You provide detailed guidance when users mention a city or ask about travel-related topics.

// When a user provides a source and destination (like "Kathmandu to Pokhara"), respond with:
// - Transportation options (bus, flight, car rental)
// - From where the bus and flight can be taken (e.g., bus station, airport)
// - Transportation schedule and estimated travel time
// - Top hotel recommendations at the destination for booking
// - Estimated travel budget (covering transport, accommodation, and basic expenses)
// - Clothing and packing suggestions based on the current and expected weather
// - Any important travel cautions or tips

// Only answer questions related to travel, including:
// - Weather information
// - Packing suggestions
// - Transport options (bus, flight, car, etc.)
// - Hotel recommendations

// If the user asks something unrelated to travel, respond with:
// "I'm here to help with your travel plans. Ask me anything about your trip!"
// `;

// const TRAVEL_KEYWORDS = [
//   'travel', 'trip', 'pack', 'weather', 'bus', 'hotel', 'route', 'from', 'to',
//   'flight', 'fly', 'destination', 'source', 'itinerary', 'luggage', 'budget',
//   'clothing', 'rent', 'stay', 'book', 'city', 'place', 'where', 'transportation'
// ];

// function isTravelQuery(text) {
//   const lower = text.toLowerCase();
//   return TRAVEL_KEYWORDS.some(keyword => {
//     const re = new RegExp(`\\b${keyword}\\b`, 'i');
//     return re.test(lower);
//   });
// }

// // Gemini API setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.post('/api/travel-chat', async (req, res) => {
//   const userInput = req.body.message;

//   if (!isTravelQuery(userInput)) {
//     return res.json({
//       reply: "I'm here to help with your travel plans. Ask me anything about your trip!"
//     });
//   }

//   try {
//     const result = await model.generateContent([
//       { text: `${SYSTEM_PROMPT}\n\nUser: ${userInput}` }
//     ]);

//     const reply = result.response.text();
//     res.json({ reply });
//   } catch (err) {
//     console.error('Gemini API error:', err.message || err);
//     res.status(500).json({ error: 'Failed to fetch from Gemini API' });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Travel-assistant API running on port ${PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// System prompt for travel assistant
const SYSTEM_PROMPT = `
You are a smart travel assistant. When the user provides a source and destination (e.g., "Delhi to Pokhara"), respond in plain text using only the following section headings and formats.

Transportation Options:
(List each option using a numbered list: 1. Bus 2. Flight 3. Car Rental)

Departure Points:
(For each transport mode above, specify the departure station or airport.)

Travel Duration:
(Provide estimated travel times for each mode using a numbered list.)

Hotel Recommendations:
(Divide into numbered lists under subheadings: 1. Luxury 2. Mid-range 3. Budget.)

Budget Overview:
(Provide a numbered list for cost estimates per person, including transport, accommodation, food, and extras.)

Packing Suggestions:
(Provide a brief sentence or bullet points without markdown for clothing based on weather.)

Cautions & Tips:
(Provide a numbered list of important travel tips and warnings.)

Do not use any markdown syntax such as ** or *. Use plain text only. No extra headings or formatting. Only answer travel-related questions. If unrelated, reply: "I'm here to help with your travel plans. Ask me anything about your trip!"
`;

const TRAVEL_KEYWORDS = [
  'travel', 'trip', 'pack', 'weather', 'bus', 'hotel', 'route', 'from', 'to',
  'flight', 'fly', 'destination', 'source', 'itinerary', 'luggage', 'budget',
  'clothing', 'rent', 'stay', 'book', 'city', 'place', 'where', 'transportation'
];

function isTravelQuery(text) {
  const lower = text.toLowerCase();
  return TRAVEL_KEYWORDS.some(keyword => {
    const re = new RegExp(`\\b${keyword}\\b`, 'i');
    return re.test(lower);
  });
}

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/travel-chat', async (req, res) => {
  const userInput = req.body.message;

  if (!isTravelQuery(userInput)) {
    return res.json({ reply: "I'm here to help with your travel plans. Ask me anything about your trip!" });
  }

  try {
    const result = await model.generateContent([
      { text: `${SYSTEM_PROMPT}\n\nUser: ${userInput}` }
    ]);

    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err.message || err);
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Travel-assistant API running on port ${PORT}`);
});
