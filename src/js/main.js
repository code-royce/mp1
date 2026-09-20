
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
