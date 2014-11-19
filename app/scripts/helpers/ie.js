// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing. Will only work for IE >=5 and <=9
// since IE10 dropped support for conditional comments. When BV_internal.ie is
// undefined it means it's either IE10 or not an IE browser.
var ie = (function (v, div) {
    var all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]
        ) {}
    return v > 4 ? v : undefined;
})(3, document.createElement('div'));

module.exports = ie;
