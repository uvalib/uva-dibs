// =============================================================================
// @file    dibs.js
// @brief   JavaScript code for DIBS
// @created 2021-02-25
// @license Please see the file named LICENSE in the project directory
// @website https://github.com/caltechlibrary/dibs
// =============================================================================

// General utilities.
// ............................................................................

// This next function is based in part on the posting by user Alvaro Montoro
// to Stack Overflow 2015-06-18, https://stackoverflow.com/a/30905277/743730
function copyToClipboard(button, text) {
    var aux = document.createElement("input");
    aux.setAttribute("value", text);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    // The following code is based in part on a 2016-09-21 posting to Stack
    // Overflow by user Nina Scholz: https://stackoverflow.com/a/39610851/743730
    var last = button.innerHTML;
    button.innerHTML = 'Copied!';
    clicked = true;
    setTimeout(function () {
        button.innerHTML = last;
        clicked = false;
    }.bind(button), 800);
}


// Bootstrap Table utilities.
// ............................................................................

// This next function was inspired in part by the posting by user "Undry"
// to Stack Overflow 2020-07-16, https://stackoverflow.com/a/62928804/743730
function numberSort(a, b) {
    var aa = +((a + '').replace(/[^\d]/g, ''));
    var bb = +((b + '').replace(/[^\d]/g, ''));
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
}

function linkedNumberSort(a, b) {
    var aa = +(($(a).text() + '').replace(/[^\d]/g, ''));
    var bb = +(($(b).text() + '').replace(/[^\d]/g, ''));
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
}

function linkedTextSort(a, b) {
    var a = $(a).text();
    var b = $(b).text();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function dataValueSort(a, b) {
    var aa = +(($(a).attr('data-value') + ''));
    var bb = +(($(b).attr('data-value') + ''));
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
}

// Debugging utilities.
// ............................................................................

// This defines a function log(...) that can be used anywhere in our code to
// print message to the console if the variable "debug_mode" is true.
//
// Usage: execute set_debug(true) in the console to activate it.

function logFunction() {
    var debug = (sessionStorage != null &&
                 sessionStorage.getItem('debug_mode') == 'true');
    return debug ? console.log.bind(window.console, '(DIBS)') : function(){};
}

function set_debug(enabled) {
    // This only works if DOM storage is available in the browser.
    if (sessionStorage == null) {
        console.warn("can't set debug mode: browser DOM storage unavailable");
        return false;
    }
    console.info('(DIBS)', 'debug_mode =', enabled);
    sessionStorage.setItem('debug_mode', enabled ? 'true' : 'false');
    Object.defineProperty(this, "log", {get: logFunction});
    return enabled;
}

Object.defineProperty(this, "log", {get: logFunction});


// HTTP GET function for data polling.
// ............................................................................
// This is a simple http GET function. It is based on examples at MDN
// Developer site and the satirical Vanilla JS framework site.

function httpGet(url, contentType, callbackFn) {
    let xhr      = new XMLHttpRequest();
    let page_url = new URL(window.location.href);

    xhr.onreadystatechange = function () {
        // Process the response.
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                let data = xhr.responseText;
                if (contentType === "application/json" && data !== "") {
                    data = JSON.parse(xhr.responseText);
                }
                callbackFn(data, "");
            } else {
                log('xhr status = ', xhr.status);
                callbackFn("", xhr.status);
            }
        }
    };

    // We always want JSON data.
    xhr.open('GET', url, true);
    if (contentType !== "") {
        xhr.setRequestHeader('Content-Type', contentType);
    }
    xhr.send();
};
