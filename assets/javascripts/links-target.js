document.addEventListener('DOMContentLoaded', () => {
    const selectors = [
        'a[href*="github.com"]',
        'a[href*="/stargazers"]',
        'a[href*="/network"]',
        'a[href*="/network/members"]',
        'a[href*="/fork"]',
        'a[aria-label*="Star"]',
        'a[aria-label*="Fork"]'
    ];
    const setBlank = (link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    };
    document.querySelectorAll(selectors.join(',')).forEach(setBlank);
});