import { css } from "lit";

export const typography = css`
  :host {
    /* material 3 tokens: https://m3.material.io/styles/typography/tokens */
    /* type */
    --type-brand: "Lato", sans-serif;
    --type-plain: "Roboto", sans-serif;
    --type-weight-light: 300;
    --type-weight-regular: 400;
    --type-weight-medium: 500;
    font-family: var(--type-plain);
  }
`;

export const colors = css`
  :host {
    /* color */
    --color-primary: rgba(137, 200, 50, 1); /* lime */
    --color-on-primary: #fff;
    --color-primary-container: rgba(228, 255, 184, 1); /* light-lime */
    --color-on-primary-container: rgba(44, 75, 6, 1); /* very dark lime */

    --color-secondary: rgba(144, 147, 152, 1);
    --color-on-secondary: rgba(237, 239, 244, 1);
    --color-secondary-container: #626262;
    --color-on-secondary-container: #fff;

    /*
    --color-tertiary: #fff;
    --color-on-tertiary: #000;
    --color-tertiary-container: #ccc;
    --color-on-tertiary-container: #000;
    */

    --color-error: rgba(229, 90, 90, 1);
    --color-on-error: #fff;
    --color-error-container: rgba(229, 214, 204, 1);
    --color-on-error-container: rgba(153, 6, 13, 1);

    --color-surface: #fff;
    --color-on-surface: #000;
    --color-surface-variant: #e0e0e0;
    --color-on-surface-variant: #000;

    --color-background: #fff;
    --color-on-background: #000;

    --color-outline: #ccc;

    --color-inverse-surface: rgba(34, 38, 41, 1); /* very dark gray */
    --color-inverse-on-surface: #fff;
    --color-inverse-primary: rgba(137, 200, 50, 1); /* lime */
    /* --color-shadow: #000; */

    /** new style for material design */
    /*
    --md-sys-color-primary: var(--color-primary);
    --md-filled-button-container-shape: 0px;
    */
  }
`;

export const spacing = css`
  :host {
    --ratio: 1.5;
    --s-5: calc(var(--s-4) / var(--ratio));
    --s-4: calc(var(--s-3) / var(--ratio));
    --s-3: calc(var(--s-2) / var(--ratio));
    --s-2: calc(var(--s-1) / var(--ratio));
    --s-1: calc(var(--s0) / var(--ratio));
    --s0: 1rem;
    --s1: calc(var(--s0) * var(--ratio));
    --s2: calc(var(--s1) * var(--ratio));
    --s3: calc(var(--s2) * var(--ratio));
    --s4: calc(var(--s3) * var(--ratio));
    --s5: calc(var(--s4) * var(--ratio));
  }
`;

export const baseComponents = css`
  /* ------------------- 
      BASE (COMPONENTS) - for default HTML elements
      e.g., a, li, h1 
   ------------------- */

  /* material 3 type tokens : https://m3.material.io/styles/typography/tokens */
  h1,
  h2,
  h3,
  h4 {
    margin: 0px;
    max-inline-size: 60ch;
  }

  .display-large {
    font-family: var(--type-brand);
    line-height: calc(64 * 0.0625rem);
    font-size: calc(57 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-light);
  }
  .display-medium {
    font-family: var(--type-brand);
    line-height: calc(52 * 0.0625rem);
    font-size: calc(45 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-light);
  }
  .display-small {
    font-family: var(--type-brand);
    line-height: calc(44 * 0.0625rem);
    font-size: calc(36 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-light);
  }
  .headline-large {
    font-family: var(--type-brand);
    line-height: calc(40 * 0.0625rem);
    font-size: calc(32 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-light);
  }
  .headline-medium {
    font-family: var(--type-brand);
    line-height: calc(36 * 0.0625rem);
    font-size: calc(28 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-light);
  }

  .headline-small {
    font-family: var(--type-brand);
    line-height: calc(32 * 0.0625rem);
    font-size: calc(24 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-medium);
  }
  .title-large {
    font-family: var(--type-brand);
    line-height: calc(28 * 0.0625rem);
    font-size: calc(22 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-medium);
  }
  .title-medium {
    font-family: var(--type-plain);
    line-height: calc(24 * 0.0625rem);
    font-size: calc(16 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-medium);
  }
  .title-small {
    font-family: var(--type-plain);
    line-height: calc(20 * 0.0625rem);
    font-size: calc(14 * 0.0625rem + 0.15vw);
    letter-spacing: 0rem;
    font-weight: var(--type-weight-medium);
  }
  .label-large {
    font-family: var(--type-plain);
    line-height: calc(20 * 0.0625rem);
    font-size: calc(14 * 0.0625rem + 0.15vw);
    letter-spacing: calc(0.1 / 14rem);
    font-weight: var(--type-weight-medium);
  }
  .label-medium {
    font-family: var(--type-plain);
    line-height: calc(16 * 0.0625rem);
    font-size: calc(12 * 0.0625rem + 0.15vw);
    letter-spacing: calc(0.5 / 12rem);
    font-weight: var(--type-weight-medium);
  }
  .label-small {
    font-family: var(--type-plain);
    line-height: calc(6 * 0.0625rem);
    font-size: calc(11 * 0.0625rem + 0.15vw);
    letter-spacing: calc(0.5 / 11rem);
    font-weight: var(--type-weight-medium);
  }

  .body-large,
  p {
    font-family: var(--type-plain);
    line-height: calc(24 * 0.0625rem);
    /* font-size: calc(16 * 0.0625rem); */ /* 16 * 0.0625 = 1 */
    font-size: calc(16 * 0.0625rem + 0.15vw);
    /* font-size: calc(16 * 0.0625rem + 0.5vw); */
    letter-spacing: calc(0.15 / 16rem);
    font-weight: var(--type-weight-regular);
  }

  .body-medium {
    font-family: var(--type-plain);
    line-height: calc(20 * 0.0625rem);
    /* font-size: calc(14 * 0.0625rem); */
    font-size: calc(14 * 0.0625rem + 0.15vw);
    /* font-size: calc(14 * 0.0625rem + 0.5vw); */
    letter-spacing: calc(0.25 / 14rem);
    font-weight: var(--type-weight-regular);
  }

  .body-small {
    font-family: var(--type-plain);
    line-height: calc(16 * 0.0625rem);
    /* font-size: calc(12 * 0.0625rem); */
    font-size: calc(12 * 0.0625rem + 0.15vw);
    /* font-size: calc(12 * 0.0625rem + 0.5vw); */
    letter-spacing: calc(0.4r / 12rem);
    font-weight: var(--type-weight-regular);
  }
`;

export const layout = css`
  .l-spacer {
    flex-grow: 1;
  }

  .l-column > * + * {
    margin-top: 12px;
  }

  .l-row {
    display: flex;
    align-items: center;
  }
  .l-row > * + * {
    margin-left: 8px;
  }
`;

export const sharedCSS = css`
  ${typography}
  ${colors}  
  ${spacing}
  ${baseComponents}
  ${layout}
`;
