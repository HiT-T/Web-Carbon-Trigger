import axios from 'axios';

// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');

// results divs
const loading = document.querySelector('.loading');
const errors = document.querySelector('.errors');
const results = document.querySelector('.result-container');
const myregion = document.querySelector('.my-region');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const clearBtn = document.querySelector('.clear-btn'); 

// calculate color, set it for the displayed data, and send it to background for the icon.
function calculateColor(co2) {
    const co2Scale = [0, 150, 600, 750, 800];
    const colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

    const closestNum = co2Scale.reduce((prev, curr) => {
        return (Math.abs(curr - co2)) < Math.abs(prev - co2) ? curr : prev;
    });
    console.log(co2 + ' is closest to ' + closestNum);
    const index = co2Scale.indexOf(closestNum);
    const color = colors[index];
    console.log(index, color);

    usage.style.color = color;
    fossilfuel.style.color = color;

    chrome.runtime.sendMessage({action: 'updateIcon', value: { iconColor: color } })
}

// call the API
async function displayCarbonUsage(regionName, apiKey) {
    try {
        await axios
                .get('https://api.co2signal.com/v1/latest', {
                    params : {
                        countryCode: regionName,
                    },
                    headers: {
                        'auth-token': apiKey,
                    },
                })
                .then((response) => {
                    let CO2 = Math.floor(response.data.data.carbonIntensity);

                    calculateColor(CO2);

                    loading.style.display = 'none';
                    myregion.textContent = regionName;
                    usage.textContent = Math.round(response.data.data.carbonIntensity);
                    fossilfuel.textContent = response.data.data.fossilFuelPercentage.toFixed(2);
                    results.style.display = 'block';
                    clearBtn.style.display = 'block';
                })
    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = 'Sorry, we have no data for the region you have requested.';
        clearBtn.style.display = 'block';
    }
}

//set up user's api key and region
function setUpUser(regionName, apiKey) {
    localStorage.setItem('regionName', regionName);
    localStorage.setItem('apiKey', apiKey);
    form.style.display = 'none';
    loading.style.display = 'block';
    errors.textContent = '';
    displayCarbonUsage(regionName, apiKey);
}


// handle form submission
function submitHandler(e) {
    e.preventDefault();
    setUpUser(region.value, apiKey.value);
}

// initialize the app
function init() {
    const storedRegion = localStorage.getItem('regionName');
    const storedApiKey = localStorage.getItem('apiKey');

    // set icon to be initially grey.
	chrome.runtime.sendMessage({action: 'updateIcon', value: { iconColor: 'grey' } });

    // if no region or api key in local storage,
    // show the form and hide the results.
    if (storedRegion == null || storedApiKey == null) {
        form.style.display = 'block';
        results.style.display = 'none';
        loading.style.display = 'none';
        clearBtn.style.display = 'none';
        errors.textContent = '';
    } else {
        // if region and api key are in local storage, display 
        // the corresponding results directly and hide the form.
        displayCarbonUsage(storedRegion, storedApiKey);
        form.style.display = 'none';
        results.style.display = 'none';
        clearBtn.style.display = 'block';
    }
}

function reset(e) {
    e.preventDefault(); // actually useless since clearBtn is not in a form.
    localStorage.removeItem('regionName');
    init();
}

// set listeners and start app
form.addEventListener('submit', submitHandler);
clearBtn.addEventListener('click', reset);
init();
