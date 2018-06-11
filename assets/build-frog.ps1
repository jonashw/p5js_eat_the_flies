$INKSCAPE = "`"C:\Program Files\Inkscape\inkscape.exe`""
$frogWidth = 200
$eyeWidth = [Math]::Round($frogWidth/3.93)
$lilyPadWidth = [Math]::Round($frogWidth*3.14)
function inkscape($cmdString){
	$cmd = "$($INKSCAPE) $($cmdString) `"eat-the-flies.svg`""
	Write-Output $cmd
	cmd.exe /c $cmd
}

foreach($f in "frog-normal", "frog-licking"){
	inkscape("--export-png=$($f).png --export-id=$($f) --export-id-only --export-width=$($frogWidth)");
}

foreach($f in "eye-normal", "eye-looking"){
	inkscape("--export-png=$($f).png --export-id=$($f) --export-id-only --export-width=$($eyeWidth)");
}

inkscape("--export-png=lily-pad.png --export-id=lily-pad --export-id-only --export-width=$($lilyPadWidth)");
inkscape("--export-png=tongue-tip.png --export-id=tongue-tip --export-id-only --export-width=35");