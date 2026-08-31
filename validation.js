function formValidation(event) {
    if (event) {
        event.preventDefault();
    }

    clearErrors();

    var firstNameValid = validateName("firstName");
    var lastNameValid = validateName("lastName");
    var postalCodeValid = validatePostalCode();
    var phoneValid = validatePhone();
    var isValid = firstNameValid && lastNameValid && postalCodeValid && phoneValid;

    var status = document.querySelector("#formStatus");
    if (isValid) {
        status.textContent = "Thanks! Your information passed the client-side validation.";
    } else {
        status.textContent = "Please correct the highlighted form errors.";
    }

    // This is a static portfolio demo, so no data is sent to a server.
    return false;
}

function validateName(fieldName) {
    var errors = document.querySelector("#namesError");
    var elem = document.getElementById(fieldName);
    var inputValue = elem.value.trim();

    if (inputValue.length === 0) {
        errors.innerHTML += "<p>" + fieldName + ": Please enter a name.</p>";
        return false;
    }

    if (inputValue.length < 2) {
        errors.innerHTML += "<p>" + fieldName + " must contain at least 2 characters.</p>";
        return false;
    }

    inputValue = inputValue.toLowerCase();
    for (var i = 0; i < inputValue.length; i++) {
        var char = inputValue.charAt(i);
        if (!(char >= "a" && char <= "z") && char !== "." && char !== " " && char !== "-") {
            errors.innerHTML += "<p>" + fieldName + ": Use alphabet letters, spaces, periods, or hyphens.</p>";
            elem.focus();
            return false;
        }
    }
    return true;
}

function validatePostalCode() {
    var errors = document.querySelector("#zipCodeError");
    var countrySelect = document.getElementById("country");
    var postalCodeInput = document.getElementById("zipCode");

    var selectedCountry = countrySelect.value;
    var postalCodeValue = postalCodeInput.value.trim();

    if (selectedCountry === "CA") {
        var postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (!postalCodePattern.test(postalCodeValue)) {
            errors.innerHTML = "<p>Please enter a valid Canadian postal code (for example, A1A 1A1).</p>";
            postalCodeInput.focus();
            return false;
        }
    }

    return true;
}

function validatePhone() {
    var errors = document.querySelector("#phoneError");
    var phoneInput = document.getElementById("phone");
    var phoneValue = phoneInput.value.trim();
    var phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (phoneValue.length === 0) {
        return true;
    }

    if (!phonePattern.test(phoneValue)) {
        errors.innerHTML = "<p>Please enter a phone number in the format 999-999-9999.</p>";
        phoneInput.focus();
        return false;
    }
    return true;
}

function clearErrors() {
    document.querySelector("#namesError").innerHTML = "";
    document.querySelector("#zipCodeError").innerHTML = "";
    document.querySelector("#phoneError").innerHTML = "";
    document.querySelector("#formStatus").textContent = "";
}
