(function (params) {
    var data = params.data || {};

    var vaultComboBox = Cla.ui.ciCombo({
        name: 'vaultEndpoint',
        class: 'VaultEndpoint',
        fieldLabel: _('Vault Endpoint'),
        value: params.data.vaultEndpoint || '',
        width: 400,
        allowBlank: false,
        with_vars: 1
    });

    var path = Cla.ui.textField({
        name: 'vaultPath',
        value: params.data.vaultPath || '',
        fieldLabel: _('Namespace Path'),
        allowBlank: false
    });

    var keyTextfield = Cla.ui.textField({
        name: 'secretKey',
        value: params.data.secretKey || 'value',
        fieldLabel: _('Secret Key'),
        allowBlank: true
    });

    var errors = Cla.ui.comboBox({
        name: 'errors',
        fieldLabel: 'Error Handling',
        data: [
            ['fail', _('Fail on error')],
            ['return', _('Return error and continue')]
        ],
        value: params.data.errors || 'fail',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [vaultComboBox, path, keyTextfield, errors]
    });

    return panel;
});
