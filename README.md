playwright.dev: https://playwright.dev/   // API // page 
uuid-npm: https://www.npmjs.com/package/uuid
regex101: https://regex101.com/
npmjs: npmjs.com: node-fetch

Art Shopping Store: http://localhost:2221/
Art Shopping Store Bash: "C:\Users\white\Downloads\Unconfirmed 136440.crdownload"
copy path or download windows_store and open in bash.

packages to install: devDependencies": {
    "@playwright/test": "^1.58.2",
    "@types/node": "^25.4.0"
  },
  "dependencies": {
    "dotenv": "^17.3.1",
    "node-fetch": "^2.7.0",
    "uuid": "^13.0.0"}

    dot env setup:

   globalSetup.js: import * as dotenv from "dotenv"

                    export default () => {
                        dotenv.config()
                    }
playwright.config:

globalSetup: require.resolve("./gobalSetup.js"),


keyboard function uses: 
                        1. keyboard.type(variable: string)

                        2. await this. page. keyboard.down("Control")
                           await this.page.keyboard. type("c")
                           await this.page. keyboard.up("Control")
