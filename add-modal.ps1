$files = @(
    'e:\Projects\Document_Sorter\presentation\pages\contradictions_grouped.html',
    'e:\Projects\Document_Sorter\presentation\pages\index.html',
    'e:\Projects\Document_Sorter\presentation\pages\scene.html',
    'e:\Projects\Document_Sorter\presentation\pages\solutions.html',
    'e:\Projects\Document_Sorter\presentation\pages\evidence.html'
)

$modalSnippet = @'

    <!-- Image Modal -->
    <div id="imageModal" onclick="closeImageModal()">
        <span class="modal-close" onclick="closeImageModal()">&times;</span>
        <img id="modalImage" src="" alt="Full resolution image">
    </div>

    <script src="shared/image-modal.js"></script>
'@

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Check if modal already exists
        if ($content -notmatch 'image-modal\.js') {
            # Insert before closing body tag
            $content = $content -replace '(\s*</body>)', ($modalSnippet + "`r`n    </body>")
            Set-Content $file -Value $content -NoNewline
            Write-Host "Updated: $file"
        } else {
            Write-Host "Skipped (already has modal): $file"
        }
    } else {
        Write-Host "Not found: $file"
    }
}

Write-Host "`nCompleted!"
