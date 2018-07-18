sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function(ODataModel, utilService, utilString) {
        "use strict";
        return {
        // Listar centros
        buscarCliente: function(ruc,nombre,callback) {
            var contexto = {};
            contexto.servicio = "clienteServices.buscarCliente()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { rucdni : ruc , nombreCliente: nombre };

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
        buscarClienteCodigo: function(codigoClienteA, codigoCliente, canal,callback) {
            var contexto = {};
            contexto.servicio = "clienteServices.buscarClienteCodigo()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { codigoClienteA: codigoClienteA, codcliente: codigoCliente, canal: canal};
            
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
        buscarSolicitante: function(solicitanteDto,callback) {
            var contexto = {};
            
            contexto.servicio = "clienteServices.buscarSolicitante()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { Codigo:solicitanteDto.Codigo,Ruc:solicitanteDto.ruc,
                                    Descripcion:solicitanteDto.descripcion,Direccion:solicitanteDto.direccion,
                                    CodigoPostal:solicitanteDto.distrito,Telefono:solicitanteDto.telefono,
                                    Mail:solicitanteDto.mail,dni:solicitanteDto.dni,
                                    esRuc:solicitanteDto.esRuc,codcliente:solicitanteDto.codcliente,
                                    canal:window.dataIni.person.CanalDist
                /*esRuc: solicitanteDto.esRuc, Ruc: solicitanteDto.ruc , dni: solicitanteDto.dni , 
                Descripcion: solicitanteDto.descripcion, Direccion: solicitanteDto.direccion, 
                CodigoPostal: solicitanteDto.distrito, Telefono: solicitanteDto.telefono, Mail: solicitanteDto.mail */};
            
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
            //parametros.Descripcion = window.dataIni.person.Descripcion;
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
        buscarSolicitanteNombre:function(BusNombres,NombresBuscado,callback){
            var contexto = {};
            contexto.servicio = "clienteServices.buscarSolicitanteNombre()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = {BusNombres: BusNombres,NombresBuscado: NombresBuscado};
            
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
        buscarProfesionalNombre:function(tipoDocumento,nombreBuscado,tipo,callback){
            var contexto = {};
            contexto.servicio = "clienteServices.buscarProfesionalNombre()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = {rucdni: tipoDocumento,nombreCliente: nombreBuscado, Profesional: tipo};
            
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
        /*validarInterlocutores:function(Ruc, Descripcion, Direccion, CodigoPostal, Telefono, Mail, dni){
            var contexto = {};
            contexto.servicio = "clienteServices.validarInterlocutores()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = {Ruc: Ruc, Descripcion: Descripcion, Direccion: Direccion, CodigoPostal: CodigoPostal, Telefono: Telefono, Mail: Mail, dni: dni };
            return utilService.exec(contexto);
        } */
        validarInterlocutores:function(clienteAg){
            var contexto = {};
            contexto.servicio = "clienteServices.validarInterlocutores()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = clienteAg;
            return utilService.exec(contexto);
        },
        buscarSolicitante1:function(solicitanteDto){
            var contexto = {};
            contexto.servicio = "clienteServices.buscarSolicitante1()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = { Codigo:solicitanteDto.Codigo,Ruc:solicitanteDto.ruc,
                                    Descripcion:solicitanteDto.descripcion,Direccion:solicitanteDto.direccion,
                                    CodigoPostal:solicitanteDto.distrito,Telefono:solicitanteDto.telefono,
                                    Mail:solicitanteDto.mail,dni:solicitanteDto.dni,
                                    esRuc:solicitanteDto.esRuc,codcliente:solicitanteDto.codcliente,
                                    canal:window.dataIni.person.CanalDist
                /*esRuc: solicitanteDto.esRuc, Ruc: solicitanteDto.ruc , dni: solicitanteDto.dni , 
                Descripcion: solicitanteDto.descripcion, Direccion: solicitanteDto.direccion, 
                CodigoPostal: solicitanteDto.distrito, Telefono: solicitanteDto.telefono, Mail: solicitanteDto.mail */};
            return utilService.exec(contexto);
        }        
        };
    });