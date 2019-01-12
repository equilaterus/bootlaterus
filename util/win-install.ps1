write-host "bootlaterus dev environment installation"
write-host "run once to setup your local environment"
cd..
write-host "`n`n========================================"
write-host "Installing grunt`n"
npm install -g grunt-cli
write-host "`n`n========================================"
write-host "Installing npm packages`n"
npm install
write-host "`n`n========================================"
write-host "`nPress any key to quit..."
[void][System.Console]::ReadKey($true)
