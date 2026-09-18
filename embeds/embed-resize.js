// Include once in an article containing KOSSDA embeds.
(() => {
  if (window.__kossdaResizeInstalled) return;
  window.__kossdaResizeInstalled = true;
  window.addEventListener("message", event => {
    if (!event.data || event.data.type !== "kossda:resize") return;
    const height = Number(event.data.height);
    if (!Number.isFinite(height) || height < 100 || height > 10000) return;
    for (const frame of document.querySelectorAll("iframe[data-kossda-embed]")) {
      if (frame.contentWindow !== event.source) continue;
      if (new URL(frame.src, document.baseURI).origin !== event.origin) continue;
      frame.height = String(Math.ceil(height));
      frame.style.setProperty("height", Math.ceil(height) + "px", "important");
      break;
    }
  });
  document.querySelectorAll("iframe[data-kossda-embed]").forEach(frame => {
    const measure = () => frame.contentWindow.postMessage({type: "kossda:measure"}, new URL(frame.src, document.baseURI).origin);
    frame.addEventListener("load", measure);
    measure();
  });
})();
