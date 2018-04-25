/* global moment:true */
sap.ui.define([
    "com/decor/ubicaciones/util/utilResponse",
    "com/decor/ubicaciones/validacion/validaciones"
], function (utilResponse, validaciones) {
    "use strict";
    return {
        material: {
            display: function(valor){
                try {
                    return parseInt(valor,10).toString();
                } catch (error) {
                    return valor;
                }
            }
        },
        ordenCompra: {
            validacionState: function (valor) {

                if (valor === undefined) {
                    return "None";
                }

                var respuesta = validaciones.validaNroOderCompra(valor);

                if (respuesta.c !== "s") {
                    return "Error";
                }

                return "Success";
            },
            validacionMessage: function (valor) {

                if (valor === undefined) {
                    return "";
                }

                var respuesta = validaciones.validaNroOderCompra(valor);

                if (respuesta.c !== "s") {
                    return respuesta.m;
                }

                return "OK";
            }
        },
        entrega: {
            validacionState: function (valor) {

                if (valor === undefined) {
                    return "None";
                }

                var respuesta = validaciones.validaNroEntrega(valor);

                if (respuesta.c !== "s") {
                    return "Error";
                }

                return "Success";
            },
            validacionMessage: function (valor) {

                if (valor === undefined) {
                    return "";
                }

                var respuesta = validaciones.validaNroEntrega(valor);

                if (respuesta.c !== "s") {
                    return respuesta.m;
                }

                return "";
            }
        },
        tipoDocumento: {
            state : function(valor){
                if (valor === undefined) {
                    return "None";
                }
    
                var respuesta = validaciones.validaTipoDocumento(valor);
    
                if (respuesta.c !== "s") {
                    return "Error";
                }
    
                return "Success";
            },
            stateMessage: function (valor) {

                if (valor === undefined) {
                    return "";
                }

                var respuesta = validaciones.validaTipoDocumento(valor);

                if (respuesta.c !== "s") {
                    return respuesta.m;
                }

                return "";
            }
        },
        folio: {
            state : function(valor){
                if (valor === undefined) {
                    return "None";
                }
    
                var respuesta = validaciones.validaNroFolio(valor);
    
                if (respuesta.c !== "s") {
                    return "Error";
                }
    
                return "Success";
            },
            stateMessage: function (valor) {

                if (valor === undefined) {
                    return "";
                }

                var respuesta = validaciones.validaNroFolio(valor);

                if (respuesta.c !== "s") {
                    return respuesta.m;
                }

                return "";
            }
        },
        guia: {
            state : function(valor){
                if (valor === undefined) {
                    return "None";
                }
    
                var respuesta = validaciones.validaGuia(valor);
    
                if (respuesta.c !== "s") {
                    return "Error";
                }
    
                return "Success";
            },
            stateMessage: function (valor) {

                if (valor === undefined) {
                    return "";
                }

                var respuesta = validaciones.validaGuia(valor);

                if (respuesta.c !== "s") {
                    return respuesta.m;
                }

                return "";
            }
        },
        login: {
            cuentaUsuario: {
                state: function (valor) {

                    if (valor === undefined) {
                        return "None";
                    }

                    var respuesta = validaciones.CuentaUsuario(valor);

                    if (respuesta.c !== "s") {
                        return "Error";
                    }

                    return "Success";
                },
                stateMessage: function (valor) {

                    if (valor === undefined) {
                        return "";
                    }

                    var respuesta = validaciones.CuentaUsuario(valor);

                    if (respuesta.c !== "s") {
                        return respuesta.m;
                    }

                    return "";
                }
            },
            claveUsuario: {
                state: function (valor) {

                    if (valor === undefined) {
                        return "None";
                    }

                    var respuesta = validaciones.ClaveUsuario(valor);

                    if (respuesta.c !== "s") {
                        return "Error";
                    }

                    return "Success";
                },
                stateMessage: function (valor) {

                    if (valor === undefined) {
                        return "";
                    }

                    var respuesta = validaciones.ClaveUsuario(valor);

                    if (respuesta.c !== "s") {
                        return respuesta.m;
                    }

                    return "";
                }
            }
        }

    };
});