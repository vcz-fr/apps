const _id = id => document.getElementById(id);
const _v = id => (v = _id(id).value, _id(id).value === ""? null: value);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] An error has occurred: ${msg}`);

const send = (action, fd) => fetch(`https://api.vcz.fr/fowler/${action}`, {
    method: "POST",
    body: fd,
    headers: {
        "content-type": "application/x-www-form-urlencoded"
    }
})
.then(r => {if (r.ok){ return r.json() } throw "Could not process the inputs"})
.then(v => _r(v.response))
.catch(_notif);

const main = (form, ev) => (ev.preventDefault(), fd = new FormData(form), action = fd.get("action") === "Encrypt"? "enc": "dec", send(action, fd))

_id("form").addEventListener("submit", main);