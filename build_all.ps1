Set-Location $PSScriptRoot

Push-Location
.\dace\build.ps1
Pop-Location


Push-Location
.\opah\build.ps1
Pop-Location