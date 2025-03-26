document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('site-frame');
    const navButtons = document.querySelectorAll('.nav-btn');
    const customUrlInput = document.getElementById('custom-url');
    const loadCustomBtn = document.getElementById('load-custom');
    
    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load the site
            const siteUrl = this.getAttribute('data-site');
            loadSite(siteUrl);
        });
    });
    
    // Handle custom URL loading
    loadCustomBtn.addEventListener('click', function() {
        loadCustomUrl();
    });
    
    customUrlInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loadCustomUrl();
        }
    });
    
    function loadCustomUrl() {
        let url = customUrlInput.value.trim();
        
        if (!url) return;
        
        // Add https if protocol is missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        loadSite(url);
        
        // Remove active state from nav buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    function loadSite(url) {
        // Try to bypass restrictions with different loading techniques
        try {
            // Method 1: Direct loading (works for non-restricted sites)
            iframe.src = url;
            
            // Method 2: Using a proxy service (uncomment if needed)
            // iframe.src = `https://cors-anywhere.herokuapp.com/${url}`;
            
            // Note: Some sites may still block iframe embedding through X-Frame-Options headers
        } catch (error) {
            console.error('Failed to load site:', error);
            iframe.src = 'about:blank';
            iframe.contentDocument.body.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h2>Unable to load the requested site</h2>
                    <p>The site may have restrictions that prevent embedding.</p>
                </div>
            `;
        }
    }
});
