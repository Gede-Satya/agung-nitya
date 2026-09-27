param(
  [Parameter(Mandatory = $true)][string]$File,
  [int]$Cols = 110,
  [double]$YScale = 0.5,
  [int]$MaxLum = 130
)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
$rows = [Math]::Max(8, [int]($Cols * $bmp.Height / $bmp.Width * $YScale))
$ramp = " .:-=+*#%@"
$stepX = [Math]::Max(1, [int]($bmp.Width / $Cols))
$stepY = [Math]::Max(1, [int]($bmp.Height / $rows))
$lines = @()
for ($r = 0; $r -lt $rows; $r++) {
  $line = ""
  $yBase = [Math]::Min($bmp.Height - 1, $r * $stepY)
  for ($c = 0; $c -lt $Cols; $c++) {
    $xBase = [Math]::Min($bmp.Width - 1, $c * $stepX)
    $sum = 0; $n = 0
    for ($y = $yBase; $y -lt [Math]::Min($bmp.Height, $yBase + $stepY); $y += 2) {
      for ($x = $xBase; $x -lt [Math]::Min($bmp.Width, $xBase + $stepX); $x += 2) {
        $px = $bmp.GetPixel($x, $y)
        $sum += [Math]::Max($px.R, [Math]::Max($px.G, $px.B))
        $n++
      }
    }
    if ($n -eq 0) { $n = 1 }
    $v = $sum / $n
    $scaled = [Math]::Min(1.0, $v / $MaxLum)
    $idx = [Math]::Min($ramp.Length - 1, [int]($scaled * ($ramp.Length - 1)))
    $line += $ramp[$idx]
  }
  $lines += $line
}
$bmp.Dispose()
$lines -join "`n"
