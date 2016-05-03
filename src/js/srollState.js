  /*!
 * borrowed from:
 * gascrolldepth.js | v0.9
 * Copyright (c) 2015 Rob Flaherty (@robflaherty), Leigh McCulloch (@___leigh___)
 * Licensed under the MIT and GPL licenses.
 */
  function getDocumentHeight() {
    return Math.max(
      document.documentElement["scrollHeight"], document.body["scrollHeight"],
      document.documentElement["offsetHeight"], document.body["offsetHeight"],
      document.documentElement["clientHeight"]
    );
  }

  // Reliably get the window height.
  // Ref: http://www.w3schools.com/js/js_window.asp
  function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  // Reliably get the page y-axis offset due to scrolling.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  function getPageYOffset() {
    return window.pageYOffset || (document.compatMode === "CSS1Compat" ? document.documentElement.scrollTop : document.body.scrollTop);
  }

  // Reliably get the element's y-axis offset to the document top.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  function getElementYOffsetToDocumentTop(element) {
    return element.getBoundingClientRect().top + getPageYOffset();
  }