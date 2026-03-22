$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pagesRepoRoot = Split-Path -Parent $scriptDir
$sourceRepoRoot = Resolve-Path (Join-Path $pagesRepoRoot "..\\two-circles-webgpu")
$sourceDistRoot = Join-Path $sourceRepoRoot "dist"

Write-Host "Building source app from $sourceRepoRoot"
pnpm --dir $sourceRepoRoot build

if (-not (Test-Path $sourceDistRoot)) {
  throw "Build output not found at $sourceDistRoot"
}

$publishedEntries = @(
  "assets",
  "index.html",
  "favicon.svg"
)

foreach ($entry in $publishedEntries) {
  $targetPath = Join-Path $pagesRepoRoot $entry
  if (Test-Path $targetPath) {
    Remove-Item -Recurse -Force $targetPath
  }
}

Write-Host "Copying build output into $pagesRepoRoot"
Copy-Item -Recurse -Force (Join-Path $sourceDistRoot "*") $pagesRepoRoot

if (-not (Test-Path (Join-Path $pagesRepoRoot "favicon.svg"))) {
  $publishedIndexPath = Join-Path $pagesRepoRoot "index.html"
  if (Test-Path $publishedIndexPath) {
    $publishedIndex = Get-Content $publishedIndexPath -Raw
    $publishedIndex = [regex]::Replace(
      $publishedIndex,
      '(?m)^\s*<link rel="icon"[^>]*>\r?\n?',
      ""
    )
    Set-Content -Path $publishedIndexPath -Value $publishedIndex -Encoding utf8
  }
}

Write-Host "Publish sync complete"
