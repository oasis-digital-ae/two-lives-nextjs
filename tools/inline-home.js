/* homepage inline hero parallax (was inline in index.html) */
(function(){
const basim = document.querySelector('.hero-basim-layer');
        const name = document.querySelector('.hero-name');
        const icon = document.querySelector('.hero-icon-layer');

        window.addEventListener('scroll', () => {

            const scroll = window.scrollY;

            if(name){
                name.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.18}px))`;
            }

            if(basim){
                basim.style.transform = `translate(-50%, ${scroll * 0.35}px)`;
            }

            if(icon){
                icon.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.12}px))`;
            }

        });

        /* rename here */
        const heroIcon = document.getElementById("heroIcon");

        window.addEventListener("scroll", () => {

            const scrollY = window.scrollY;
            const scale = 1 + scrollY * 0.0004;

            if(heroIcon){
                heroIcon.style.transform = `scale(${scale})`;
            }

        });

        
})();
