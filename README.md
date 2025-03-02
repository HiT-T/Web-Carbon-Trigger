# Carbon Trigger - Browser Extension

<span style="display: inline-block;">
    <img src="external_resources\login.png" alt="Image 1" width="300" height="500" style="float: left; margin-right: 100px;">
</span>
<span style="display: inline-block;">
    <img src="external_resources\data.png" alt="Image 2" width="300" height="500">
</span>

## Overview
Carbon Trigger is a lightweight browser extension designed to provide real-time carbon intensity data for electricity consumption in different regions. By utilizing the CO2 Signal API, this extension allows users to monitor carbon usage and fossil fuel percentage used in power generation for their selected region. The extension also visually represents the data with dynamic color changes, making it easier for users to assess the environmental impact of their energy consumption.

## Features
- Fetches real-time carbon intensity data from the [CO2 Signal API](https://www.co2signal.com/)
- Displays carbon usage (grams of CO2 emitted per kilowatt-hour)
- Shows fossil fuel percentage in the energy mix
- Dynamically changes text colors based on carbon intensity levels
- Stores user input (region and API key) for a personalized experience
- Provides an easy reset option to change region settings

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HiT-T/Web-Carbon-Trigger.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the top-right corner).
4. Click "Load unpacked" and select the dist folder.
5. The extension will now be ready to use!

## Usage
1. Open the extension popup.
2. Enter your region name and CO2 Signal API key.
3. Click submit to fetch the latest carbon intensity data.
4. The extension will display the region's carbon usage and fossil fuel percentage.
5. Color-coded values help visualize environmental impact:
   - Green (`#2AA364`): Low emissions
   - Yellow (`#F5EB4D`): Moderate emissions
   - Dark Red (`#9E4229`): High emissions
   - Brown (`#381D02`): Very high emissions
6. Click "Change Region" to update your settings.

## Technologies Used
- **JavaScript**: Handles API requests and DOM manipulation.
- **Axios**: Fetches data from the CO2 Signal API.
- **Chrome Extension APIs**: Manages local storage and icon updates.
- **HTML & CSS**: Structures and styles the user interface.

## Code Structure
- `index.html`: Main UI layout
- `index.js`: Handles form submissions, API calls, and UI updates
- `styles.css`: Defines styles for the extension UI
- `manifest.json`: Chrome extension configuration

## API Key Requirement
To use this extension, you need an API key from [CO2 Signal](https://www.co2signal.com/). Sign up for an account and retrieve your key from their developer portal.

## License
This project is open-source and available under the MIT License[License].
