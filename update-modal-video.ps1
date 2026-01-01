$files = @(
    'e:\Projects\Document_Sorter\presentation\pages\players.html',
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
        
        # Replace the modal img element with both img and video elements
        $content = $content -replace '<img id="modalImage" src="" alt="Full resolution image">', '<img id="modalImage" src="" alt="Full resolution image">`r`n        <video id="modalVideo" controls></video>'
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Updated modal in: $file"
    }
}

Write-Host "`nCompleted!"
