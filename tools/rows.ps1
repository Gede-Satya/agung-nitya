param([string]$File, [int]$Threshold = 55, [int]$X0 = 900, [int]$X1 = 1400)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
$out = @()
for ($y = 0; $y -lt $bmp.Height; $y += 10) {
  $n = 0
  for ($x = $X0; $x -lt $X1; $x += 3) {
    $c = $bmp.GetPixel($x, $y)
    $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($b -gt $Threshold) { $n++ }
  }
  if ($n -gt 0) { $out += ("y{0}:{1}" -f $y, $n) }
}
Write-Output ((Split-Path $File -Leaf) + " rows(th=$Threshold,x=$X0-$X1): " + ($out -join " "))
$bmp.Dispose()
