const _id = id => document.getElementById(id);
const _r = msg => _id("response").value = msg;
const _notif = msg => _r(`[INFO] An error has occurred: ${msg}`);
const _block = disable => (_id("action-enc").disabled = disable, _id("action-dec").disabled = disable)

const send = (action, body) => {
    if (!body.key || !body.msg) { 
        _notif("These inputs are required: key, message");
        _block(false);
        return;
    }
    fetch(`https://api.vcz.fr/fowler/${action}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(r => {
        if (!r.ok){ throw "Could not process the inputs" }
        return r.json();
    })
    .then(_r)
    .catch(_notif)
    .then(() => _block(false))
};

const main = action => e => (
    _block(true),
    e.preventDefault(),
    fd = new FormData(_id("form")),
    send(action, {msg: fd.get("msg"), key: fd.get("key")})
);

// Actions
_id("action-enc").addEventListener("click", main("enc"));
_id("action-dec").addEventListener("click", main("dec"));

_id("response").addEventListener("click", e => e.target.select());

// Go!
_id("readiness").classList.add("success");
