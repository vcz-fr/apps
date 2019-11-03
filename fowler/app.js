const _id = id => document.getElementById(id);
const _v = id => (v = _id(id).value, _id(id).value === ""? null: value);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] An error has occurred: ${msg}`);

const send = (action, body) => fetch(`https://api.vcz.fr/fowler/${action}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
        "content-type": "application/json"
    }
})
.then(r => {if (r.ok){ return r.json() } throw "Could not process the inputs"})
.then(_r)
.catch(_notif);

const main = action => e => (e.preventDefault(), fd = new FormData(_id("form")), send(action, {msg: fd.get("msg"), key: fd.get("key")}));

// Actions

_id("action-enc").addEventListener("click", main("enc"));
_id("action-dec").addEventListener("click", main("dec"));

_id("response").addEventListener("click", e => e.target.select());

// Go!
_id("readiness").innerText = "Ready!";