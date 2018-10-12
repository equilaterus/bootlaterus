# bootlaterus

Equilaterus base boostrap theme

## How to start

* [Clone the repo and open it on VS Code](https://github.com/equilaterus/wikilaterus/wiki/Cloning-a-repo-on-Github).

* Install npm by downloading [nodejs](https://nodejs.org/en/).

## Windows

* You execute use the **bat** files that are inside *utils* folder:

  1. Run **win-install.bat** to automatically setup the enviroment.

  2. Run **win-run.bat** to build bootlaterus. It will open automatically a browser with hot reload so when you update one of the template or scss files it will show you an updated version of **bootlaterus**.

  3. **win-build.bat** will just generate the output css files into *dist* folder to distribute your own version of **bootlaterus**.

* Execute the commands like on any other OS.

## Any OS

* Using VS Code terminal run the following commands to setup the enviroment:

    ```
    npm install -g grunt-cli
    npm install
    ```

* To build and run the project in a synchronized browser with hot-reload, run this command:

    ```
    grunt
    ```

* To build run this command:

    ```
    grunt build
    ```