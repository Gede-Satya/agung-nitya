param([string]$File, [int]$Threshold = 90)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
$cols = New-Object int[] $bmp.Width
$rows = New-Object int[] $bmp.Height
$total = 0
for ($y = 0; $y -lt $bmp.Height; $y++) {
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    $c = $bmp.GetPixel($x, $y)
    $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($b -gt $Threshold) { $cols[$x]++; $rows[$y]++; $total++ }
  }
}
Write-Output ("FILE={0} SIZE={1}x{2} BRIGHT_PIXELS={3}" -f (Split-Path $File -Leaf), $bmp.Width, $bmp.Height, $total)
$bmp.Dispose()

function Show-Bands([int[]]$arr, [string]$label, [int]$min) {
  $bands = @(); $start = -1
  for ($i = 0; $i -lt $arr.Length; $i++) {
    if ($arr[$i] -ge $min) { if ($start -lt 0) { $start = $i } }
    else { if ($start -ge 0) { $bands += ("{0}-{1}" -f $start, ($i - 1)); $start = -1 } }
  }
  if ($start -ge 0) { $bands += ("{0}-{1}" -f $start, ($arr.Length - 1)) }
  if ($bands.Count -eq 0) { Write-Output "$label : (none)" }
  else { Write-Output ("$label : " + (($bands | Select-Object -First 25) -join ", ")) }
}
Show-Bands $cols "X_BANDS" 3
Show-Bands $rows "Y_BANDS" 3
