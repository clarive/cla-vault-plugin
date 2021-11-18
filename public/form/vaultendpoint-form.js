(function (params) {
    var vaultURL = Cla.ui.textField({
        name: 'vaultURL',
        fieldLabel: _('Vault Server URL'),
        allowBlank: false
    });

    var tokenCheckBox = Cla.ui.checkBox({
        name: 'tokenLogin',
        fieldLabel: _('Token login?'),
        checked: params.rec.tokenLogin == null ? true : params.rec.tokenLogin
    });

    tokenCheckBox.on('check', function () {
        var v = tokenCheckBox.checked;
        if (v) {
            tokenTextField.show();
            userTexfield.hide();
            passTextfield.hide();
            tokenTextField.allowBlank = false;
            userTexfield.allowBlank = true;
            passTextfield.allowBlank = true;
        } else {
            tokenTextField.hide();
            userTexfield.show();
            passTextfield.show();
            tokenTextField.allowBlank = true;
            userTexfield.allowBlank = false;
            passTextfield.allowBlank = false;
        }
    });

    var userTexfield = Cla.ui.textField({
        name: 'username',
        fieldLabel: _('Username'),
        allowBlank: (tokenCheckBox.checked == 1),
        hidden: (tokenCheckBox.checked == 1)
    });

    var passTextfield = Cla.ui.textField({
        name: 'password',
        fieldLabel: _('Password'),
        allowBlank: (tokenCheckBox.checked == 1),
        hidden: (tokenCheckBox.checked == 1),
        inputType: 'password'
    });

    var tokenTextField = Cla.ui.textField({
        name: 'token',
        fieldLabel: _('Authentication Token'),
        allowBlank: !(tokenCheckBox.checked == 1),
        hidden: !(tokenCheckBox.checked == 1)
    });

    return [
        vaultURL,
        tokenCheckBox,
        userTexfield,
        passTextfield,
        tokenTextField
    ];
});
