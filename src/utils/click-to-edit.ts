/**
 * Click-to-edit: when the frontend is loaded inside the CMS live preview iframe,
 * clicking on elements with data-payload-field attributes sends a message
 * to the CMS admin to focus that field.
 *
 * Usage: wrap text in your views with the PayloadField component or add
 * data-payload-field="fieldName" to any element.
 */

const HIGHLIGHT_CLASS = "payload-field-highlight";

let styleInjected = false;

function injectStyles() {
  if (styleInjected) return;
  styleInjected = true;

  const style = document.createElement("style");
  style.textContent = `
    [data-payload-field] {
      cursor: pointer;
      transition: outline 0.15s ease, background-color 0.15s ease;
    }
    [data-payload-field]:hover {
      outline: 2px solid oklch(0.6 0.2 260);
      outline-offset: 2px;
      background-color: oklch(0.6 0.2 260 / 0.05);
    }
    [data-payload-field].${HIGHLIGHT_CLASS} {
      outline: 2px solid oklch(0.6 0.2 260);
      outline-offset: 2px;
      background-color: oklch(0.6 0.2 260 / 0.1);
    }
  `;
  document.head.appendChild(style);
}

function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function initClickToEdit() {
  if (!isInIframe()) return;

  injectStyles();

  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("[data-payload-field]");
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();

    const fieldName = target.getAttribute("data-payload-field");
    if (!fieldName) return;

    // Send message to CMS admin to focus this field
    const cmsOrigin = (import.meta as any).env?.VITE_PAYLOAD_URL || "*";
    window.parent.postMessage(
      {
        type: "payload-focus-field",
        field: fieldName,
      },
      cmsOrigin
    );

    // Visual feedback
    document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
      el.classList.remove(HIGHLIGHT_CLASS);
    });
    target.classList.add(HIGHLIGHT_CLASS);
    setTimeout(() => target.classList.remove(HIGHLIGHT_CLASS), 1500);
  });
}
