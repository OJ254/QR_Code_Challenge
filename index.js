// Import necessary modules
import inquirer from "inquirer";  // Handles user input in the command line
import qr from "qr-image";        // Generates QR codes
import fs from "fs";              // Enables file system operations

// Prompt user for a URL input
inquirer
    .prompt([
        {
            type: "input",
            name: "url",
            message: "Type in your URL:"  // Ask the user to provide a URL
        }
    ])
    .then((answers) => {
        var url = answers.url;  // Store user input in a variable

        // Generate a QR Code from the given URL
        var qr_svg = qr.image(url, { type: "png" });
        qr_svg.pipe(fs.createWriteStream("qr_img.png"));  // Save the QR code as a PNG file

        // Save the user input (URL) to a text file
        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;  // Handle errors in file writing
            console.log("Saved:", url);  // Log a confirmation message
        });
    })
    .catch((error) => {
        // Handle errors gracefully
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");  // Error if the prompt cannot be displayed
        } else {
            console.error("Something went wrong:", error);  // Generic error handler
        }
    });