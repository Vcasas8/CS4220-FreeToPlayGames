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

import { Command } from "commander";
import { searchGames, showHistory } from "./app.js";

const program = new Command();

// HELP MENU
program
  .name("freetogame-cli")
  .description("CLI tool for searching FreeToGame API")
  .version("1.0.0");

// SEARCH COMMAND
program
  .command("search <keyword>")
  .description("Search for games by keyword (e.g., 'shooter', 'fantasy', 'mmorpg')")
  .action(async (keyword) => {
    try {
      console.log(`Searching for games related to: ${keyword}...\n`);
      await searchGames(keyword);
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
      console.error("Invalid argument. \nUse: history keywords");
      return;
    }

    showHistory();
  });

// Parse CLI arguments
program.parse(process.argv);
