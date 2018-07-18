sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
    ], function (ODataModel, utilService, utilString) {
        "use strict";
        return {
        //INICIO EDELACRUZ: 
        //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
        //Combo campo: "tipo de busqueda"
        // Listar busqueda de documentos
        grabarRuc: function (crearEmpresa,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.grabarRuc()";
            contexto.url = "buscarClientes.aspx";
            contexto.parametros = crearEmpresa;

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
                    /*var mensaje = utilString.estadoInternet();
                        var respuesta = { c : "e" , m : mensaje, data : result , success : false };
                        if (result=== "") {
                            var bOpenInNewWindow= false; 
                            localStorage.clear();
                            sessionStorage.clear();
                            sap.m.URLHelper.redirect("index.html", bOpenInNewWindow);
                            return false;
                        }
                        callback(respuesta);*/
                } 
            });  


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        buscarDocumento: function (buscarDocumento,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.buscarDocumento()";
            contexto.url = "buscarDocumento.aspx";
            contexto.parametros = {tipoBusqueda: buscarDocumento.tipoBusqueda,
                                    datoBusqueda: buscarDocumento.datoBusqueda,
                                    nMaterial: buscarDocumento.nMaterial,
                                    claseDoc: buscarDocumento.claseDoc,
                                    fecInicio1: buscarDocumento.fecInicio1,
                                    fecFin1: buscarDocumento.fecFin1,
                                    codAsesor: buscarDocumento.codAsesor
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
                    /*var mensaje = utilString.estadoInternet();
                        var respuesta = { c : "e" , m : mensaje, data : result , success : false };
                        if (result=== "") {
                            var bOpenInNewWindow= false; 
                            localStorage.clear();
                            sessionStorage.clear();
                            sap.m.URLHelper.redirect("index.html", bOpenInNewWindow);
                            return false;
                        }
                        callback(respuesta);*/
                } 
            });  


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        // Crear Cotizacion
        crearDocumento: function(tipoDocumento,pNumPedido,callback) {
            var contexto = {};
            contexto.servicio = "documentosServices.crearDocumento()";
            contexto.url = "crearDocumento.aspx";
            contexto.parametros = { tipoDocumento: tipoDocumento, pNumPedido:pNumPedido};

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
        // Actualizacion Gian Carlo Vera
        // Esta funcion permite corregir el bug fix para los dispositivos ipads, a traves de llamadas asyncronas median callbacks.
        crearDocumentoCallback: function(tipoDocumento,pNumPedido,callback) {
            var contexto = {};
            contexto.servicio = "documentosServices.crearDocumento()";
            contexto.url = "crearDocumento.aspx";
            contexto.parametros = { tipoDocumento: tipoDocumento, pNumPedido:pNumPedido, accion:""};

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
                        var respuesta = { c : "s" , m : "", data : result , success : true };
			if (result=== "") {
				var bOpenInNewWindow= false; 
				localStorage.clear();
                		sessionStorage.clear();
                		sap.m.URLHelper.redirect("index.html", bOpenInNewWindow);
				return false;
				}
		                callback(respuesta);
		        },
                error: function(result){
                    utilString.estadoInternet(result, callback);
                        /*var respuesta = { c : "e" , m : mensaje, data : result , success : false };
                        if (result=== "") {
                            var bOpenInNewWindow= false; 
                            localStorage.clear();
                            sessionStorage.clear();
                            sap.m.URLHelper.redirect("index.html", bOpenInNewWindow);
                            return false;
                        }
                        callback(respuesta);*/
                }	
            });  


        },

        visualizarDocumento: function (tipoDocumento, accion, numPedido,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.visualizarDocumento()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {  
                tipoDocumento: tipoDocumento,              
                accion: accion,
                pNumPedido: numPedido
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


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        // Modificado
        modificarDocumento: function (accion, numPedido,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.visualizarDocumento()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {              
                accion: accion,
                pNumPedido: numPedido
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


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        guardarDocumento: function (nuevoDocumento,listaMatJson,listaDsctoJson,listaRepJson,listaIntJson,listaPedJson,listadatosCliente,listaPlanFacturacion, callback)
        {
            sap.ui.core.BusyIndicator.show(0);
            var contexto = {};
            contexto.servicio = "documentosServices.guardarDocumento()";
            contexto.url = "guardarDocumento.aspx";
            contexto.parametros = {codigoCliente: nuevoDocumento.codigoCliente,
                nombreCliente: nuevoDocumento.nombreCliente,
                OrgVentas: nuevoDocumento.OrgVentas,
                CanalDist: nuevoDocumento.CanalDist,
                CodOficina: nuevoDocumento.CodOficina,
                CondPago: nuevoDocumento.CondPago,
                Moneda: nuevoDocumento.Moneda,
                TipoCambio: nuevoDocumento.TipoCambio,
                dsctoAdicionalZD12: nuevoDocumento.dsctoAdicionalZD12,
                pesoTotal: nuevoDocumento.pesoTotal,
                FechaFacturacion: nuevoDocumento.FechaFacturacion,
                GrupoCond: nuevoDocumento.GrupoCond,
                Motivo: nuevoDocumento.Motivo,
                BloqueoFactura: nuevoDocumento.BloqueoFactura,
                BloqueoEntrega: nuevoDocumento.BloqueoEntrega,
                OrdenCompra: nuevoDocumento.OrdenCompra,
                FechaPedido: nuevoDocumento.FechaPedido,
                FechaValidez: nuevoDocumento.FechaValidez,
                FechaEntrega: nuevoDocumento.FechaEntrega,
                CondExp: nuevoDocumento.CondExp,
                FechaReparto: nuevoDocumento.FechaReparto,
                nomProyecto: nuevoDocumento.nomProyecto,
                codProyecto: nuevoDocumento.codProyecto,
                codVersion: nuevoDocumento.codVersion,
                TipoVisita: nuevoDocumento.TipoVisita,
                cbxReembolsable: nuevoDocumento.cbxReembolsable,
                GrupoForecast: nuevoDocumento.GrupoForecast,
                TipoForecast: nuevoDocumento.TipoForecast,
                Certificado: nuevoDocumento.Certificado,
                FechaVisita: nuevoDocumento.FechaVisita,

                pPedTotal: nuevoDocumento.pPedTotal,

                listaMatJson: listaMatJson,
                listaDsctoJson: listaDsctoJson,
                listaRepJson: listaRepJson,
                listaIntJson: listaIntJson,
                listaPedJson: listaPedJson,
                listadatosCliente: listadatosCliente,
                pPlanFacturacion: listaPlanFacturacion,                  
                numPedido: nuevoDocumento.numPedido,
                op: nuevoDocumento.op,
                planFact: nuevoDocumento.planFact
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
            console.log("<--------------     " + servicio + "    -------------->");
            
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
            // var resultado = utilService.exec(contexto);
            // return resultado;
        },
        guardarDocumentoModificar: function (nuevoDocumento,listaMatJson,listaDsctoJson,listaRepJson,listaIntJson,listaPedJson,listadatosCliente,listaPlanFacturacion,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.guardarDocumentoModificar()";
            contexto.url = "guardarDocumento.aspx";
            contexto.parametros = {codigoCliente: nuevoDocumento.codigoCliente,
                nombreCliente: nuevoDocumento.nombreCliente,
                OrgVentas: nuevoDocumento.OrgVentas,
                CanalDist: nuevoDocumento.CanalDist,
                CodOficina: nuevoDocumento.CodOficina,
                CondPago: nuevoDocumento.CondPago,
                Moneda: nuevoDocumento.Moneda,
                TipoCambio: nuevoDocumento.TipoCambio,
                dsctoAdicionalZD12: nuevoDocumento.dsctoAdicionalZD12,
                pesoTotal: nuevoDocumento.pesoTotal,
                FechaFacturacion: nuevoDocumento.FechaFacturacion,
                GrupoCond: nuevoDocumento.GrupoCond,
                Motivo: nuevoDocumento.Motivo,
                BloqueoFactura: nuevoDocumento.BloqueoFactura,
                BloqueoEntrega: nuevoDocumento.BloqueoEntrega,
                OrdenCompra: nuevoDocumento.OrdenCompra,
                FechaPedido: nuevoDocumento.FechaPedido,
                FechaValidez: nuevoDocumento.FechaValidez,
                FechaEntrega: nuevoDocumento.FechaEntrega,
                CondExp: nuevoDocumento.CondExp,
                FechaReparto: nuevoDocumento.FechaReparto,
                nomProyecto: nuevoDocumento.nomProyecto,
                codProyecto: nuevoDocumento.codProyecto,
                codVersion: nuevoDocumento.codVersion,
                TipoVisita: nuevoDocumento.TipoVisita,
                cbxReembolsable: nuevoDocumento.cbxReembolsable,
                GrupoForecast: nuevoDocumento.GrupoForecast,
                TipoForecast: nuevoDocumento.TipoForecast,
                Certificado: nuevoDocumento.Certificado,
                FechaVisita: nuevoDocumento.FechaVisita,

                pPedTotal: nuevoDocumento.pPedTotal,
                
                listaMatJson: listaMatJson,
                listaDsctoJson: listaDsctoJson,
                listaRepJson: listaRepJson,
                listaIntJson: listaIntJson,
                listaPedJson: listaPedJson,
                listadatosCliente: listadatosCliente,
                pPlanFacturacion: listaPlanFacturacion,                  
                numPedido: nuevoDocumento.numPedido,
                op: nuevoDocumento.op,
                planFact: nuevoDocumento.planFact
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

            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        ////Materiales////////////////////////////////////////////////////////////////////////////
        buscarmaterial: function(datosMateriales, callback) {

            var contexto = {};
            contexto.servicio = "documentosServices.buscarmaterial()";
            contexto.url = "material.aspx";
            contexto.parametros = { codigo: datosMateriales.codigo, codigoAntiguo: datosMateriales.codigoAntiguo, descripcionMaterial: datosMateriales.descripcionMaterial, categoria: datosMateriales.categoria, 
                                    linea: datosMateriales.linea, marca: datosMateriales.marca, OrgVentas: datosMateriales.orgVentas, CanalDist: datosMateriales.canalDist, OfVentas: datosMateriales.ofVentas, listacaract: datosMateriales.listacaract};

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
        ////End Materiales////////////////////////////////////////////////////////////////////////
        crearInstalacion: function (venta1, venta2, venta3, venta4, visita1, visita2, visita3,visita4,tipovisita,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.crearInstalacion()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {venta1: venta1,
                                   venta2: venta2,
                                   venta3: venta3,
                                   venta4: venta4,
                                   visita1: visita1,
                                   visita2: visita2,
                                   visita3: visita3,
                                   visita4: visita4,
                                   TipoVisita: tipovisita,
                                   instalacion: "instalacion"
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

            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        consultarServicioInstalacion: function (venta1,flag,callback)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.consultarServicioInstalacion()";
            contexto.url = "material.aspx";
            contexto.parametros = {venta1: venta1,
                                   flag: flag
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

            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        ////Inicio Conversion a Pedido DocBuscar//////////////////
        conversionPedido:function(convPedido,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.conversionPedido()";
            contexto.url = "flujoDocumento.aspx";
            contexto.parametros = {pNumPedido: convPedido.NumeroPedido ,
                                    tipoDocumento: "Z001" 
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

             //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        ////End Conversion a Pedido DocBuscar/////////////////////
        buscarCaracteristicas:function(codigo,codigoAntiguo,descripcionMaterial,categoria,linea,marca,buscarCaract,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.buscarCaracteristicas()";
            contexto.url = "material.aspx";
            contexto.parametros = {codigo:codigo, codigoAntiguo:codigoAntiguo, descripcionMaterial:descripcionMaterial, categoria:categoria, linea:linea, marca:marca, buscarCaract:buscarCaract
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
            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        visualizarPedMultiples:function(tipoDocumento,accion,numPedido,flag,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.visualizarPedMultiples()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {  
                tipoDocumento: tipoDocumento,              
                accion: accion,
                pNumPedido: numPedido,
                flag: flag,//pedMult,
                canalDist:window.dataIni.person.CanalDist,
                OrgVtas:window.dataIni.person.OrgVentas,
                Id:window.dataIni.user.Id,
                usuario:window.dataIni.user.User,
                clave:window.dataIni.user.Password,
                idioma:"ES",

            };         

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
            
            if(!parametros){
                parametros = {};
            }

            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.User = window.dataIni.user.User;
            parametros.Password = window.dataIni.user.Password;
            parametros.Language = "ES";//

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
        crearPedMultiple:function(numPedido, tipoDocumento,detMaterial,flag,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.crearPedMultiple()";
            contexto.url = "guardarDocumento.aspx";
            contexto.parametros = {
                añadirForm:"S",
                ref: numPedido,  
                tipo: tipoDocumento,
                mat: detMaterial,    
                flag: flag,//pedMult,
                canalDist:window.dataIni.person.CanalDist,
                OrgVtas:window.dataIni.person.OrgVentas,
                Id:window.dataIni.user.Id,
                usuario:window.dataIni.user.User,
                clave:window.dataIni.user.Password,
                idioma:"ES"

            };         

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
               
            if(!parametros){
                parametros = {};
            }
            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.User = window.dataIni.user.User;
            parametros.Password = window.dataIni.user.Password;
            parametros.Language = "ES";//
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
        enviarPDF:function(cotizacion, cliente, asesor,tipo,imagen,asunto,cuerpo,cantidad,tipocondicion,sublink,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.enviarPDF()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {
                Cotizacion:cotizacion,
                tipoCond:tipocondicion,
                cliente: cliente,  
                asesor: asesor,
                Tipo: tipo,    
                Img: imagen,
                Asunto:asunto,
                Cuerpo:cuerpo,
                enviarPdf:"pdf",
                cantMatpdf:cantidad,

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

            console.warn("<--------------     " + servicio + "    -------------->");
            sublink = window.RootAmbienteImpresion + "/" + sublink;
            var dataOut = null;
            var codigo = "x";
            var descripcion = ""; 
            var respuesta;

             $.ajax({
                url: url + "?Tipo="+tipo+"&Cotizacion=" + cotizacion + "&TipoCond=" + tipocondicion + "&Cliente=" + cliente + "&Asesor=" + asesor +"&Asunto=" + asunto +"&Cuerpo=" + cuerpo + "&enviarPdf=" + "pdf" + "&cantMatpdf=" + cantidad+"&sublink="+sublink, 
                method: "POST",
                cache : false,
                async: true,
                data: imagen,
                timeout:5000000,     
                success: function(result){
                        var respuesta = { c : "s" , m : "", data : result };
                        callback(respuesta);
                },
                error: callback
            });  


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        previsualizarPDF:function(cotizacion,tipo,imagen,cantidad,tipocondicion,sublink,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.enviarPDF()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {
                cotizacion:cotizacion,
                cantMatpdf:cantidad,
                tipoCond:tipocondicion,
                tipo: tipo,    
                Img: imagen,
                enviarPdf:"previewpdf",
                canalDist:window.dataIni.person.CanalDist,
                OrgVtas:window.dataIni.person.OrgVentas,
                Id:window.dataIni.user.Id,
                usuario:window.dataIni.user.User,
                clave:window.dataIni.user.Password,
                idioma:"ES"

            };         

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
            
            if(!parametros){
                parametros = {};
            }

            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.User = window.dataIni.user.User;
            parametros.Password = window.dataIni.user.Password;
            parametros.Language = "ES";//

            console.warn("<--------------     " + servicio + "    -------------->");
            sublink = window.RootAmbienteImpresion + "/" + sublink;
            var dataOut = null;
            var codigo = "x";
            var descripcion = ""; 
            var respuesta;

             $.ajax({
                url: url + "?tipo="+tipo+"&cotizacion=" + cotizacion + "&cantMatpdf=" + cantidad + "&tipoCond=" + tipo + "&enviarPdf=" + "previewpdf&sublink="+sublink, 
                method: "POST",
                cache : false,
                async: true,
                data: imagen,
                timeout:5000000,     
                success: function(result){
                        var respuesta = { c : "s" , m : "", data : result };
                        callback(respuesta);
                },
                error: callback
            });  


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        enviarPDF1:function(cotizacion, cliente, asesor,tipo,imagen,asunto,cuerpo,cantidad,tipocondicion,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.enviarPDF()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {
                cotizacion:cotizacion,
                tipoCond:tipocondicion,
                cliente: cliente,  
                asesor: asesor,
                tipo: tipo,    
                Img: imagen,//pedMult,
                asunto:asunto,
                cuerpo:cuerpo,
                enviarPdf:"pdf",
                cantMatpdf:cantidad,
                canalDist:window.dataIni.person.CanalDist,
                OrgVtas:window.dataIni.person.OrgVentas,
                Id:window.dataIni.user.Id,
                usuario:window.dataIni.user.User,
                clave:window.dataIni.user.Password,
                idioma:"ES"

            };         

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
            
            if(!parametros){
                parametros = {};
            }

            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.User = window.dataIni.user.User;
            parametros.Password = window.dataIni.user.Password;
            parametros.Language = "ES";//

            console.warn("<--------------     " + servicio + "    -------------->");
            
            var dataOut = null;
            var codigo = "x";
            var descripcion = ""; 
            var respuesta;

             $.ajax({
                url: url, 
                method: "GET",
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


            //var resultado = utilService.exec(contexto);
            //return resultado;
        },
        previsualizarPDF1:function(cotizacion,tipo,imagen,cantidad,tipocondicion,callback){
            var contexto = {};
            contexto.servicio = "documentosServices.enviarPDF()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {
                cotizacion:cotizacion,
                cantMatpdf:cantidad,
                tipoCond:tipocondicion,
                tipo: tipo,    
                Img: imagen,
                enviarPdf:"previewpdf",
                canalDist:window.dataIni.person.CanalDist,
                OrgVtas:window.dataIni.person.OrgVentas,
                Id:window.dataIni.user.Id,
                usuario:window.dataIni.user.User,
                clave:window.dataIni.user.Password,
                idioma:"ES"

            };         

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;
            
            if(!parametros){
                parametros = {};
            }

            parametros.UserId = window.dataIni.user.User;
            parametros.PwdId = window.dataIni.user.Password;
            parametros.User = window.dataIni.user.User;
            parametros.Password = window.dataIni.user.Password;
            parametros.Language = "ES";//
            
            console.warn("<--------------     " + servicio + "    -------------->");
            
            var dataOut = null;
            var codigo = "x";
            var descripcion = ""; 
            var respuesta;

             $.ajax({
                url: url, 
                method: "GET",
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


            //var resultado = utilService.exec(contexto);
            //return resultado;
        }

        
    };
});