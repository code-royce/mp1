// Shrink the header and highlight the current section while scrolling.
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('#nav-bar a');

function highlightNavLink() {
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scroll = window.scrollY;
    const headerHeight = header.offsetHeight;

    // Ensure bottom of the page highlights last section.
    if (windowHeight + scroll >= totalHeight) {
        pickCurrentSection(sections[sections.length - 1].getAttribute('id'));
        return;
    }

    sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;

        if (top <= headerHeight) {
            pickCurrentSection(section.getAttribute('id'));
        }
    });
}

// Helper for hilightNavLink()
function pickCurrentSection(sectionId) {
    links.forEach((link) => {
        const linkId = link.getAttribute('href').replace('#', '');
        link.classList.toggle('highlighted', linkId === sectionId);
    })
}

window.addEventListener('scroll', () => {
    const isScrolling = window.scrollY > 80;
    header.classList.toggle('reduced', isScrolling);
    highlightNavLink();
});


// Open a project modal on click, close it on the next click.
const slides = document.querySelectorAll('.slide');
const modals = document.querySelectorAll('.modal');

slides.forEach((slide) => {
    slide.addEventListener('click', () => {
        document.getElementById(slide.getAttribute('data-modal')).classList.add('open');
    });
});

modals.forEach((modal) => {
    modal.addEventListener('click', () => {
        modal.classList.remove('open');
    });
});


// Step through the project slides, wrapping around at either end.
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let current = 0;

function showSlide(idx) {
    slides.forEach((slide, slideIdx) => {
        slide.classList.toggle('in-focus', slideIdx === idx);
    });
}

prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
});

next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
});
