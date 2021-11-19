# Hashicorp Vault

<img src="https://cdn.rawgit.com/clarive/cla-vault-plugin/master/public/icon/vault.svg?sanitize=true" alt="Vault Plugin" title="Vault Plugin" width="120" height="120">

The Hashicorp Vault plugin will allow you to interact with the Vault server to
set and get credentials.

## Requirements

This plugin requires Clarive 7.8 or greater.

## Installation

To install the plugin, place the `cla-vault-plugin` folder inside the
`$CLARIVE_BASE/plugins` directory in a Clarive instance.

## Implementation

1. Setup at least one Vault Endpoint resource. This is the Vault server Clarive
   will interact with.

2. Use the Vault Set or Vault Get credentials ops in any desired rule (a job,
   form, independent, webservice or event trigger).

### Vault Endpoint Resource

This configuration item holds the URL and token or credentials to
access a given Vault server endpoint.

The various parameters are:

- **Vault Server URL** - the server endpoint URL, ie. `https://[VAULTIP]:8200`
- **Token login** - check this if you are using a token to login to the server.
  If unchecked, it will use username/password to login (not recommended).
- **Authentication token** - the Vault token to use for login, if Token login
  was selected.
- **Username/Password** - Vault server user and password in case basic
  authentication is being used.

## Vault Set operation

This rule op let's you set a vault key-value pair in a Vault namespace (path).

Fields:

- **Endpoint** (required) - the Vault endpoint resource configured earlier.
- **Namespace Path** (required) - a path to the secret in Vault. Ie.
  `/mypath/mysubpath`
- **Secret Key** (required) - the name of the key to retrieve. If set, the data
  returned to the rule
- **Secret Value** - value to be set in the key.
- **Error handling** - If `Fail` is set, the op will throw an error when
  something goes wrong.  If `Return error and continue`, if Vault errors, the
  error message will be returned into the rule variable, and no error will be
  thrown.

## Vault Get operation

- **Endpoint** (required) - the Vault endpoint resource configured earlier.
- **Namespace Path** (required) - a path to the secret in Vault. Ie.
  `/mypath/mysubpath`
- **Secret Key** (optional) - the name of the key to retrieve. If set, the data
  returned to the rule will be all the keys-values in the secret in Vault.
- **Error handling** - If `Fail` is set, the op will throw an error when
  something goes wrong.  If `Return error and continue`, if Vault errors, the
  error message will be returned into the rule variable, and no error will be
  thrown.

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
