// Recommended order for your solution:
// 1. Install the dotenv package. //
// 2. Add a dotenv file, put the API key in dotenv and print it. //
// 3. Install the node-fetch package. //
// 4. Create a method that calls the API to get temperature using node-fetch.
// 5. Install the commander package.
// 6. Create a basic commander skeleton without the actions implementation (just the metadata and commands configuration).
// 7. Implement the first command, including the optional arguments.
// 8. BONUS - Implement the second command.

// Commander usage example for your reference:
import chalk from "chalk";
import { Command } from "commander";
const program = new Command();
import 'dotenv/config'
import fetch from 'node-fetch'

async function getTemprtature(city,options) {

  let response

  if (options.scale === "c"){
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`)
  }
  else{
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
  }
  
  const data = await response.json();

  return data.main.temp
}

program
  .name("weather")
  .description("The best weather calculator")
  .version("1.0.0");

program
  .command("get-temp")
  .description("get temperature")
  .argument("<string>", "give city temperature")
  .option("-c, --color <string>", "Result color", "white")
  .option("-s, --scale <string>", "unix", "c")
  .action(async(city, options) => {
    console.log(
      chalk[options.color](
        `Result: ${await getTemprtature(city, options)}`
      )
    );
  });

program.parse();
