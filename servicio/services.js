sap.ui.define([
    "com/decor/ubicaciones/util/utilResponse",
    "com/decor/ubicaciones/constantes",
    "com/decor/ubicaciones/util/utilHttp"
], function (utilResponse, constantes, utilHttp) {
    "use strict";
    return {
        ConsultaUsuarioClave: function (usuario,clave, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "T_CENTRO";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                                '<soapenv:Header/>' +
                                '<soapenv:Body>' +
                                '<urn:Z_MM_VALIDA_LOGUEO_CENTRO>' +
                                    '<BNAME>'+usuario+'</BNAME>' +
                                    '<PASSWORD>'+clave+'</PASSWORD>' +
                                    '<T_RETURN>' +
                                    '</T_RETURN>' +
                                '</urn:Z_MM_VALIDA_LOGUEO_CENTRO>' +
                                '</soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaCentroUbicacion: function (usuario, callback) {

            var pathService = "zws_ubicaciones/" + constantes.ClientSOAP + "/zws_ubicaciones/zws_ubicaciones";
            var entityResult = "ConsultaUbicacionCentro";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:soap:functions:mc-style">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                '<urn:ZMmConsultaCentroUbicacion>' +
                '<!--Optional:-->' +
                '<UsuNombre>' + usuario + '</UsuNombre>' +
                '</urn:ZMmConsultaCentroUbicacion>' +
                '</soapenv:Body>' +
                '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaMaterialesPorEntrega: function (nroEntrega, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "DETALLE_ENTREGA";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                                '<soapenv:Header/>' +
                                '<soapenv:Body>' +
                                '<urn:Z_MM_CONSULTA_ENTREGA1>' +
                                    '<T_RETURN>' +
                                    '</T_RETURN>' +
                                    '<VBELN>' + nroEntrega + '</VBELN> ' +
                                '</urn:Z_MM_CONSULTA_ENTREGA1>' +
                                '</soapenv:Body>' +
                              '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaMaterialesPorFolio: function (nroFolio, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "DETALLE_ENTREGA_2";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                                '<soapenv:Header/>' +
                                '<soapenv:Body>' +
                                '<urn:Z_MM_CONSULTA_ENTREGA2>' +
                                    '<T_RETURN>' +
                                    '</T_RETURN>' +
                                    '<XBLNR>' + nroFolio + '</XBLNR>' +
                                '</urn:Z_MM_CONSULTA_ENTREGA2>' +
                                '</soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaMaterialesOC: function (nroOC, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "DETALLE_OC";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                                '<soapenv:Header/>' +
                                '<soapenv:Body>' +
                                '<urn:Z_MM_CONSULTA_OC>' +
                                    '<EBELN>' + nroOC + '</EBELN>' +
                                    '<T_RETURN>' +
                                    '</T_RETURN>' +
                                '</urn:Z_MM_CONSULTA_OC>' +
                                '</soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaStock: function (tipoBusqueda,centro, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "ET_STOCK_LIST";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                              '  <soapenv:Header/>' +
                              '  <soapenv:Body>' +
                              '  <urn:Z_MM_OBTENER_STOCK>' +
                              '      <!--Optional:-->' +
                              '      <IV_TIPO_BUSQ>'+tipoBusqueda+'</IV_TIPO_BUSQ>' +
                              '      <IV_WERKS>'+centro+'</IV_WERKS>' +
                              '  </urn:Z_MM_OBTENER_STOCK>' +
                              '  </soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaZonas: function (centro, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "ZONAS";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                              '  <soapenv:Header/>' +
                              '  <soapenv:Body>' +
                              '  <urn:Z_MM_CONSULTA_ZONA>' +
                              '      <CENTRO>'+centro+'</CENTRO>' +
                              '  </urn:Z_MM_CONSULTA_ZONA>' +
                              '  </soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaMuebles: function (zona, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "MUEBLES";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                              '  <soapenv:Header/>' +
                              '  <soapenv:Body>' +
                              '  <urn:Z_MM_CONSULTA_MUEBLE>' +
                              '      <ZONA>'+ zona +'</ZONA>' +
                              '  </urn:Z_MM_CONSULTA_MUEBLE>' +
                              '  </soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        ConsultaSecciones: function (zona,mueble, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "SECCIONES";
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                              '  <soapenv:Header/>' +
                              '  <soapenv:Body>' +
                              '  <urn:Z_MM_CONSULTA_SECCION>' +
                              '      <MUEBLE>'+mueble+'</MUEBLE>' +
                              '      <ZONA>'+zona+'</ZONA>' +
                              '  </urn:Z_MM_CONSULTA_SECCION>' +
                              '  </soapenv:Body>' +
                            '</soapenv:Envelope>';

            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        },
        Recepcion: function (data, callback) {

            var pathService = "zws_mm_ubicaciones/" + constantes.ClientSOAP + "/zws_mm_ubicaciones/zws_mm_ubicaciones";
            var entityResult = "T_RETURN";
            var itemsString = '';

            for(var i = 0 ; i < data.length; i++){
                var item = data[i];
                var cadena = '<item>' +
                                '<PEDIDO>'+ item.Pedido +'</PEDIDO>' +
                                '<POSICION>'+ item.Posicion +'</POSICION>' +
                                '<MATERIAL>'+ item.CodMaterial +'</MATERIAL>' +
                                '<CANTIDAD>'+ item.Cantidad +'</CANTIDAD>' +
                                '<UNIDAD>'+ item.UM +'</UNIDAD>' +
                                '<CENTRO>'+ item.Centro +'</CENTRO>' +
                                '<ALMACEN>'+ item.Almacen +'</ALMACEN>' +
                                '<LOTE>'+ item.Lote +'</LOTE>' +
                             '</item>';

                itemsString = itemsString + cadena;
            }

            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">' +
                                '<soapenv:Header/>' +
                                '<soapenv:Body>' +
                                '<urn:Z_MM_POR_UBICAR>' +
                                    '<I_LISTA>' +  itemsString + '</I_LISTA>' +
                                    '<T_RETURN></T_RETURN>' +
                                '</urn:Z_MM_POR_UBICAR>' +
                                '</soapenv:Body>' +
                            '</soapenv:Envelope>';
            console.log(soapRequest);
            utilHttp.soap(pathService, soapRequest, entityResult, callback);
        }
    };
});