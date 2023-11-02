// ==UserScript==
// @name         cppreference.com revision drop-down
// @namespace    https://alipha.ddns.net/cppref.user.js
// @version      1.1
// @description  Displays the C++ revisions drop-down for non-logged-in users, and adds link icons to headers.
// @author       Alipha (irc.libera.chat)
// @match        https://*.cppreference.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

const win = (typeof unsafeWindow === 'undefined' ? window : unsafeWindow);
var tries = 0;
const revLoader = function() {
    const rev = localStorage.getItem("stdrev") ?? 0;
    const elem = document.querySelector(".stdrev-select select");
    if(!elem && ++tries < 20) {
        setTimeout(revLoader, 100);
        return;
    }
    elem.value = rev;
    elem.dispatchEvent(new Event('change'));
    elem.addEventListener('change', function() {
        localStorage.setItem("stdrev", elem.value);
    });
};

window.addEventListener('load', function() {
    win.mw.loader.load("ext.gadget.StandardRevisions");
    setTimeout(revLoader, 100);
    var elems = document.querySelectorAll('.mw-headline');
    for(var i = 0; i < elems.length; ++i) {
        var id = elems[i].id;
        if(!id) {
            continue;
        }
        elems[i].innerHTML += ' <a href="#' + id + '" style="width: 16px; height: 16px; display: inline-block; margin-bottom: -3px;' +
            'background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBj' +
            'SFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAAFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFB' +
            'wgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBw' +
            'gFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwg' +
            'FBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgFBwgF' +
            'BwgFBwgFBwgFBwgFBwgFBwgFBwgFBwj////THMCRAAAAbHRSTlMAABMlJxkCJHm97/jNjj0BOrj+118QocwuLd73XTlw8ejj+sNVDwU+oPz2YDPd9EAYP' +
            '+7s8gksXJvlRR0GLyEHKH7C1phHA7zga1YRpNU3xN9qYXxl2r7AUAuVXinUK5ydNFHb4aMan/sy3BcKUBtWAAAAAWJLR0RtuwYArQAAAslJREFUWMO9l+' +
            'lb2kAQh5cAAcIVwn2oAQHlaCyKeLTeF9ZCtVqtF629tO3+/58bNBuWzSbNxudxvzEz7zy72fnNLAC85OLcHi/vFPb5AwJUVzAUjkTZcTEmwdGKJxj3kUz' +
            'h+HClMyx8NgcNK1+wz08IkLKkSdvHn4LUJRWex6unyDDzklws4V+SZ+OnyxUAqjOzNd2SYOHrDZdmbL7S6yFqn1fmRubXeoaIfb6FO5roFGFrfn5Bbmv7' +
            'b427ZrUEIcsEleFHXuwsLa/UVwnXjJYgaE8T/BvS8hbdptepuItaAo9VUNTbWVvfoPtkLYHblN7c2laGEbWd3b19o76RvDkTPHKAN4DuYZXwv9M8Ah0/e' +
            'k/qptcfC3B90OwBKp85NiqvdIJHfERmP7V+qP0Dno4iVvNInT4W/Z/pfB2ZYkz9I5gleUn8D1/rflKwn+cED1PW/MXnS7WKm1fBMUFifC5p2T+uUf+4ua' +
            'XzQtZu/+B6NH5KtN8/BiXYdsJnBsj15SmckW8pX/UtZBzxsDTAI6z5CQqvaoizy2cFGg/h7Q3S37Uln8zRebV+r+7Uvnn57QJa8SBF3t85VsHK9x81aM2' +
            'LEnn/naCZpGg8iBnr58yEF/q09xfaQB2r31M6f0drQX7kbuDWk5KRP85Se2AAzX/XmLnfI980P4/oTRjVQJmwVw+7OH5gNss5FFExuPb3dncer1DZ3to0' +
            'nUFuLYFMd2+sr3W8li8Rj5ag6HTQetHsIOcX+GVz+gdNHjwtZWV5qbM4DKlYZghpCe5J/snclhfmRcsEYS3Bw28ab1b/+CxHgX/+joxz9nkQjesZ0B5cj' +
            'bp9HoCEHvxwH1HvolKehiw84NP4S6AoS5CNVydAnql/UFZBeh4PwCQ1gyDaL+gC5RS5LIskMmmyf6SSbKLiE3Ecj4nsuoxGwqFHZQkBv8+puHmvx8296D' +
            '/6fyELG0sKFv4XAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTA3LTA4VDEwOjAzOjM0LTA0OjAwL+/rRAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0wNy0' +
            'wOFQxMDowMzozNC0wNDowMF6yU/gAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC&quot;);' +
            'background-size: 16px 16px; opacity: .5;"></a>';
    }
}, false);


