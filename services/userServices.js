sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
    ], function(ODataModel, utilService) {
        "use strict";
        return {        
            cambioPassword: function(datosUser,OfVentas,callback) {
                var contexto = {};
                contexto.servicio = "userServices.cambioPassword()";
                contexto.url = "user.aspx";
                contexto.parametros = { Usuario: datosUser.Usuario,
                    "ext-comp-1007": datosUser.extcomp1007,
                    "ext-comp-1008": datosUser.extcomp1008,
                    "ext-comp-1009": datosUser.extcomp1009,
                    "ext-comp-1010": datosUser.extcomp1010,
                    "ext-comp-1011": datosUser.extcomp1011,
                    curPassword: datosUser.curPassword,
                    newPassword: datosUser.newPassword,
                    newPassword2: datosUser.newPassword2
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
                error: callback 
            });  

             //   return utilService.exec(contexto);
            },
            
        };
    });
