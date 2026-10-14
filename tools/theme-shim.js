/* Two Lives Theory - theme script bundle for the Next.js port.
 * Built from the static site's js/jquery.js + js/vendors.min.js + js/main.min.js + js/app.min.js
 * plus the homepage's inline hero script. Loaded after React hydration, so by the time this
 * runs DOMContentLoaded and window load have already fired. The theme registers dozens of
 * handlers for both, so while this bundle executes we capture those registrations and replay
 * them at the end, in the same order the browser would have: DOMContentLoaded first, then load.
 */
(function () {
  var dcl = [], load = [];
  var origDoc = document.addEventListener, origWin = window.addEventListener;
  var ready = document.readyState !== "loading", loaded = document.readyState === "complete";
  document.addEventListener = function (t, fn, o) {
    if (t === "DOMContentLoaded" && ready) { dcl.push(fn); return; }
    return origDoc.call(document, t, fn, o);
  };
  window.addEventListener = function (t, fn, o) {
    if (t === "DOMContentLoaded" && ready) { dcl.push(fn); return; }
    if (t === "load" && loaded) { load.push(fn); return; }
    return origWin.call(window, t, fn, o);
  };
  window.__tltReplayEvents = function () {
    document.addEventListener = origDoc; window.addEventListener = origWin;
    var e1 = new Event("DOMContentLoaded"), e2 = new Event("load");
    dcl.forEach(function (fn) { try { fn.call(document, e1); } catch (err) { console.error(err); } });
    load.forEach(function (fn) { try { fn.call(window, e2); } catch (err) { console.error(err); } });
    dcl = []; load = [];
  };
})();
