sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function(ODataModel, utilService, utilString) {
        "use strict";
        return {
            buscarmaterial: function(codigo,codAntiguo,desMaterial,categoria,linea,marca,orgVentas,canalDist,ofVentas,callback) {
                var contexto = {};
                contexto.servicio = "materialServices.buscarmaterial()";
                contexto.url = "material.aspx";
                contexto.parametros = { codigo: codigo, codigoAntiguo:codAntiguo, descripcionMaterial:desMaterial, categoria:categoria, linea:linea, marca:marca, OrgVentas:orgVentas, CanalDist:canalDist, OfVentas:ofVentas};
                
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
            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca            
        },
        buscarStockMaterial: function(codigoMaterial, dsctoLotes,callback) {

            var contexto = {};
            contexto.servicio = "materialServices.buscarStockMaterial()";
            contexto.url = "material.aspx";
            contexto.parametros = {codigoMaterial:codigoMaterial, dsctoLotes:dsctoLotes};
                
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
            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca            
        },

        stockDisponibleListaMateriales:function(material,callback){
            var stockDisponible = material;
            var contexto = {};
                contexto.servicio = "materialServices.stockDisponibleListaMateriales()";
                contexto.url = "material.aspx";
                contexto.parametros = stockDisponible;
                
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
            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca      
        },

        anadirMaterialMaster: function(material,callback){
	    console.log("Añadir Material");
            var materialPedido = material;
            var contexto = {};
            contexto.servicio = "materialServices.anadirMaterialMaster()";
            contexto.url = "material.aspx";
            contexto.parametros = materialPedido;
            
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
        
        anadirMaterialBuscar:function(objetoDetalle,objetoMaterial,objetoPedido,anadirMat){
            var contexto = {};
            contexto.servicio = "materialServices.anadirMaterialBuscar()";
            contexto.url = "material.aspx";
            contexto.parametros = { objDetalle: objetoDetalle, objMaterial:objetoMaterial, objPedido:objetoPedido, añadirMat:anadirMat};
            return utilService.exec(contexto);            //codigo codigoAntiguo descripcionMaterial  categoria  linea  marca
        },  
     
        recalcular: function(op,estadoView,numPedido,dsctoLotes, listaInterJson, listaDsctoJson,
            listaRepartosJson, listaMatJson,listaPedJson){
	       var that = this;
            var contexto = {};
            contexto.servicio = "materialServices.recalcular()";
            contexto.url = "material.aspx";
            contexto.parametros =  { 
                op: op,
                estadoView: estadoView,
                numPedido: numPedido,
                dsctoLotes: dsctoLotes,
                listaInterJson: listaInterJson,
                listaDsctoJson: listaDsctoJson,
                listaRepartosJson: listaRepartosJson,
                listaMatJson: listaMatJson,
                listaPedJson: listaPedJson,
                flag:"recalcular",
                User : window.dataIni.user.User,
                Password : window.dataIni.user.Password,
                Language : "ES"//
                };
		          var url = window.RootServices + contexto.url;
        		var dataOut = null;
                    	var codigo = "s";
                    	var descripcion = ""; 
                        //return utilService.exec(contexto);
        		
        	     $.ajax({
                        url: url, //"http://140.20.0.101/ipad_proyecto/material.aspx",
                        method: "POST",
                        async: true,
                        data: contexto.parametros,
                        timeout: 50000,
         		contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                        success: function(result){
        		    sap.ui.core.BusyIndicator.hide()
                            console.info("SUCCESS RESULT");
                            console.log(result);
                            console.log("\n");	    	
                            dataOut = result;
        		    // Mejorar
        		    var pedido = result.objPedido;

        		    // Funciones externas del controlador DocNuevo.
        		    var self = sap.ui.controller("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocNuevo");
        		    var pedido = self.agregarDatosPedido(pedido);                            
                            var materiales = self.agregarDetalleMateriales(pedido.Detalle);

        		    sap.ui.getCore().byId("__xmlview2").getModel().setProperty("/pedido", pedido);
                            sap.ui.getCore().byId("__xmlview2").getModel().setProperty("/listaMaterial", materiales);
                        },
                        error: function(xhr,status,error){
                            console.error("ERROR RESULT");
                            console.log(xhr);
                            console.log(status);
                            console.log(error);
                            console.log("\n");
                            codigo = "ex";
                            descripcion = status + " : " + error;
                        }
                    });
        		console.log("re-calculando");
        		var respuesta = { c : codigo , m : descripcion, data : dataOut };
        		console.info("RESULT FINAL");
        		console.log(respuesta);
        		return false;

            },

        recalcularModificar: function(op,estadoView,numPedido,dsctoLotes, listaInterJson, listaDsctoJson,
            listaRepartosJson, listaMatJson,listaPedJson,callback){
            var contexto = {};
            contexto.servicio = "materialServices.recalcularModificar()";
            contexto.url = "material.aspx";
            contexto.parametros = { 
                op: op,
                estadoView: estadoView,
                numPedido: numPedido,
                dsctoLotes: dsctoLotes,
                listaInterJson: listaInterJson,
                listaDsctoJson: listaDsctoJson,
                listaRepartosJson: listaRepartosJson,
                listaMatJson: listaMatJson,
                listaPedJson: listaPedJson,
                flag:"recalcular"};
                
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
 	 

        catalogo:function(materialSeleccionado){
            var catalogo = materialSeleccionado;
            var contexto = {};
            contexto.servicio = "materialServices.catalogo()";
            contexto.url = "catalogo.aspx";
            contexto.parametros = catalogo;
            return utilService.exec(contexto);
            },
        
        };
    });