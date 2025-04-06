(function () {
  const script = document.currentScript;
  const projectId = script.getAttribute("data-project-id");

  const sessionId = sessionStorage.getItem("session-id") || crypto.randomUUID();
  sessionStorage.setItem("session-id", sessionId);

  const data = {
    projectId,
    sessionId,
    url: window.location.href,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: {
      width: screen.width,
      height: screen.height,
    },
    pageLoadTime: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    timeStamp: new Date().toISOString(),
  };

    fetch("https://uptime.anandrajsingh.xyz/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(console.error);

})();
