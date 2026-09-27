param(
  [Parameter(Mandatory = $true)][string]$File,
  [int]$X0 = 0,
  [int]$Y0 = 0,
  [int]$X1 = -1,
  [int]$Y1 = -1
)
Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile($File)
if ($X1 -lt 0) { $X1 = $bmp.Width - 1 }
if ($Y1 -lt 0) { $Y1 = $bmp.Height - 1 }
$values = New-Object System.Collections.Generic.List[int]
for ($y = $Y0; $y -le $Y1; $y += 2) {
  for ($x = $X0; $x -le $X1; $x += 2) {
    $c = $bmp.GetPixel($x, $y)
    $values.Add([int]([Math]::Max($c.R, [Math]::Max($c.G, $c.B))))
  }
}
$bmp.Dispose()
$values.Sort()
$n = $values.Count
$median = $values[[int]($n / 2)]
$mean = [Math]::Round(($values | Measure-Object -Average).Average, 1)
$p95 = $values[[int]($n * 0.95)]
Write-Output ("{0} REGION=[{1},{2}..{3},{4}] N={5} MEDIAN={6} MEAN={7} P95={8}" -f `
  (Split-Path $File -Leaf), $X0, $Y0, $X1, $Y1, $n, $median, $mean, $p95)
