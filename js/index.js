(function() {
    var glow = document.getElementById('glow');
    document.addEventListener('mousemove', function(e) {
        var x = (e.clientX / window.innerWidth) * 100;
        var y = (e.clientY / window.innerHeight) * 100;
        glow.style.setProperty('--x', x + '%');
        glow.style.setProperty('--y', y + '%');
    });
    document.addEventListener('touchmove', function(e) {
        var touch = e.touches[0];
        if (touch) {
            var x = (touch.clientX / window.innerWidth) * 100;
            var y = (touch.clientY / window.innerHeight) * 100;
            glow.style.setProperty('--x', x + '%');
            glow.style.setProperty('--y', y + '%');
        }
    }, { passive: true });

    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    var overlay = document.getElementById('voiceModalOverlay');
    var trigger = document.getElementById('voiceTrigger');
    var closeBtn = document.getElementById('voiceModalClose');

    function openModal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        openModal();
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });

    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    }, { passive: false });
})();