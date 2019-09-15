const fs = require('fs');

// to store blacklisted contact data
const blacklisted = [];

/**
 * initialize new blacklisted phone data from text file
 *
 * using immutable way to assign new blacklist, so this function can be called several times
 * not only when the API server is starting
 *
 * @param blacklist
 */
function initialize(blacklist) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err;

        const new_blacklist = [];
        data.split(/\r?\n/).forEach((line) => {
            const contact = line.split(' ');

            new_blacklist.push({
                name: contact[0],
                phone_number: contact[1]
            })
        });

        blacklisted = [...new_blacklist];
    });
}

/**
 * check blacklisted using name and phone number
 *
 * @param name
 * @param phone_number
 * @returns {boolean}
 */
function check_blacklist(name, phone_number) {
    const found = blacklisted.find((contact) => {
        return contact.name === name && contact.phone_number === phone_number;
    });

    return found !== undefined;
}