/* Relationship Map JavaScript - Shared Script */

function initializeRelationshipMap() {
    const map = document.getElementById('relationshipMap');
    if (!map) return;
    
    map.innerHTML = '';
    
    // Define positions for people with better spacing
    const people = [
        { id: 'deal', name: 'Lauren Deal\nAccuser', type: 'person-accuser', x: 100, y: 100 },
        { id: 'allen', name: 'Benjamin Allen\nDefendant', type: 'person-defendant', x: 100, y: 300 },
        { id: 'freeman', name: 'Det. Steve Freeman\nInvestigator', type: 'person-official', x: 300, y: 200 },
        { id: 'bartholomew', name: 'ADA Tiffany Bartholomew\nProsecutor', type: 'person-official', x: 500, y: 200 },
        { id: 'love', name: 'Carmen Love\nWitness', type: 'person-witness', x: 700, y: 100 },
        { id: 'west', name: 'Peter West III\nWitness', type: 'person-witness', x: 700, y: 300 },
        { id: 'morrison', name: 'James Morrison\nWitness', type: 'person-witness', x: 900, y: 200 }
    ];
    
    // Create connections
    const connections = [
        { from: 'freeman', to: 'love', label: 'Family Relationship\n(Concealed)' },
        { from: 'freeman', to: 'west', label: 'Colleague Relationship\n(Concealed)' },
        { from: 'bartholomew', to: 'deal', label: 'Witness Coaching' },
        { from: 'freeman', to: 'morrison', label: 'Never Interviewed' }
    ];
    
    // Create connection lines
    connections.forEach(conn => {
        const fromPerson = people.find(p => p.id === conn.from);
        const toPerson = people.find(p => p.id === conn.to);
        
        if (fromPerson && toPerson) {
            const dx = toPerson.x - fromPerson.x;
            const dy = toPerson.y - fromPerson.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            const line = document.createElement('div');
            line.className = 'connection';
            line.style.width = length + 'px';
            line.style.height = '2px';
            line.style.left = (fromPerson.x + 60) + 'px';
            line.style.top = (fromPerson.y + 30) + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            line.title = conn.label;
            
            map.appendChild(line);
        }
    });
    
    // Create person nodes with drag functionality
    people.forEach(person => {
        const node = document.createElement('div');
        node.className = `person-node ${person.type}`;
        node.style.left = person.x + 'px';
        node.style.top = person.y + 'px';
        node.innerHTML = person.name.replace(/\n/g, '<br>');
        node.setAttribute('data-id', person.id);
        
        // Add drag functionality
        makeDraggable(node);
        
        map.appendChild(node);
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.classList.add('dragging');
    }
    
    function dragTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDragTouch;
        element.classList.add('dragging');
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function elementDragTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
        element.classList.remove('dragging');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeRelationshipMap();
});
