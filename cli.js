/* Author: Vivian Casas
Objectives for cli.js

-> Help Menu
    + Displayed when the user runs node cli.js --help
    + Clearly list available commands and arguments with descriptions

-> Search Command
    + Structure: node cli.js search <keyword>
    + Where <keyword> is any word that relates to your API selection
    + Passes the keyword argument to the corresponding function in app.js

-> History Command
    + Structure: node cli.js history keywords
    + Validate that the argument is keywords 
    + Passes the argument to the corresponding function in app.js
*/

// Import the Command class from the commander package to create the CLI interface
import { Command } from "commander";
// Import the functions from app.js
import { searchGames, showHistory } from "./app.js";

// Create a new Command instance to define our CLI commands and options
const program = new Command();

// Set the name, description, and version of the CLI tool for the help menu
program
  .name("freetogame-cli")
  .description("CLI tool for searching FreeToGame API")
  .version("1.0.0");

// SEARCH COMMAND
program
  .command("search <keyword>")
  .description("Search for games by keyword (e.g., 'shooter', 'fantasy', 'mmorpg')")
  .action(async (keyword) => {
    // Call the searchGames function from app.js with the provided keyword
    try {
      console.log(`Searching for games related to: ${keyword}...\n`);
      await searchGames(keyword);
      // The searchGames function will handle API calls and display results
    } catch (err) {
      console.error("Error running search command:", err.message);
    }
  });

// HISTORY COMMAND
program
  .command("history <arg>")
  .description("Show previously searched keywords")
  .action((arg) => {
    if (arg !== "keywords") {
      console.error("Invalid argument. \nUse: 'history keywords' to view search history.");
      return;
    } else {
    showHistory();
    }
  });

// Parse CLI arguments and execute the appropriate command based on user input
program.parse(process.argv);
