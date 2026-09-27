param([string[]]$Files)
Add-Type -AssemblyName System.Drawing

function Get-RegionStat {
  param($bmp, [int]$x0, [int]$y0, [int]$x1, [int]$y1)
  $sum = 0; $n = 0; $max = 0
  for ($y = $y0; $y -lt $y1; $y += 3) {
    for ($x = $x0; $x -lt $x1; $x += 3) {
      $c = $bmp.GetPixel($x, $y)
      $b = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
      $sum += $b; $n++
      if ($b -gt $max) { $max = $b }
    }
  }
  return ("{0}/{1}" -f [Math]::Round($sum / [Math]::Max($n, 1), 1), $max)
}

foreach ($f in $Files) {
  if (-not (Test-Path $f)) { Write-Output "$f -> MISSING"; continue }
  $bmp = [System.Drawing.Bitmap]::FromFile($f)
  $parts = @()
  $parts += "copy=" + (Get-RegionStat $bmp 48 240 640 400)
  $parts += "hud=" + (Get-RegionStat $bmp 24 88 240 130)
  $parts += "portalLbl=" + (Get-RegionStat $bmp 365 364 466 380)
  $parts += "right=" + (Get-RegionStat $bmp 1160 88 1400 380)
  $parts += "center=" + (Get-RegionStat $bmp 600 350 840 540)
  Write-Output ("{0} {1}x{2} {3}" -f (Split-Path $f -Leaf), $bmp.Width, $bmp.Height, ($parts -join "  "))
  $bmp.Dispose()
}
