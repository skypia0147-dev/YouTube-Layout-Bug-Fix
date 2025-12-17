// YouTube Layout Bug Fix
// Version 2.0 (Vertical Optimized)
// - Feature: Smart Polling Auto-Reload ONLY on Vertical/Narrow Screens.
// - Fix: Prevents unnecessary reloads on Landscape monitors.

(function () {
    'use strict';

    console.log("[YouTube Layout Bug Fix] V2.0 Loaded");

    // State tracking variables
    let wasLive = false;
    let initDone = false;

    // -------------------------------------------------------------------------
    // Core Logic: Live Status Check
    // -------------------------------------------------------------------------

    function isCurrentVideoLive() {
        if (document.querySelector('ytd-live-chat-frame') ||
            document.querySelector('#chat') ||
            document.getElementById('chat')) {
            return true;
        }

        const app = document.querySelector('ytd-watch-flexy');
        if (app && app.hasAttribute('is-live')) return true;

        const badges = document.querySelectorAll('.ytp-live-badge, .badge-style-type-live-now');
        for (const badge of badges) {
            if (!badge.getAttribute('disabled') && badge.offsetParent !== null) {
                return true;
            }
        }
        return false;
    }

    // -------------------------------------------------------------------------
    // Helper: Force Initial Reload (Clean Slate)
    // -------------------------------------------------------------------------
    function checkAndEnforceCleanSlate() {
        if (!location.pathname.startsWith('/watch')) return true;

        // Version-specific key to ensure execution after update
        const INIT_KEY = 'ycpk_init_v2.0';
        const isBlessed = sessionStorage.getItem(INIT_KEY);

        if (!isBlessed) {
            console.log(`[YouTube Layout Bug Fix] First video visit (v2.0). Forcing ONE-TIME Clean Update...`);
            sessionStorage.setItem(INIT_KEY, 'true');
            location.reload();
            return false;
        }

        return true;
    }

    // -------------------------------------------------------------------------
    // Helper: Screen Condition Check (v2.0)
    // -------------------------------------------------------------------------
    function isVerticalOrNarrow() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isNarrow = window.innerWidth < 1300; // Increased to cover 1080p width reliably

        if (isPortrait || isNarrow) {
            console.log(`[YouTube Layout Bug Fix] Screen Mode: Vertical/Narrow (Portrait: ${isPortrait}, Width: ${window.innerWidth}px). Logic ENABLED.`);
            return true;
        } else {
            console.log(`[YouTube Layout Bug Fix] Screen Mode: Landscape/Wide (Width: ${window.innerWidth}px). Logic SKIPPED.`);
            return false;
        }
    }

    // -------------------------------------------------------------------------
    // Logic: Smart Polling Auto-Reload
    // -------------------------------------------------------------------------

    function handleNavigation() {
        if (!checkAndEnforceCleanSlate()) return;

        // Last Chance Check before monitoring
        if (!wasLive && isCurrentVideoLive()) {
            wasLive = true;
            console.log("[YouTube Layout Bug Fix] Late detection: Video was LIVE.");
        }

        if (!location.pathname.startsWith('/watch')) {
            wasLive = false;
            return;
        }

        if (!wasLive) {
            sessionStorage.removeItem('ycpk_reloaded');
            return;
        }

        // v2.0 Optimization: Check Screen Condition
        if (!isVerticalOrNarrow()) {
            wasLive = false; // Reset state anyway
            sessionStorage.removeItem('ycpk_reloaded');
            return;
        }

        if (sessionStorage.getItem('ycpk_reloaded')) {
            console.log("[YouTube Layout Bug Fix] Reload recovery complete.");
            sessionStorage.removeItem('ycpk_reloaded');
            wasLive = false;
            return;
        }

        console.log("[YouTube Layout Bug Fix] Live -> ??? Transition. Starting Smart Polling...");

        let attempts = 0;
        const maxAttempts = 50;

        const pollInterval = setInterval(() => {
            attempts++;
            const isLive = isCurrentVideoLive();

            if (!isLive) {
                console.log(`[YouTube Layout Bug Fix] Video confirmed Normal (Attempt ${attempts} - ${attempts * 100}ms). Reloading!`);
                clearInterval(pollInterval);
                sessionStorage.setItem('ycpk_reloaded', 'true');
                location.reload();
            } else {
                if (attempts >= maxAttempts) {
                    console.log("[YouTube Layout Bug Fix] Polling timed out (5s). Assuming Target is Live.");
                    clearInterval(pollInterval);
                    wasLive = true;
                }
            }
        }, 100);
    }

    // -------------------------------------------------------------------------
    // Initialization
    // -------------------------------------------------------------------------

    function init() {
        if (initDone) return;
        initDone = true;

        if (!checkAndEnforceCleanSlate()) return;

        console.log("[YouTube Layout Bug Fix] Initializing...");

        if (sessionStorage.getItem('ycpk_reloaded')) {
            sessionStorage.removeItem('ycpk_reloaded');
        }

        wasLive = isCurrentVideoLive();

        let rapidAttempts = 0;
        const rapidInterval = setInterval(() => {
            rapidAttempts++;
            if (location.pathname.startsWith('/watch')) {
                if (isCurrentVideoLive()) {
                    if (!wasLive) console.log("[YouTube Layout Bug Fix] Video identified as LIVE (Rapid Init)");
                    wasLive = true;
                    clearInterval(rapidInterval);
                }
            }
            if (rapidAttempts > 50) clearInterval(rapidInterval);
        }, 100);

        setInterval(() => {
            if (location.pathname.startsWith('/watch')) {
                if (isCurrentVideoLive()) {
                    if (!wasLive) console.log("[YouTube Layout Bug Fix] Video identified as LIVE (Monitor)");
                    wasLive = true;
                }
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', () => {
        handleNavigation();
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        window.addEventListener('DOMContentLoaded', init);
        window.addEventListener('load', init);
    }

})();