const strSimilarity = require('string-similarity');
const emailDomains = require('./email-domains.json');

function suggestEmails(input, minRate, numOfSuggestions) {
    const [inputUser, inputDomain] = input.split('@');
    const isACorrectEmail = emailDomains.some(item => item === inputDomain);

    if (isACorrectEmail) {
        return {
            looksRight: true,
            suggestions: []
        }
    }

    const possibleEmails = emailDomains.map(item => `${inputUser}@${item}`);
    const matches = strSimilarity.findBestMatch(input, possibleEmails);

    const emailSuggestions = matches.ratings
        .filter(item => item.rating >= minRate)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, numOfSuggestions)
        .map(item => item.target)

    return {
        looksRight: false,
        suggestions: emailSuggestions
    };
}

module.exports = suggestEmails;