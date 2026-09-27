$p = Join-Path $PSScriptRoot '..\app\globals.css'
$p = (Resolve-Path $p).Path
$enc = New-Object System.Text.UTF8Encoding($false)
$t = [System.IO.File]::ReadAllText($p, $enc)
$nl = if ($t.Contains("`r`n")) { "`r`n" } else { "`n" }

# 1. Drop the orphaned "Vertical anti-overflow guard" marker + everything up to
#    the Smoothness utilities section (spatial-decor CSS lives in between).
$s = $t.IndexOf('/* Vertical anti-overflow guard')
$e = $t.IndexOf('Smoothness utilities')
if ($s -ge 0 -and $e -gt $s) {
    $back = $t.LastIndexOf('/*', $e)
    if ($back -gt $s) { $e = $back }
    $min = "/* Vertical anti-overflow guard: text never squashed narrower than this */" + $nl +
           ".min-readable {" + $nl +
           "  min-width: 1.2em;" + $nl +
           "}" + $nl + $nl
    $t = $t.Substring(0, $s) + $min + $t.Substring($e)
}

# 2. Drop card-sheen (cursor gloss on service cards).
$cs = $t.IndexOf('/* Diagonal glass reflection')
if ($cs -lt 0) { $cs = $t.IndexOf('.card-sheen {') }
if ($cs -ge 0) {
    $ce = $t.IndexOf('.skip-link {')
    if ($ce -gt $cs) { $t = $t.Substring(0, $cs) + $t.Substring($ce) }
}

[System.IO.File]::WriteAllText($p, $t, $enc)
Write-Output "len=$($t.Length)"
Write-Output "spatial=$(([regex]::Matches($t, 'spatial-decor')).Count)"
Write-Output "sheen=$(([regex]::Matches($t, 'card-sheen')).Count)"
Write-Output "minread=$(([regex]::Matches($t, 'min-readable')).Count)"
Write-Output "section=$($t.Contains([char]0x00A7))"
Write-Output "box=$($t.Contains([char]0x2500))"
Write-Output "em=$($t.Contains([char]0x2014))"
