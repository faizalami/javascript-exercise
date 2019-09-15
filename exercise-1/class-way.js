const fs = require('fs');

/**
 * Class BlackList for initialize and find blacklisted contacts
 */
class BlackList {
    /**
     * initialize blacklisted contact data store
     */
    blacklisted = [];

    /**
     * initialize new blacklisted phone data from text file
     *
     * using immutable way to assign new blacklist, so this function can be called several times
     * not only when the API server is starting
     *
     * @param blacklist
     */
    initialize(blacklist) {
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

            this.blacklisted = [...new_blacklist];
        });
    }

    /**
     * check blacklisted using name and phone number
     *
     * @param name
     * @param phone_number
     * @returns {boolean}
     */
    check_blacklist(name, phone_number) {
        const found = this.blacklisted.find((contact) => {
            return contact.name === name && contact.phone_number === phone_number;
        });

        return found !== undefined;
    }
}