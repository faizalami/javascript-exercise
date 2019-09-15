# javascript exercise

### exercise 1
You have been running your shop for a long time, and have a list of 1 Million blacklisted name and phone number. Each line is one word(name), followed by space, then the phone number.

Example blacklist.txt:
```bash
Andi 1341441
Melisa 8565467 
Aslam 2908345
```

You want to build an API server that receive the name and phone number as an input, then output boolean whether this name and phone number is in the blacklist. How would you write these two functions to optimize the latency for each API call (no need to write an API server):

- initialize(blacklist)
This function takes string input, which is the file name of the blacklist you have, and called when the API server is starting.

- check_blacklist(name, phone_number)
This function takes 2 arguments, name(string) and phone number(int). This function is called whenever the API is called, and return boolean the input name and phone number is in the blacklist.

### exercise 2
[exercise file](exercise-2/Moving%20Bytes%20-%20Engineering%20Exercise.pdf)

##### how to run
1. run with file_inputs.txt
    ```bash
    $ node parking_lot.js file_inputs.txt
    ```
2. run interactive mode
    ```bash
    $ node parking_lot.js
    ```
   
##### available commands
No. | Command | Arguments | Description
--- | --- | --- | ---
1. | **create_parking_lot** | - number: number of parking slots  | initialize new parking lot slots
2. | **park** | - registration_number: plate number - colour : car colour | park a car
3. | **leave** | - slot_number: parking slot number | a car left
4. | **status** | &nbsp; | print cars in parking area
5. | **registration_numbers_for_cars_with_colour** | - colour : car colour | find cars registration number using car's colour
6. | **slot_numbers_for_cars_with_colour** | - colour : car colour | find cars slot number using car's colour
7. | **slot_number_for_registration_number** | - registration_number: plate number | find cars slot number using car's registration number