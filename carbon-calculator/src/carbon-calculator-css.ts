import { css } from "lit";

export const sharedCSS = css`
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
