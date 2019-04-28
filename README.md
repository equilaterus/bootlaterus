# bootlaterus

Equilaterus boostrap themes [Official Site](https://equilaterus.github.io/bootlaterus/)

## Builds

* **Release** v0.0.1-prealpha

  [![Build Status](https://travis-ci.org/equilaterus/bootlaterus.svg?branch=release)](https://travis-ci.org/equilaterus/bootlaterus/branches)

* **Master** v0.0.x

  [![Build Status](https://travis-ci.org/equilaterus/bootlaterus.svg?branch=master)](https://travis-ci.org/equilaterus/bootlaterus/branches)

* **Dev** Unstable

  [![Build Status](https://travis-ci.org/equilaterus/bootlaterus.svg?branch=dev)](https://travis-ci.org/equilaterus/bootlaterus/branches) 

## How to start

* [Clone the repo and open it on VS Code](https://github.com/equilaterus/wikilaterus/wiki/Cloning-a-repo-on-Github).

* Install npm by downloading [nodejs](https://nodejs.org/en/).

## Windows

* **Option A**: Use the **ps1** files that are inside the *utils* folder:

  * Run once **win-install.ps1** to set up the environment. To run PowerShell files on Windows: *Left click > Run with Powershell*.

  * Run **win-run.ps1** to run bootlaterus. It will open a browser with hot reload so when you update one of the template or scss files it will show you an updated version of **bootlaterus**.

  * **win-build.ps1** will just generate the output css files into *dist* folder to distribute your own version of **bootlaterus**.

* **Option B**: Execute the commands like on any other OS.

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

* If you want to generate only the output files (*dist/* folder) without running the server, run this command:

    ```
    grunt build
    ```

## Important

Always be sure to modify the files located at **src/** and not at **dist/**, when building files located at **dist/** will be overwritten.