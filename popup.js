const textarea = document.getElementById("urlList");
const saveBtn = document.getElementById("saveLinks");
const clearBtn = document.getElementById("clearLinks");
const openBtn = document.getElementById("openLinks");
const toggle = document.getElementById("toggleAutoClick");

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
    alert("Links saved!");
  });
});

// Clear saved links
clearBtn.addEventListener("click", () => {
  chrome.storage.local.remove("jobLinks", () => {panigales
    textarea.value = "";
    alert("Links cleared.");
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
      alert("No saved links to open.");
    }
  });
});
