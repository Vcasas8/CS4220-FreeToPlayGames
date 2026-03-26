# CS4220-FreeToPlayGames
A Command Line Interface (CLI) application built with JavaScript, Node.js, and FreeToGame API. This project demonstrates how to work with external APIs, modular Node.js files, and command routing using Commander.

## 📦 Installation
Clone the repository and install dependencies.
```
npm install
```

## ▶️ Running the CLI
You can run the CLI using Node:
```
node cli.js --help
```

Search for games:
```
node cli.js search <keyword>
```
-> An example: ```node cli.js search shooter```

View search history
```
node cli.js history
```
## 🧩 How it works
- cli.js defines CLI commands using Commander
- app.js handles search logic and history integration
- api.js fetches data from the FreeToGame API
- history.js stores and retrieves search history in JSON format

## 📚 API Reference
This project uses the FreeToGame API:
https://www.freetogame.com/api-doc

## 👥 Authors
- **Vivian Casas**
- **Annie Lin**
- **Krystal Lo**
- **Austin Wong**
