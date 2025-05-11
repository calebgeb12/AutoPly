const textarea = document.getElementById("urlList");
const saveBtn = document.getElementById("saveLinks");
const clearBtn = document.getElementById("clearLinks");
const openBtn = document.getElementById("openLinks");
const toggle = document.getElementById("toggleAutoClick");
const terminal = document.getElementById("terminalLog");
const consoleInput = document.getElementById("consoleCommand");

// Load saved links on popup open
chrome.storage.local.get(["jobLinks", "autoApplyEnabled"], (data) => {
  if (data.jobLinks) {
    textarea.value = data.jobLinks.join("\n");
  }
  toggle.checked = data.autoApplyEnabled ?? false;
});

// Save links to storage
saveBtn.addEventListener("click", () => {
  const links = textarea.value
    .split("\n")
    .map(link => link.trim())
    .filter(link => link.startsWith("http"));

  chrome.storage.local.set({ jobLinks: links }, () => {
    // alert("Links saved!");
  });
});

// Clear saved links
clearBtn.addEventListener("click", () => {
  chrome.storage.local.remove("jobLinks", () => {
    textarea.value = "";
    // alert("Links cleared.");
  });
});

// Save toggle state when changed
toggle.addEventListener("change", () => {
  chrome.storage.local.set({ autoApplyEnabled: toggle.checked });
});

// Open saved links in new tabs
openBtn.addEventListener("click", () => {
  chrome.storage.local.get("jobLinks", (data) => {
    if (data.jobLinks && data.jobLinks.length > 0) {
      data.jobLinks.forEach(link => {
        chrome.tabs.create({ url: link });
      });
    } else {
      // alert("No saved links to open.");
    }
  });
});


/**
 * 
 *    aesthetic stuff below 
 * 
 */


// Terminal command console behavior
maxLines = 4;
consoleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const command = consoleInput.value.trim();
    if (!command) return;

    const log = (text) => {
      const line = document.createElement("div");
      line.className = "log-line";
      line.textContent = text;
      terminal.appendChild(line);

      // Limit to last x visible lines
      const lines = terminal.querySelectorAll(".log-line");
      if (lines.length > maxLines) {
        terminal.removeChild(lines[0]);
      }
    };


    log("> " + command);

    switch (command.toLowerCase()) {
      case "launch":
        log("[EXEC] Launching auto apply...");
        break;
      case "status":
        const count = textarea.value
          .split("\n")
          .map(l => l.trim())
          .filter(l => l.startsWith("http")).length;
        log(`[INFO] ${count} job link(s) loaded.`);
        break;
      case "clear":
        textarea.value = "";
        chrome.storage.local.remove("jobLinks");
        log("[SYS] URL list cleared.");
        break;
      default:
        log("[ERR] Unknown command: " + command);
    }

    consoleInput.value = "";
  }
});
