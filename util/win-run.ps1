write-host "bootlaterus run"
write-host "`n`n========================================"
cd..
grunt
write-host "`n`n========================================"
write-host "`nPress any key to quit..."
[void][System.Console]::ReadKey($true)