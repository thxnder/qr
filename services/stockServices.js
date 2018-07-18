sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function(ODataModel, utilService, utilString) {
        "use strict";
        return {
        // Listar centros
        stockporLlegar: function(matnr,lfdat_ini,lfdat_fin,OfVentas,callback) {
            var contexto = {};
            contexto.servicio = "stockServices.stockporLlegar()";
            contexto.url = "stock.aspx";
            contexto.parametros = { MATNR: matnr, LFDAT_INI : lfdat_ini , LFDAT_FIN: lfdat_fin, OfVentas: OfVentas };
              
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
        stockporLlegarMulti: function(matnr,lfdat_ini,lfdat_fin,OfVentas,flag,callback) {
            var contexto = {};
            contexto.servicio = "stockServices.stockporLlegarMulti()";
            contexto.url = "stock.aspx";
            contexto.parametros = { MATNR: matnr, LFDAT_INI : lfdat_ini , LFDAT_FIN: lfdat_fin, OfVentas: OfVentas, flag:flag };
              
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
        stockporPedir:function(CodJer,CodMat,FecIni,FecFin,OfVentas,callback){
           var contexto = {};
           contexto.servicio = "stockServices.stockporPedir()";
           contexto.url = "reporteMercaderia.aspx";
           contexto.parametros = { CodJer: CodJer, CodMat : CodMat , FecIni: FecIni, FecFin: FecFin, OfVentas: OfVentas };
           
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
       stockporPedirMulti:function(CodJer,CodMat,FecIni,FecFin,OfVentas,flag,callback){
           var contexto = {};
           contexto.servicio = "stockServices.stockporPedirMulti()";
           contexto.url = "reporteMercaderia.aspx";
           contexto.parametros = { CodJer: CodJer, CodMat : CodMat , FecIni: FecIni, FecFin: FecFin, OfVentas: OfVentas, flag:flag };
           
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
       stockPedComprometidos:function(lstPedJSON,lstSolJSON, lfdat_ini, lfdat_fin,claseDoc,IdUsuario,Canal, Oficina, Usuario, flag,callback){
           var contexto = {};
           contexto.servicio = "stockServices.stockPedComprometidos()";
           contexto.url = "material.aspx";
           contexto.parametros = { lstDoc: lstPedJSON, lstSoli : lstSolJSON , Fecha1: lfdat_ini, Fecha2: lfdat_fin, Clase: claseDoc, IdUsuario:IdUsuario, Canal:Canal, Oficina:Oficina, Usuario:Usuario,flag:flag };
           
           var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
                        
            if(!parametros){
                parametros = {};
            }
            parametros.usuario = window.dataIni.user.User;
            parametros.clave = window.dataIni.user.Password;
            parametros.Language = "ES";//
            parametros.idioma = "ES";//
            parametros.Id = window.dataIni.user.Id;
            /*        
            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.Id = window.dataIni.user.Id;
            parametros.GrpVend = window.dataIni.person.GrpVend;
            parametros.Descripcion = window.dataIni.person.Descripcion;
            parametros.CodigoVendedor = window.dataIni.person.PerNr;
            parametros.OrgVentas = window.dataIni.person.OrgVentas;
            parametros.CanalDist = window.dataIni.person.CanalDist;
            parametros.OfVentas = window.dataIni.person.OfVentas;*/
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
       }                                
   };
});