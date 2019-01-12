write-host "bootlaterus build"
write-host "please wait..."
write-host "`n========================================"
cd..
grunt build
write-host "`n`n========================================"
write-host "`nPress any key to quit..."
[void][System.Console]::ReadKey($true)