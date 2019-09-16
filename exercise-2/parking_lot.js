const process = require('process');
const fs = require('fs');

/**
 * class ParkingLot
 */
class ParkingLot {
    constructor() {
        // initialize parking slots data stores
        this.slotsAvailable = [];
        this.slotsUsed = [];

        // initialize park data store
        this.cars = [];
    }

    /**
     * initialize slots available
     *
     * @param args
     */
    create_parking_lot(args) {
        const number = parseInt(args[0]);
        const newSlots = [];
        for (let i = 1; i <= number; i++) {
            newSlots.push(i);
        }
        this.slotsAvailable = [...newSlots];
        console.log('Created a parking lot with ' + number + ' slots');
    }

    /**
     * park a car
     *
     * shift slotsAvailable array and push in slotsUsed
     * also store car data to cars array
     *
     * @param args
     */
    park(args) {
        if (this.slotsAvailable.length !== 0) {
            const registration_number = args[0];
            const colour = args[1];

            const allocated = this.slotsAvailable.shift();
            this.slotsUsed.push(allocated);

            this.cars.push({
                slot_number: allocated,
                registration_number,
                colour
            });

            console.log('Allocated slot number: ' + allocated);
        } else {
            console.log('Sorry, parking lot is full');
        }
    }

    /**
     * a car leaves from parking lot
     *
     * remove items from slotsUsed and cars
     * and add slot_number left
     *
     * @param args
     */
    leave(args) {
        const slot_number = parseInt(args[0]);

        const slotIndex = this.slotsUsed.indexOf(args);
        if (slotIndex !== -1) {
            this.slotsUsed.splice(slotIndex, 1);
        } else {
            console.log('Not found');
        }

        const carIndex = this.cars.findIndex(car => car.slot_number === slot_number);
        if (carIndex !== -1) this.cars.splice(carIndex, 1);

        this.slotsAvailable.push(slot_number);
        this.slotsAvailable.sort();

        console.log('Slot number ' + slot_number + ' is free');
    }

    /**
     * print cars
     *
     */
    status() {
        let status = 'Slot No.\t Registration No.\t Colour\n\r';
        this.cars.forEach(car => {
            status += car.slot_number + '\t\t ' + car.registration_number + '\t\t ' + car.colour + '\n\r';
        });
        console.log(status);
    }

    /**
     * find cars by specified field and retrieve specified field
     *
     * @param field
     * @param retrieve
     * @param query
     */
    find_cars(field, retrieve, query) {
        const found = this.cars.filter(car => car[field] === query)
            .map(car => car[retrieve]);

        if (found.length !== 0) {
            console.log(found.join(', '));
        } else {
            console.log('Not found');
        }
    }
}

const parkingLot = new ParkingLot();

function processCommand(input) {
    const args = input.replace(/(\r\n|\n|\r)/gm, '').split(' ');

    const command = args.shift();
    switch (command) {
        case 'create_parking_lot':
            parkingLot.create_parking_lot(args);
            break;
        case 'park':
            parkingLot.park(args);
            break;
        case 'leave':
            parkingLot.leave(args);
            break;
        case 'status':
            parkingLot.status();
            break;
        case 'registration_numbers_for_cars_with_colour':
            parkingLot.find_cars('colour', 'registration_number', args[0]);
            break;
        case 'slot_numbers_for_cars_with_colour':
            parkingLot.find_cars('colour', 'slot_number', args[0]);
            break;
        case 'slot_number_for_registration_number':
            parkingLot.find_cars('registration_number', 'slot_number', args[0]);
            break;
        default:
            console.log('Command not found.');
            break;
    }
}

function start() {
    // argument for retrieve file
    const filename = process.argv[2];
    if (filename) {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) throw err;

            data.split(/\r?\n/).forEach((args) => {
                processCommand(args);
            });
        });
    } else {
        // initialize stdin
        const stdinput = process.stdin;
        stdinput.setEncoding('utf-8');

        // read input arguments
        console.log('Input:');
        stdinput.on('data', data => {
            if (data === 'exit\n') {
                console.log("Parking Lot closed.");
                process.exit();
            } else {
                console.log("\n\rOutput:");

                processCommand(data);

                console.log('\n\rInput:');
            }
        });
    }
}

start();