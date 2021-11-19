declare var _;
declare var require;
const ci = require("cla/ci");

ci.createRole("Vault");

ci.createClass("VaultEndpoint", {
    form: '/plugin/cla-vault-plugin/form/vaultendpoint-form.js',
    icon: '/plugin/cla-vault-plugin/icon/vault.svg',
    roles: ["Vault", "ClariveSE"],
    has: {
        vaultURL: {
            is: "rw",
            isa: "Str",
            required: true
        },
        tokenLogin: {
            is: "rw",
            isa: "Bool",
            required: true
        },
        token: {
            is: "rw",
            isa: "Str",
            required: false
        },
        username: {
            is: "rw",
            isa: "Str",
            required: false
        },
        password: {
            is: "rw",
            isa: "Str",
            required: false
        }
    }
});
