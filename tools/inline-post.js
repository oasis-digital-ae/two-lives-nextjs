/* journal/blog post inline script (identical on every post page): restyles the editor output */
document.addEventListener("DOMContentLoaded", () => {
    const scope = document.querySelector(".auto-content");
    if (!scope) return;

    /* H1 – unchanged */
    scope.querySelectorAll("h1").forEach(h1 => {
        h1.className = `
            hero-heading
            appear
            anime-complete
            mb-40px
            alt-font
            text-carbon
        `;
    });

    /* H2 */
    scope.querySelectorAll("h2").forEach(h2 => {
        h2.className = `
            text-carbon
            text-shadow-soft
            alt-font
            fw-600
            ls-minus-2px
            mb-25px
            fs-30 sm-fs-32 md-fs-36 lg-fs-40
        `;
    });

    /* H3 */
    scope.querySelectorAll("h3").forEach(h3 => {
        h3.className = `
            text-shadow-soft
            alt-font
            text-carbon
            fw-600
            ls-minus-2px
            mb-25px
            fs-26 sm-fs-28 md-fs-32 lg-fs-40
        `;
    });

    /* H4 */
    scope.querySelectorAll("h4").forEach(h4 => {
        h4.className = `
            text-shadow-soft
            alt-font
            text-carbon
            fw-600
            ls-minus-2px
            mb-25px
            fs-24 sm-fs-26 md-fs-30 lg-fs-40
        `;
    });

    /* H5 */
    scope.querySelectorAll("h5").forEach(h5 => {
        h5.className = `
            text-shadow-soft
            alt-font
            text-carbon
            fw-600
            ls-minus-2px
            mb-25px
            fs-20 sm-fs-22 md-fs-24
        `;
    });

    /* Paragraphs */
    scope.querySelectorAll("p").forEach(p => {
        p.className = `
            text-carbon
            mb-25px
            sm-fs-16
        `;
    });

    /* Images */
    scope.querySelectorAll("img").forEach(img => {
        img.classList.add(
            "w-100",
            "border-radius-12px",
            "mt-40px",
            "mb-40px"
        );
    });

    /* Lists */
    scope.querySelectorAll("ul, ol").forEach(list => {
        list.classList.add(
            "text-carbon",
            "mb-30px"
        );
    });
});
