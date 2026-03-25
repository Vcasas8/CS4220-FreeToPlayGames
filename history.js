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
const filePath = path.resolve(__dirname, 'search_history.json');

// function to read search history from the JSON file
const readSearchHistory = () => {
    try {
        // read the file and parse the JSON data
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // if there's an error (e.g., file doesn't exist), log the error and return an empty array
        console.error('Error reading search history:', error);
        return [];
    }  
};

export const addToSearchHistory = async(keyword) => {
    // read the existing search history
    const searchHistory = await readSearchHistory();

    // add the new keyword to the history
    searchHistory.push(keyword);

    // write the updated search history back to the JSON file
    await fs.promises.writeFile(filePath, JSON.stringify(searchHistory, null, 2), 'utf-8');
    console.log(`"${keyword}" added to search history.`);
};

// get the search history and display it in a user-friendly format
export const displaySearchHistory = async() => {
    return await readSearchHistory();
};