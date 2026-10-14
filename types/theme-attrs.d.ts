/*
 * Non-standard attributes the theme's JavaScript reads straight off the DOM
 * (e.g. anime.js stagger settings on [data-anime] elements). React passes
 * unknown string attributes through to the DOM; this only teaches TypeScript
 * that they are allowed in the ported markup.
 */
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    staggervalue?: string;
    easing?: string;
  }
  interface SVGAttributes<T> {
    side?: string;
  }
}
