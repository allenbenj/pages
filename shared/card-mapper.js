// card-mapper.js: Assign card-type classes based on the card-label text.
(function() {
    const mapping = {
        'conflict': 'card-conflict',
        'contradiction': 'card-contradict',
        'witness': 'card-witness',
        'timeline': 'card-timeline',
        'forensics': 'card-forensics',
        'forensic': 'card-forensics',
        'forensics (dna)': 'card-forensics',
        'procedure': 'card-investigative',
        'bias': 'card-investigative',
        'inquiry': 'card-investigative',
        'injury': 'card-success',
        'relationship': 'card-investigative',
        'authentication': 'card-forensics',
        'evidence': 'card-contradict',
        'the bruises that never existed': 'card-contradict',
        'logic': 'card-investigative'
    };

    function slug(s) {
        return (s || '').toLowerCase().replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function applyMapping() {
        // Pre-compile mapping keys for faster lookup
        const mappingEntries = Object.entries(mapping);
        
        document.querySelectorAll('.card, .evidence-card, .apple-card, .action-card, .stat-card').forEach(card => {
            const labelEl = card.querySelector('.card-label, .evidence-title, .apple-title');
            if (!labelEl) return;
            
            const key = slug(labelEl.textContent || '');
            
            // Find first matching key
            for (let i = 0; i < mappingEntries.length; i++) {
                const [k, className] = mappingEntries[i];
                if (key.includes(k)) {
                    card.classList.add(className);
                    break;
                }
            }
        });
    }

    // Run on DOMContentLoaded if document isn't ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyMapping);
    } else {
        applyMapping();
    }
})();
