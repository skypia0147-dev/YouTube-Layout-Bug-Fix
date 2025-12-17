# [Chrome Extension] Comments Gone? It happens on Vertical Monitors & Split Screens!

Do you use a **Vertical Monitor**? Or perhaps you often **split your screen** to watch YouTube while working on something else?

If so, you might have experienced this annoying bug:  
> **"Watching a YouTube Live stream, then clicking on a normal video, only to find the comment section has completely disappeared."**

This isn't just a random glitch. It is a specific bug that affects anyone using a narrow browser window.

![Bug appearance on Split Screen / Vertical View](https://github.com/user-attachments/assets/placeholder-image-url) 
*(Note: Please replace with actual image URL if available, or remove this line)*

## 1. Who is affected? (Bug Conditions)
This issue occurs **100% of the time** under the following specific conditions.

💡 **Affected Environments:**
1.  **Vertical Monitor Users:** Developers or designers using pivot monitors.
2.  **Split Screen / Multitaskers:** Users who drag the browser to the side (Windows Snap) or resize the window to be narrow.

**The Trigger:** Watching YouTube Live (Chat active) → Clicking a Normal Video.  
**The Result:** Comments disappear because the browser fails to switch from the "Live Chat Layout" to the "Normal Comment Layout" in a narrow viewport.

## 2. Why does this happen?
YouTube is a "Responsive Web." When the window width is narrow (like on a mobile phone, vertical monitor, or split screen), the layout changes.

The problem is that when you move from a Live stream to a normal video, Chrome often gets confused and thinks, *"Should I still keep the Chat Box space?"* This causes the comment section to fail to load or be covered by the recommended video list.

## 3. Solution: YouTube Layout Bug Fix
Resizing the window back and forth or refreshing (F5) every time is frustrating. I developed an extension to fix this automatically for all "Narrow View" users.

### Key Features:
*   **Auto Detection:** Detects layout breakage in any narrow environment (Vertical Monitor, Split Screen, etc.).
*   **Auto Recovery:** No manual action needed. It automatically refreshes and restores the comment section instantly.

## 4. Download
[Download YouTube Layout Bug Fix](https://github.com/skypia0147-dev/YouTube-Layout-Bug-Fix/releases)

## 5. How to Install
Since this is a custom extension, follow these simple steps to install:

1.  Download the file above and unzip it.
2.  Open Chrome, type `chrome://extensions` in the address bar, and press Enter.
3.  Toggle the **'Developer mode'** switch in the top right corner to **ON**.
4.  Click the newly appeared **'Load unpacked'** button.
5.  Select the unzipped `YouTube Layout Bug Fix` folder.
6.  Once loaded, the installation is complete!
