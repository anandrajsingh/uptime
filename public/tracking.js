(function () {
    const script = document.currentScript;
    const projectId = script.getAttribute("data-project-id");
  
    const data = {
      projectId,
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    };
  
    fetch("https://uptime.anandrajsingh.xyz/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  })();
  