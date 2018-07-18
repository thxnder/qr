sap.ui.define([
    "com/decor/transportistas/util/utilResponse",
    "com/decor/transportistas/constantes"
], function (utilResponse, constantes) {
    "use strict";
    return {
        exec: function ( url, parametros, callback) {
            $.ajax({
                method: "POST",
                url: url,
                cache : false,
                async: true,
                data: parametros,
                timeout:5000000,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                username: constantes.usernameSOAP,
                password: constantes.passwordSOAP,
                success: function (response) {
                    var result = utilResponse.success("", response);
                    return callback(result);
                },
                error: function (data, status, req) {
                    var result = utilResponse.error(data, null);
                    return callback(result);
                }
            });
        }
    };
});