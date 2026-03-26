/* Author: Austin Wong
Objectives for app.js

-> Search Functionality
    + Searches the selected API using the provided keyword
    + Saves the keyword to search_history.json (only if unique)
    + Displays a list prompt with a clean, user-friendly list of search results to select
        - NOT raw JSON
    + Gets and displays information for the selected item from the API
        - NOT raw JSON
 */

import inquirer from "inquirer";
import { searchGamesByKeyword, getGameDetailsById } from "./api.js";
import { addToSearchHistory, displaySearchHistory } from "./history.js";

// Search Flow
export async function searchGames(keyword) {
    try {
        const results = await searchGamesByKeyword(keyword);

        if (results.length === 0) {
            console.log("No games found.\n");
            return;
        }

        // Save keyword
        await addToSearchHistory(keyword);

        // Build choices
        const choices = [
            { name: "Exit", value: null },
            ...results.map(game => ({
                name: `${game.title} (${game.gnere}, ${game.platform})`,
                value: game.id
            }))
        ];

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "gameId",
                message: "Select a game: ",
                choices
            }
        ]);

        if (!answer.gameId) return;

        const details = await getGameDetailsById(answer.gameId);

        console.log("\n=== Game Details ===");
        console.log(`Title: ${details.title}`);
        console.log(`Genre: ${details.genre}`);
        console.log(`Platform: ${details.platform}`);
        console.log(`Release Date: ${details.releaseDate}`);
        console.log(`Description: ${details.description}\n`);

    } catch (err) {
        console.log("Search failed: ", err.message);
    }

}

// History flow
export async function showHistory() {
    try {
        const history = await displaySearchHistory();

        if (history.length === 0) {
            console.log("No search history.\n");
            return;
        }

        const choices = ["Exit", ...history];

        const answer = await inquirer.prompt ([
            {
                type: "list",
                name: "keyword",
                message: "Search History: ",
                choices
            }
        ]);

        if (answer.keyword === "Exit") return;

        await searchGames(answer.keyword);

    } catch (err) {
        console.error("History error: ", err.message);
    }
}
