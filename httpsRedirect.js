// Make the page redirect to the HTTPS version if HTTP
// Source: https://support.glitch.com/t/solved-auto-redirect-http-https/2392/5
if (location.protocol != 'https:') {
 location.href = `https:${window.location.href.substring(window.location.protocol.length)}`;
}
