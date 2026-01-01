$files = @(
    'e:\Projects\Document_Sorter\presentation\pages\timeline.html',
    'e:\Projects\Document_Sorter\presentation\pages\evidence.html',
    'e:\Projects\Document_Sorter\presentation\pages\index.html',
    'e:\Projects\Document_Sorter\presentation\pages\scene.html',
    'e:\Projects\Document_Sorter\presentation\pages\contradictions.html',
    'e:\Projects\Document_Sorter\presentation\pages\solutions.html'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Convert video links with icon to clickable icons that open modal
        # Pattern: <a href="video/...mp4" ...><img src="...video-icon..." ...></a>
        $content = $content -replace '<a\s+href="([^"]+\.mp4)"[^>]*?>\s*<img\s+src="([^"]+video-icon[^"]*)"([^>]*?)>\s*</a>', '<img src="$2"$3 onclick="openImageModal(''$1'')" style="cursor: pointer;">'
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed video links in: $file"
    }
}

Write-Host "`nCompleted!"
