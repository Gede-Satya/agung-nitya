param(
  [Parameter(Mandatory = $true)][string]$File,
  [int]$X0 = 0,
  [int]$Y0 = 0,
  [int]$X1 = -1,
  [int]$Y1 = -1,
  [int]$Threshold = 45
)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
if ($X1 -lt 0) { $X1 = $bmp.Width - 1 }
if ($Y1 -lt 0) { $Y1 = $bmp.Height - 1 }
$count = 0
$minX = -1; $maxX = -1; $minY = -1; $maxY = -1
$sumX = 0; $sumY = 0
for ($y = $Y0; $y -le $Y1; $y++) {
  for ($x = $X0; $x -le $X1; $x++) {
    $c = $bmp.GetPixel($x, $y)
    $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($b -gt $Threshold) {
      $count++
      $sumX += $x; $sumY += $y
      if ($minX -lt 0 -or $x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($minY -lt 0 -or $y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
$w = 0; $h = 0; $cx = 0; $cy = 0
if ($count -gt 0) {
  $w = $maxX - $minX; $h = $maxY - $minY
  $cx = [Math]::Round($sumX / $count, 1); $cy = [Math]::Round($sumY / $count, 1)
}
Write-Output ("{0} REGION=[{1},{2}..{3},{4}] T={5} COUNT={6} BBOX={7},{8} SIZE={9}x{10} CENTROID={11},{12}" -f `
  (Split-Path $File -Leaf), $X0, $Y0, $X1, $Y1, $Threshold, $count, $minX, $minY, $w, $h, $cx, $cy)
$bmp.Dispose()
