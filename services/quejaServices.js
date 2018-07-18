sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function (ODataModel, utilService, utilString) {
        "use strict";
        return {
           buscarCliQueja:function(buscarCliQueja,callback){
            var contexto = {};
            contexto.servicio = "quejaServices.buscarCliQueja()";
            contexto.url = "queja.aspx";
            contexto.parametros = {
                "CodCli": buscarCliQueja.CodCli ,
                "NomCliente": buscarCliQueja.NomCliente ,
                "Calles": buscarCliQueja.Calles ,
                "Ubicacion": buscarCliQueja.Ubicacion ,
                "Telefono": buscarCliQueja.Telefono ,
                "OfiVenta": buscarCliQueja.OfiVenta ,
                "TextoQueja": buscarCliQueja.TextoQueja ,
                "codigo": buscarCliQueja.CodCli ,
                "accion": "buscacli" };
                
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

                //var resultado = utilService.exec(contexto);
                //return resultado;
            },
            guardarQueja:function(nuevoQueja,callback){
                var contexto = {};
                contexto.servicio = "quejaServices.guardarQueja()";
                contexto.url = "queja.aspx";
                contexto.parametros = {
                    "CodCli": nuevoQueja.CodCli ,
                    "NomCliente": nuevoQueja.NomCliente ,
                    "Calles": nuevoQueja.Calles ,
                    "Ubicacion": nuevoQueja.Ubicacion ,
                    "Telefono": nuevoQueja.Telefono ,
                    "OfiVenta": nuevoQueja.OfiVenta ,
                    "TextoQueja": nuevoQueja.TextoQueja ,
                    "codigo": nuevoQueja.CodCli ,
                    "nomcli": nuevoQueja.NomCliente ,
                    "calle": nuevoQueja.Calles ,
                    "ubica": nuevoQueja.Ubicacion ,
                    "telef": nuevoQueja.Telefono ,
                    "texto": nuevoQueja.TextoQueja ,
                    "oventa": nuevoQueja.OfiVenta ,
                    "accion":"creaqueja" };
                    
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

                    //var resultado = utilService.exec(contexto);
                    //return resultado;
                },
                buscarQueja:function(buscarQueja,callback){
                    var contexto = {};
                    contexto.servicio = "quejaServices.buscarQueja()";
                    contexto.url = "queja.aspx";
                    contexto.parametros = {
                        "NumQueja": buscarQueja.NumQueja,
                        "CodCli": buscarQueja.CodCli ,
                        "NomCliente": buscarQueja.NomCliente ,
                        "Calles": buscarQueja.Calles ,
                        "Ubicacion": buscarQueja.Ubicacion ,
                        "Telefono": buscarQueja.Telefono ,
                        "OfiVenta": buscarQueja.OfiVenta ,
                        "TextoQueja": buscarQueja.TextoQueja ,
                        "codigo": buscarQueja.NumQueja ,
                        "accion":"modbusqueja" };
                        
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

                        //var resultado = utilService.exec(contexto);
                        //return resultado;
                    },
                    modificarQueja:function(modificarQueja,callback){
                        var contexto = {};
                        contexto.servicio = "quejaServices.modificarQueja()";
                        contexto.url = "queja.aspx";
                        contexto.parametros = {
                            "NumQueja": modificarQueja.NumQueja,
                            "CodCli": modificarQueja.CodCli ,
                            "NomCliente": modificarQueja.NomCliente ,
                            "Calles": modificarQueja.Calles ,
                            "Ubicacion": modificarQueja.Ubicacion ,
                            "Telefono": modificarQueja.Telefono ,
                            "OfiVenta": modificarQueja.OfiVenta ,
                            "TextoQueja": modificarQueja.TextoQueja ,
                            "queja": modificarQueja.NumQueja ,
                            "codigo": modificarQueja.CodCli ,
                            "nomcli": modificarQueja.NomCliente ,
                            "calle": modificarQueja.Calles ,
                            "ubica": modificarQueja.Ubicacion ,
                            "telef": modificarQueja.Telefono ,
                            "texto": modificarQueja.TextoQueja ,
                            "oventa": modificarQueja.OfiVenta ,
                            "accion": "modqueja",
                            "adrnr": modificarQueja.ADRNR };
                            
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

                            //var resultado = utilService.exec(contexto);
                            //return resultado;
                        },
                        buscarListaQueja:function(buscarListaQueja,callback){
                            var contexto = {};
                            contexto.servicio = "quejaServices.buscarListaQueja()";
                            contexto.url = "buscarReclamos.aspx";
                            contexto.parametros = {
                                "pNumeroReclamo": buscarListaQueja.pNumeroReclamo,
                                "pCodigoCliente": buscarListaQueja.pCodigoCliente ,
                                "pFechaCreacionI": buscarListaQueja.pFechaCreacionI ,
                                "pFechaCreacionF": buscarListaQueja.pFechaCreacionF ,
                                "accion": "Z008" };
                                
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

                                //var resultado = utilService.exec(contexto);
                                //return resultado;
                            },
        verQuejaSeleccionado:function(quejaSeleccionado,callback){
            var contexto = {};
            contexto.servicio = "quejaServices.verQuejaSeleccionado()";
            contexto.url = "queja.aspx";
            contexto.parametros = {
                                     "codigo": quejaSeleccionado.NumQueja ,
                                    "accion": "verbusqueja" };
                                    
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

                                    //var resultado = utilService.exec(contexto);
                                    //return resultado;
                                },
        verBuscarQueja:function(verBuscarQueja,callback){
            var contexto = {};
            contexto.servicio = "quejaServices.verBuscarQueja()";
            contexto.url = "queja.aspx";
            contexto.parametros = {
                                        "NumQueja": verBuscarQueja.NumQueja ,
                                        "CodCli": verBuscarQueja.CodCli ,
                                        "NomCliente": verBuscarQueja.NomCliente ,
                                        "Calles": verBuscarQueja.Calles ,
                                        "Ubicacion": verBuscarQueja.Ubicacion ,
                                        "Telefono": verBuscarQueja.Telefono ,
                                        "OfiVenta": verBuscarQueja.OfiVenta ,
                                        "TextoQueja": verBuscarQueja.TextoQueja ,
                                        "codigo": verBuscarQueja.NumQueja ,
                                        "accion": "verbusqueja" };
                                        
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

                                        //var resultado = utilService.exec(contexto);
                                        //return resultado;
                                    },
                                    
                                };
                            });