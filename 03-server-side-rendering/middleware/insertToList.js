function insertStringIntoTemplate(text) {
    // Get a reference to the placeholder element by its ID
    const placeholder = document.getElementById('placeholder');

    // Check if the placeholder element exists
    if (placeholder) {
        // Set the innerHTML of the placeholder to the provided text
        placeholder.innerHTML = text;
    } else {
        console.error('Placeholder element not found.');
    }
}

module.exports = insertStringIntoTemplate
