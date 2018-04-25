sap.ui.define([
    "com/decor/ubicaciones/util/utilResponse",
    "com/decor/ubicaciones/util/utilValidacion"
], function (utilResponse,utilValidacion) {
    return {
        validaNroOderCompra: function (valor) {

            if (!valor) {
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("La orden de compra el un valor requerido", 001);
            }

            if (isNaN(valor)) {
                return utilResponse.error("La orden de compra debe ser un valor númerico", 002);
            }

            if (valor.toString().indexOf(".") !== -1) {
                return utilResponse.error("La orden de compra debe ser un número entero", 003);
            }

            if (valor.toString().length > 10) {
                return utilResponse.error("La orden de compra no debe exceder los 10 digitos", 004);
            }

            return utilResponse.success("Validacion correcta", null);
        },
        validaNroEntrega: function (valor) {

            if (!valor) {
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("La entrega el un valor requerido", 001);
            }

            if (isNaN(valor)) {
                return utilResponse.error("La entrega debe ser un valor númerico", 002);
            }

            if (valor.toString().indexOf(".") > -1) {
                return utilResponse.error("La entrega debe ser un número entero", 003);
            }

            if (valor.toString().length > 10) {
                return utilResponse.error("La entrega no debe exceder los 10 digitos", 004);
            }

            return utilResponse.success("Validacion correcta", null);
        },
        validaNroFolio: function (valor) {

            if (!valor) {
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("El folio es un valor requerido", 001);
            }

            if (valor.length > 16) {
                return utilResponse.error("El folio no debe exceder los 16 caracteres", 004);
            }

            return utilResponse.success("Validacion correcta", null);
        },
        validaGuia: function (valor) {

            if (!valor) {
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("La guía es un valor requerido", 001);
            }

            if (valor.length > 16) {
                return utilResponse.error("La guía no debe exceder los 16 caracteres", 004);
            }

            return utilResponse.success("Validacion correcta", null);
        },
        validaTipoDocumento: function (valor) {

            if (!valor) {
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("Seleccione un tipo de documento", 001);
            }

            return utilResponse.success("Validacion correcta", null);
        },
        CuentaUsuario: function(valor) {

            if(!valor){
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("La cuenta de usuario es un campo requerido", 001);
            }

            if(utilValidacion.hasSpace(valor)){
                return utilResponse.error("La cuenta de usuario no debe contener espacios", 002);
            }

            if(!utilValidacion.soloLetrasYNumSinEspacios(valor)){
                return utilResponse.error("La cuenta de usuario solo debe contener caracteres alfanumerícos", 003);
            }

            if (valor.length > 12) {
                return utilResponse.error("La cuenta de usuario no debe tener mas de 12 caracteres", 004);
            }

            return utilResponse.success("Validacion correcta", null);

        },
        ClaveUsuario: function(valor) {

            if(!valor){
                if(valor === undefined){
                    valor === "";
                }
                return utilResponse.error("La clave de usuario es un campo requerido", 001);
            }

            if(utilValidacion.hasSpace(valor)){
                return utilResponse.error("La clave de usuario no debe contener espacios", 002);
            }

            if(!utilValidacion.soloLetrasYNumSinEspacios(valor)){
                return utilResponse.error("La clave de usuario solo debe contener caracteres alfanumerícos", 003);
            }

            if (valor.length > 10) {
                return utilResponse.error("La clave de usuario no debe tener mas de 10 caracteres", 004);
            }

            return utilResponse.success("Validacion correcta", null);

        },
        validaMaterialCantidadTotal: function(data){
            for(var i = 0; i < data.length; i++){
                var item = data[i];
                var codigoMaterialItem = item.CodMaterial;
                var cantidadTotal = parseInt(item.CantidadTotal,10);
                var almacen = item.Almacen;
                var sumatoria = 0;
                var estado = "";
                var mensaje = "";
                for(var j = 0 ; j < data.length; j++){
                    var item2 = data[j];
                    if(codigoMaterialItem === item2.CodMaterial && almacen === item2.Almacen){
                        sumatoria = sumatoria + parseInt(item2.Cantidad,10);
                    }
                }

                data[i].cantidadEstado = "Error"
                if(sumatoria > cantidadTotal){
                    data[i].cantidadMensaje = "La suma de cantidades por material excede la cantidad total del material " + parseInt(codigoMaterialItem,10).toString(); 
                }
    
                if(sumatoria < cantidadTotal){
                    data[i].cantidadMensaje = "La suma de cantidades por material es menor a la cantidad total del material " + parseInt(codigoMaterialItem,10).toString();
                }

                if(sumatoria === cantidadTotal){
                    data[i].cantidadMensaje = "";
                    data[i].cantidadEstado = "Success"
                }
            }

            return data;
        },
        validaMaterialCantidadTotalExec: function(data){
            for(var i = 0; i < data.length; i++){
                if(data[i].cantidadEstado === "Error"){
                    return false;
                }
            }

            return true;
        }
        
    };
});