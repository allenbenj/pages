$files = @(
    'e:\Projects\Document_Sorter\presentation\pages\timeline.html',
    'e:\Projects\Document_Sorter\presentation\pages\connections.html',
    'e:\Projects\Document_Sorter\presentation\pages\contradictions_grouped.html',
    'e:\Projects\Document_Sorter\presentation\pages\contradictions.html',
    'e:\Projects\Document_Sorter\presentation\pages\index.html',
    'e:\Projects\Document_Sorter\presentation\pages\scene.html',
    'e:\Projects\Document_Sorter\presentation\pages\solutions.html',
    'e:\Projects\Document_Sorter\presentation\pages\evidence.html'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Convert image links to modal clicks
        # Pattern: <a ...href="path/to/image.ext"...><img ...src="..."...></a>
        $content = $content -replace '<a\s+[^>]*?href="([^"]+\.(png|jpg|jpeg|webp|svg))"[^>]*?>\s*<img\s+([^>]*?)src="[^"]*"([^>]*?)>\s*</a>', '<img $3src="$1"$4 onclick="openImageModal(''$1'')" style="cursor: zoom-in;">'
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed image links in: $file"
    }
}

Write-Host "`nCompleted!"
