/* Author: Krystal Lo
Objectives for history.js

-> History Functionality

    + If the argument is keywords
        - Display a list prompt of a clean, user-friendly keyword history from search_history.json
            - NOT raw JSON
            - The first option must be "Exit" to terminate the app without proceeding
        - If the user selects a keyword, this follows a similar flow outlined in 'Search Functionality'
*/

import fs from 'fs';
import path from 'path';
import url from 'url';

// get the file path for search_history.json
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'search_history.json');

// function to read search history from the JSON file
const readSearchHistory = async () => {
    try {
        // read the file and parse the JSON data
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // if the file does not exist, return an empty array
            const initialData = [];
            await fs.promises.writeFile(filePath, JSON.stringify(initialData, null, 2), 'utf-8');
            return initialData;
        }
        throw new Error(`Failed to read search history: ${error.message}`);
    }  
};

export const addToSearchHistory = async(keyword) => {
    // don't add empty keywords to the history
    if (!keyword) return;

    // read the existing search history
    const searchHistory = await readSearchHistory();

    // add the new keyword to the history only if it's not already present
    if (!searchHistory.includes(keyword)) {
        // push the keyword into search history array
        searchHistory.push(keyword);

        // write the updated search history back to the JSON file
        await fs.promises.writeFile(filePath, JSON.stringify(searchHistory, null, 2), 'utf-8');
    }
};

// get the search history and display it in a user-friendly format
export const displaySearchHistory = async() => {
    const searchHistory = await readSearchHistory();
    return ['Exit', ...searchHistory];
};