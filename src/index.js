// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const LIFECYCLE_DOCS_URL = "https://opendatahub.com/lifecycle-management/";

const LIFECYCLE_MODES = {
  rnd: {
    label: "Beta",
    background: "#50742f",
    color: "#ffffff",
    border: "#50742f",
    description:
      "This tool is being tested and evaluated before a decision is made about production adoption",
  },
  deprecated: {
    label: "Deprecation",
    background: "#d12953",
    color: "#ffffff",
    border: "#d12953",
    description:
      "This tool is no longer part of the supported core and is planned for shutdown",
  },
};

function normalizeMode(raw) {
  if (!raw) return null;
  const key = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  if (key === "rnd" || key === "randd" || key === "research" || key === "beta")
    return "rnd";
  if (key === "deprecated" || key === "deprecate" || key === "deprecation")
    return "deprecated";
  return null;
}

class LifecycleBadge extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["lifecycle"];
  }

  attributeChangedCallback(propName, oldValue, newValue) {
    if (propName === "lifecycle" && oldValue !== newValue) {
      this.render();
    }
  }

  get lifecycle() {
    return this.getAttribute("lifecycle");
  }

  set lifecycle(newValue) {
    this.setAttribute("lifecycle", newValue);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const mode = normalizeMode(this.lifecycle);

    if (!mode) {
      this.shadow.innerHTML = "";
      if (this.lifecycle) {
        console.warn(
          `opendatahub-lifecycle-badge: unrecognized lifecycle value "${this.lifecycle}"`,
        );
      }
      return;
    }

    const { label, background, color, border, description } =
      LIFECYCLE_MODES[mode];

    this.shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          align-self: stretch;
          position: relative;
        }

        .badge-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          height: 100%;
        }

        a.badge {
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          
          height: 100%;
          margin-left: 1rem;
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid ${border};

          font-size: 1.125rem;
          line-height: 1.25rem;
          font-weight: 700;

          background-color: ${background};
          color: ${color};
          text-transform: uppercase;
          letter-spacing: 0.03em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        a.badge:hover {
          filter: brightness(0.95);
        }

        .tooltip {
          position: absolute;
          top: calc(100% + 10px); /* Positioned below the badge */
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;

          width: max-content;
          max-width: 220px;
          padding: 6px 10px;
          border-radius: 4px;
          
          background-color: #374151; /* bg-gray-700 */
          color: #ffffff;
          font-size: 0.875rem; /* text-sm */
          font-weight: 400;
          text-transform: none;
          letter-spacing: normal;
          text-align: center;
          word-break: break-word;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

          /* Smooth Transition */
          opacity: 0;
          visibility: hidden;
          transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
          pointer-events: none;
        }

        /* Tooltip Arrow - Positioned at top center, pointing up */
        .tooltip-arrow {
          position: absolute;
          top: -4px; /* Move arrow to top edge */
          bottom: auto; /* Clear bottom rule */
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background-color: #374151; /* Matches tooltip background */
        }

        /* Hover & Focus States */
        .badge-container:hover .tooltip,
        .badge-container:focus-within .tooltip {
          opacity: 1;
          visibility: visible;
        }
      </style>

      <div class="badge-container">
        <a class="badge" href="${LIFECYCLE_DOCS_URL}" target="_blank" rel="noopener noreferrer">
          ${label}
        </a>
        <div class="tooltip" role="tooltip">
          ${description}
          <div class="tooltip-arrow"></div>
        </div>
      </div>
    `;

    const linkEl = this.shadow.querySelector("a.badge");
    if (linkEl) {
      linkEl.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
}

customElements.define("opendatahub-lifecycle-badge", LifecycleBadge);
