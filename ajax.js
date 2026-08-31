const REST_COUNTRIES_API_KEY = window.REST_COUNTRIES_API_KEY || "";
const REST_COUNTRIES_API_URL = "https://api.restcountries.com/countries/v5";

function getFirstNativeName(nativeNames) {
    if (!nativeNames) {
        return "";
    }

    const firstLanguage = Object.values(nativeNames)[0];
    return firstLanguage && firstLanguage.common ? firstLanguage.common : "";
}

function getPrimaryCapital(capitals) {
    if (!Array.isArray(capitals) || capitals.length === 0) {
        return "";
    }

    const primaryCapital = capitals.find(function (capital) {
        return capital.attributes && capital.attributes.primary;
    });

    return (primaryCapital || capitals[0]).name || "";
}

function normalizeApiCountry(country) {
    const alpha2Code = country.codes && country.codes.alpha_2
        ? country.codes.alpha_2.toLowerCase()
        : "";

    return {
        flag: country.flag && country.flag.url_png
            ? country.flag.url_png
            : alpha2Code
                ? `https://flags.restcountries.com/v5/w160/${alpha2Code}.png`
                : "",
        nativeName: getFirstNativeName(country.names && country.names.native)
            || (country.names && country.names.common)
            || "N/A",
        capital: getPrimaryCapital(country.capitals) || "N/A",
        region: country.subregion || country.region || "N/A"
    };
}

function normalizeLocalCountry(country) {
    return {
        flag: country.flag || "",
        nativeName: country.nativeName || country.name || "N/A",
        capital: country.capital || "N/A",
        region: country.region || "N/A"
    };
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderCountries(countries) {
    const countriesTable = document.getElementById("countriesTable");

    if (!countriesTable) {
        return;
    }

    if (!Array.isArray(countries) || countries.length === 0) {
        countriesTable.innerHTML = '<p class="table-message">Country data is unavailable right now.</p>';
        return;
    }

    const countriesRows = countries.map(function (country, index) {
        const nativeName = escapeHtml(country.nativeName);
        const capital = escapeHtml(country.capital);
        const region = escapeHtml(country.region);
        const flagMarkup = country.flag
            ? `<img src="${escapeHtml(country.flag)}" alt="${nativeName} Flag" width="32" height="32" loading="lazy">`
            : "N/A";

        return `
            <tr>
                <td>${index + 1}</td>
                <td>${flagMarkup}</td>
                <td>${nativeName}</td>
                <td>${capital}</td>
                <td>${region}</td>
            </tr>`;
    }).join("");

    countriesTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Flag</th>
                    <th>Native Name</th>
                    <th>Capital</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
                ${countriesRows}
            </tbody>
        </table>
    `;
}

function getLocalCountries() {
    return Array.isArray(window.unMembers)
        ? window.unMembers.map(normalizeLocalCountry)
        : [];
}

function loadApiCountries() {
    const requestUrl = `${REST_COUNTRIES_API_URL}?response_fields=names,codes,capitals,flag,region,subregion,classification`;

    return fetch(requestUrl, {
        headers: {
            Authorization: `Bearer ${REST_COUNTRIES_API_KEY}`
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("REST Countries request failed");
            }

            return response.json();
        })
        .then(function (payload) {
            const countries = payload && payload.data && Array.isArray(payload.data.objects)
                ? payload.data.objects
                : [];

            return countries
                .filter(function (country) {
                    return country.classification
                        ? country.classification.sovereign || country.classification.un_member
                        : true;
                })
                .map(normalizeApiCountry);
        });
}

function makeRequest() {
    if (!REST_COUNTRIES_API_KEY) {
        renderCountries(getLocalCountries());
        return;
    }

    loadApiCountries()
        .then(renderCountries)
        .catch(function (error) {
            console.error("Error fetching REST Countries data:", error);
            renderCountries(getLocalCountries());
        });
}

window.addEventListener("load", makeRequest);
