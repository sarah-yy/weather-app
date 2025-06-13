# weather-app

This repository contains code for the Weather app technical test.

## Requirements

- Node.js v18 and above (you can change the version using [NVM](https://tecadmin.net/install-nvm-macos-with-homebrew/) or [Homebrew](https://www.denisbouquet.com/change-node-version-using-homebrew/))

- API Key from Open Weather API (this is the source of weather information.)
  - You will need to create an Open Weather API Developer [account](https://home.openweathermap.org/users/sign_in) to generate an API key.

## Setting up localhost

1. On the command line, run `cd /path/to/weather-app` to go to the root folder of the project.
2. Run `npm install --force` or `yarn` to install dependencies.
3. Make a copy of `./envs/.env.default` in the same folder and rename it to `.env`.
3. Add your API key to the `VITE_OPEN_WEATHER_API_KEY` field.
4. Run `yarn dev` to start the localhost server.
