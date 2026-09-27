param(
  [string]$File,
  [int]$Threshold = 50,
  [int]$X0 = 0,
  [int]$Y0 = 0,
  [int]$X1 = -1,
  [int]$Y1 = -1
)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
if ($X1 -lt 0) { $X1 = $bmp.Width }
if ($Y1 -lt 0) { $Y1 = $bmp.Height }
$minX = 99999; $maxX = -1; $minY = 99999; $maxY = -1; $count = 0
for ($y = $Y0; $y -lt [Math]::Min($Y1, $bmp.Height); $y += 2) {
  for ($x = $X0; $x -lt [Math]::Min($X1, $bmp.Width); $x += 2) {
    $c = $bmp.GetPixel($x, $y)
    $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($b -gt $Threshold) {
      $count++
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
Write-Output ("{0} th={1} region=[{2},{3}-{4},{5}] bbox=[{6},{7} -> {8},{9}] count={10}" -f `
  (Split-Path $File -Leaf), $Threshold, $X0, $Y0, $X1, $Y1, $minX, $minY, $maxX, $maxY, $count)
$bmp.Dispose()
