const reg = require('cla/reg');

const rulebook = {
    moniker: 'vault_rest_task',
    description: _('Creates a Vault Credential'),
    required: ['server', 'command'],
    allow: [
        'server',
        'command',
        'app_name_new',
        'project_name',
        'app_name',
        'command_options',
        'errors'
    ],
    mapper: {
        app_name_new: 'appNameNew',
        project_name: 'projectName',
        app_name: 'appName',
        command_options: 'commandOptions'
    },
    examples: [
        {
            vault_rest_task: {
                command: 'new-app',
                server: 'vault_server',
                project_name: 'test',
                app_name: 'test-app',
                command_options: 'vault/deployment-example'
            }
        }
    ]
};

const handlerSet = (ctx, params) => {
    const ci = require('cla/ci');
    const reg = require('cla/reg');
    const log = require('cla/log');

    const { vaultEndpoint, vaultPath, secretKey, secretValue } = params;
    let errors = params.errors || 'fail';

    const vault = ci.load(vaultEndpoint);

    if (!vaultPath?.length) {
        throw new Error('Namespace path is empty');
    }

    let fullUrl = [vault.vaultURL(), 'v1', vaultPath].join('/');
    fullUrl = fullUrl.replace(/([^\:])\/\//g, '$1/');

    const token = vault.token()?.trim();
    const body = {};
    body[secretKey] = secretValue;


    let output;

    try {
        output = reg.launch('service.web.rest', {
            name: _('Vault REST API'),
            config: {
                accept_any_cert: 1,
                auto_parse: 1,
                body: JSON.stringify(body),
                errors: 'fail',
                headers: {
                    'X-Vault-Token': token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                username: vault.username(),
                password: vault.password(),
                timeout: '60',
                url: fullUrl
            }
        });
    } catch (err) {
        output = err;
    }

    if (typeof output === 'object') {
        const status = output.status;

        if (status == 200 || status == 204) {
            return { success: 1, status };
        } else if (errors === 'return') {
            console.log('ERROR: ' + JSON.stringify(output) + '\n');
            return { success: 0, status, output };
        } else {
            throw new Error('Vault Error: ' + status + '\n');
        }
    } else if (errors === 'return') {
        console.log('ERROR Vault:\n' + output + '\n');
        return {
            success: 0,
            status: output.status
        };
    } else {
        throw new Error(
            'Invalid response from Vault REST API:\n' +
                (typeof output === 'object' ? JSON.stringify(output) : output)
        );
    }
};

const handlerGet = (ctx, params) => {
    const ci = require('cla/ci');
    const reg = require('cla/reg');
    const log = require('cla/log');

    const { vaultEndpoint, vaultPath, secretKey } = params;
    const errors = params.errors || 'fail';

    const vault = ci.load(vaultEndpoint);

    if (!vaultPath?.length) {
        throw new Error('Namespace path is empty');
    }

    let fullUrl = [vault.vaultURL(), 'v1', vaultPath].join('/');
    fullUrl = fullUrl.replace(/([^\:])\/\//g, '$1/');
    fullUrl = fullUrl.trim();

    const token = vault.token()?.trim();

    let output;

    try {
        output = reg.launch('service.web.rest', {
            name: _('Vault REST API'),
            config: {
                accept_any_cert: 1,
                auto_parse: 1,
                config: {},
                errors: 'fail',
                headers: {
                    'X-Vault-Token': token
                },
                method: 'GET',
                username: vault.username(),
                password: vault.password(),
                timeout: '60',
                url: fullUrl
            }
        });
    } catch (err) {
        console.log('Vault Service Rest error: ' + err);
        output = err;
    }

    if (typeof output === 'object') {
        const { status, content } = output;

        if (status == 200 || status == 204) {
            const data = output.content.data;
            if (secretKey.length) {
                return data[secretKey];
            } else {
                return data;
            }
        } else if (errors === 'return') {
            console.log('ERROR: ' + JSON.stringify(output) + '\n');
            return { success: 0, status, output };
        } else {
            throw new Error('Vault Error: ' + status + '\n');
        }
    } else if (errors === 'return') {
        console.log('ERROR:\n' + output + '\n');
        return {
            success: 0,
            output
        };
    } else {
        throw new Error(
            'Invalid response from Vault REST API:\n' +
                (typeof output === 'object' ? JSON.stringify(output) : output)
        );
    }
};

reg.register('service.vault.set_credential', {
    name: _('Vault Set Credential'),
    icon: '/plugin/cla-vault-plugin/icon/vault.svg',
    form: '/plugin/cla-vault-plugin/form/vault-set.js',
    rulebook,
    handler: handlerSet
});

reg.register('service.vault.get_credential', {
    name: _('Vault Get Credential'),
    icon: '/plugin/cla-vault-plugin/icon/vault.svg',
    form: '/plugin/cla-vault-plugin/form/vault-get.js',
    rulebook,
    handler: handlerGet
});
