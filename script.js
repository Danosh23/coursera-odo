// Hamburger menu toggle for mobile navigation
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    if (hamburger && navUl) {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        navUl.classList.toggle('active');
    }
}

const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Close menu on mobile after click
            const navUl = document.querySelector('nav ul');
            if (navUl && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Toggle project details on click
const projectArticles = document.querySelectorAll('#projects article');
projectArticles.forEach(article => {
    article.style.cursor = 'pointer';
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-expanded', 'false');
    const details = article.querySelector('p');
    if (details) {
        details.style.display = 'none';
        const summary = article.querySelector('figcaption');
        if (summary) {
            summary.innerHTML += ' <span aria-hidden="true">&#9660;</span>';
        }
        function toggleDetails() {
            const expanded = article.getAttribute('aria-expanded') === 'true';
            article.setAttribute('aria-expanded', !expanded);
            details.style.display = expanded ? 'none' : 'block';
            if (summary) {
                summary.querySelector('span').innerHTML = expanded ? '▼' : '▲';
            }
        }
        article.addEventListener('click', toggleDetails);
        article.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleDetails();
            }
        });
    }
});

// Skills: highlight on hover/focus
const skillItems = document.querySelectorAll('#skills li');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.background = '#007bff';
        item.style.color = '#fff';
    });
    item.addEventListener('mouseleave', () => {
        item.style.background = '';
        item.style.color = '';
    });
    item.addEventListener('focus', () => {
        item.style.background = '#007bff';
        item.style.color = '#fff';
    });
    item.addEventListener('blur', () => {
        item.style.background = '';
        item.style.color = '';
    });
    item.setAttribute('tabindex', '0');
});

// Contact form: show a thank you message on submit and validate fields
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Basic validation
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const message = contactForm.querySelector('#message');
        let valid = true;
        // Remove previous error messages
        contactForm.querySelectorAll('.form-error').forEach(el => el.remove());
        [name, email, message].forEach(field => field.style.borderColor = '');
        // Name validation
        if (!name.value.trim()) {
            valid = false;
            showError(name, 'Name is required.');
        }
        // Email validation
        if (!email.value.trim()) {
            valid = false;
            showError(email, 'Email is required.');
        } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            valid = false;
            showError(email, 'Please enter a valid email address.');
        }
        // Message validation
        if (!message.value.trim()) {
            valid = false;
            showError(message, 'Message is required.');
        }
        if (!valid) return;
        contactForm.reset();
        const thankYou = document.createElement('div');
        thankYou.textContent = 'Thank you for your message!';
        thankYou.style.color = '#007bff';
        thankYou.style.fontWeight = 'bold';
        thankYou.style.marginTop = '1rem';
        contactForm.parentNode.appendChild(thankYou);
        setTimeout(() => {
            thankYou.remove();
        }, 4000);
    });
}
// Real-time validation for contact form fields
if (contactForm) {
    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    function validateField(field, validator, errorMsg) {
        // Remove previous error
        const prevError = field.parentNode.querySelector('.form-error');
        if (prevError) prevError.remove();
        field.style.borderColor = '';
        if (!validator(field.value)) {
            showError(field, errorMsg);
            return false;
        }
        return true;
    }

    name.addEventListener('input', () => {
        validateField(name, v => v.trim() !== '', 'Name is required.');
    });
    email.addEventListener('input', () => {
        validateField(email, v => v.trim() !== '' && /^\S+@\S+\.\S+$/.test(v), 'Please enter a valid email address.');
    });
    message.addEventListener('input', () => {
        validateField(message, v => v.trim() !== '', 'Message is required.');
    });
}
function showError(field, message) {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    error.style.color = '#d32f2f';
    error.style.fontSize = '0.95rem';
    error.style.marginTop = '0.2rem';
    field.style.borderColor = '#d32f2f';
    field.parentNode.insertBefore(error, field.nextSibling);
}

// Project filter feature
function filterProjects(category) {
    const articles = document.querySelectorAll('#projects article');
    articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
}

// Add filter buttons dynamically (example categories)
const projectSection = document.getElementById('projects');
if (projectSection) {
    const categories = ['all', 'web', 'data', 'support'];
    const filterBar = document.createElement('div');
    filterBar.style.display = 'flex';
    filterBar.style.gap = '1rem';
    filterBar.style.marginBottom = '1.5rem';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.setAttribute('type', 'button');
        btn.style.background = '#e6f0fa';
        btn.style.color = '#007bff';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.padding = '0.5rem 1.2rem';
        btn.style.fontWeight = '500';
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', () => filterProjects(cat));
        filterBar.appendChild(btn);
    });
    projectSection.insertBefore(filterBar, projectSection.querySelector('article'));
}

// Assign example categories to articles (customize as needed)
const articles = document.querySelectorAll('#projects article');
if (articles[0]) articles[0].dataset.category = 'web';
if (articles[1]) articles[1].dataset.category = 'data';

// Lightbox effect for project images
function openLightbox(imgSrc, altText) {
    let modal = document.getElementById('lightbox-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';
        modal.innerHTML = `
            <div style="position:relative;max-width:90vw;max-height:90vh;">
                <img src="${imgSrc}" alt="${altText}" style="max-width:100%;max-height:80vh;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
                <button id="close-lightbox" aria-label="Close image" style="position:absolute;top:10px;right:10px;background:#fff;color:#007bff;border:none;border-radius:50%;width:36px;height:36px;font-size:1.5rem;cursor:pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.id === 'close-lightbox') {
                modal.remove();
            }
        });
        document.addEventListener('keydown', function escListener(ev) {
            if (ev.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escListener);
            }
        });
    }
}

// Attach lightbox to project images
articles.forEach(article => {
    const img = article.querySelector('img');
    if (img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(img.src, img.alt);
        });
    }
});
