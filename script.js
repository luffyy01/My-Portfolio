document.addEventListener('click', function(e) {
    if (e.target.closest('.hamburger')) {
        document.getElementById('hamburger').classList.toggle('active');
        document.getElementById('mobileMenu').classList.toggle('active');
    }

    if (e.target.matches('.nav-btn')) {
        const pageId = e.target.dataset.page || e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
        document.querySelectorAll('.page-section').forEach(function(page) {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(function(b) {
            b.classList.remove('active');
        });
        document.querySelectorAll(`.nav-btn[data-page="${pageId}"], .nav-btn[onclick*="${pageId}"]`).forEach(function(b) {
            b.classList.add('active');
        });

        window.scrollTo(0, 0);

        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }
});

window.addEventListener('scroll', function() {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
        document.getElementById('mobileMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    }
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! (Demo)');
});