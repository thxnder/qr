sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function(ODataModel, utilService, utilString) {
        "use strict";
        return {
        // Listar centros
        flujoDocumento: function(pNumPedido, callback) {
            var contexto = {};
            contexto.servicio = "flujoDocumentoServices.flujoDocumento()";
            contexto.url = "flujoDocumento.aspx";
            contexto.parametros = { 
                pNumPedido:pNumPedido
            };

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
                        
            if(!parametros){
                parametros = {};
            }
                        
            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.usuario = window.dataIni.user.User;
            parametros.clave = window.dataIni.user.Password;
            parametros.Language = "ES";//
            parametros.idioma = "ES";//
            parametros.Id = window.dataIni.user.Id;
            parametros.GrpVend = window.dataIni.person.GrpVend;
            parametros.Descripcion = window.dataIni.person.Descripcion;
            parametros.CodigoVendedor = window.dataIni.person.PerNr;
            parametros.OrgVentas = window.dataIni.person.OrgVentas;
            parametros.CanalDist = window.dataIni.person.CanalDist;
            parametros.OfVentas = window.dataIni.person.OfVentas;
            console.warn("<--------------     " + servicio + "    -------------->");
            
            var dataOut = null;
            var codigo = "x";
            var descripcion = ""; 
            var respuesta;

             $.ajax({
                url: url, 
                method: "POST",
                cache : false,
                async: true,
                data: parametros,
                timeout:5000000,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",       
                success: function(result){
                        var respuesta = { c : "s" , m : "", data : result };
                        callback(respuesta);
                },
                error: function(result){
                    utilString.estadoInternet(result, callback);
                } 
            });  

            //return utilService.exec(contexto);
        },
    };
});