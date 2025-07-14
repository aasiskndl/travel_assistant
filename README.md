# 🌍 Travel Assistant API

A **Node.js** web application that provides intelligent travel tips based on user queries. It leverages the **Google Gemini API** to act as a smart travel assistant, offering information on transportation, accommodation, budget, packing, and general travel advice for specified routes.

---

## ✨ Features

- **Intelligent Travel Tips**  
  Generates comprehensive travel advice for a given source and destination.

- **Structured Responses**  
  Includes transportation options, departure points, travel duration, hotel recommendations (luxury, mid-range, budget), budget overview, packing suggestions, and travel tips.

- **Gemini API Integration**  
  Uses the `gemini-1.5-flash` model to generate high-quality travel content.

- **Express.js Backend**  
  A lightweight, efficient server to handle API requests.

- **Static File Serving**  
  Serves a simple `public` directory for a frontend UI (optional).

---

## 🛠 Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Google Gemini API](https://ai.google.dev/)
- [`@google/generative-ai` SDK](https://www.npmjs.com/package/@google/generative-ai)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## ⚙️ Setup and Installation

Follow these steps to get the Travel Assistant API running on your local machine.

### ✅ Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### 📦 Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd <your-project-directory>
   ```
2. **Install Dependencies**

  ```bash
npm install express dotenv @google/generative-ai
```
3. **Configure Environment Variables**
  ```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
PORT=4000
```
4. **Run the Application**
   ```bash
   node your_main_server_file.js  

## 🤝 Contributing
Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## 📄 License
This project is open-source and available under the MIT License.
