document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const typewriterText = document.getElementById('typewriter-text');
    const typewriterPhrases = [
        "Proficient in computer applications",
        "Excellent proficiency in Kiswahili",
        "Strong communication skills",
        "Excellent interpersonal skills",
        "Assertiveness and adept behavior management",
        "Effective team organization"
    ];
    let phraseIndex = 0;
    let letterIndex = 0;

    const typeWriter = () => {
        if (letterIndex < typewriterPhrases[phraseIndex].length) {
            typewriterText.textContent += typewriterPhrases[phraseIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typewriterText.textContent = '';
                letterIndex = 0;
                phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
                setTimeout(typeWriter, 100);
            }, 2000);
        }
    };

    // Start typewriter effect
    typeWriter();

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Update active link
            updateActiveLink(targetId);
        });
    });

    // Section reveal on scroll
    const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('show');
            }
        });
    };

    // Highlight active nav link based on scroll position
    const updateActiveLink = (id) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const highlightNavLinkOnScroll = () => {
        let currentSection = sections[0].id;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 50) {
                currentSection = section.id;
            }
        });

        updateActiveLink(currentSection);
    };

    // Event listeners
    window.addEventListener('scroll', () => {
        revealSection();
        highlightNavLinkOnScroll();
    });

    // Initial call
    revealSection();
    highlightNavLinkOnScroll();

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
