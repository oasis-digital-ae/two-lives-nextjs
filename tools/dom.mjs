// Small helpers over parse5 nodes, shared by the converter and the component matchers.

/** Collapsed text of a node (what the browser would render), ASCII whitespace folded to one space. */
export const text = (n) => (n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join("")).replace(/[ \t\n\r\f]+/g, " ");
export const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
/** Element and non-blank text children (comments and whitespace-only text dropped). */
export const kids = (n) => (n.childNodes || []).filter((c) => c.nodeName !== "#comment" && !(c.nodeName === "#text" && c.value.replace(/[ \t\n\r\f]/g, "") === ""));
export const classes = (n) => (attr(n, "class") || "").trim().split(/\s+/).filter(Boolean);
