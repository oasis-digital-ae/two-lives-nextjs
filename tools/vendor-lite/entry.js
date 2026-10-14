/*
 * Replacements for the three largest Crafto vendor libraries, built from the npm
 * packages at the exact versions the theme ships (Swiper 11.2.10, Bootstrap 5.3.7,
 * anime.js 4.1.3) but containing only what the Two Lives pages use. Each one is
 * exposed under the same global the theme's main.js expects.
 *
 * Bundled by tools/build-theme-js.mjs with esbuild into one IIFE.
 */

// Swiper: main.js does `new Swiper(el, options)`; the pages' data-slider-options use
// navigation, pagination, autoplay, keyboard and freeMode. Other modules (thumbs, zoom,
// scrollbar, effects...) are never configured by any page.
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Keyboard, FreeMode } from "swiper/modules";
Swiper.use([Navigation, Pagination, Autoplay, Keyboard, FreeMode]);
window.Swiper = Swiper;

// Bootstrap: only the data-API components the markup uses (navbar collapse, accordion,
// dropdown menus, tabs). Importing a dist component registers its data-bs-* handlers.
import Collapse from "bootstrap/js/dist/collapse";
import Dropdown from "bootstrap/js/dist/dropdown";
import Tab from "bootstrap/js/dist/tab";
window.bootstrap = { Collapse, Dropdown, Tab };

// anime.js v4: main.js uses anime.createTimeline(), anime.stagger() and, through
// `const {animate} = anime` at its top, animate().
import { animate, createTimeline, stagger } from "animejs";
window.anime = { animate, createTimeline, stagger };
