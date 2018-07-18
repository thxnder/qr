sap.ui.define([
    "pe/com/seidor/sap/decor/ventas/util/utilFragments",
    "pe/com/seidor/sap/decor/ventas/services/userServices"
], function(utilFragments, userServices) {
    "use strict";
    return {
        /*abrirFragment:function(self,idFragment,rutaFragment){
            var fragmentId = self.getView().createId(idFragment);
            var tab = sap.ui.core.Fragment.byId(fragmentId, "tab1");
            if (!self[idFragment]) {
                self[idFragment] = sap.ui.xmlfragment(
                    "pe.com.seidor.sap.decor.ventas.view."+rutaFragment,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[idFragment]);
            }
            self[idFragment].open();
            self.getView().byId(fragmentId).open();
        },
        cerrarFragment:function(self,idFragment){
            if (self[idFragment]) {
                self[idFragment].destroy();
                delete self[idFragment];
            } 
        },*/
        /*
        sessionStorage.setItem("DsctosPrinReserva"+materialMod.PosicionCorto,JSON.stringify(materialMod.DescuentoPrincipal));
            sessionStorage.setItem("DsctosOtrosReserva"+materialMod.PosicionCorto,JSON.stringify(materialMod.DescuentoOtros));
            this.getView().getModel().setProperty(path+"/DescuentoPrincipalReserva",JSON.parse(sessionStorage["DsctosPrinReserva"+materialMod.PosicionCorto]));
            this.getView().getModel().setProperty(path+"/DescuentoOtrosReserva",JSON.parse(sessionStorage["DsctosOtrosReserva"+materialMod.PosicionCorto]));
            */
        verificarTipoVariable:function(variable){
           var tipoVariable = typeof variable;
           return tipoVariable;
        },
        convertFechaFormatoDDMMAA:function(fecha,separador){
            var anioFecha = fecha.split(separador)[2];
            var mesFecha = fecha.split(separador)[1]-1;
            var diaFecha = fecha.split(separador)[0];
            var dtFecha = new Date(anioFecha,mesFecha,diaFecha);
            return dtFecha;
        },
        convertFechaFormatoAAMMD:function(fecha,separador){
            var anioFecha = fecha.split(separador)[0];
            var mesFecha = fecha.split(separador)[1]-1;
            var diaFecha = fecha.split(separador)[2];
            var dtFecha = new Date(anioFecha,mesFecha,diaFecha);

            return dtFecha;
        },
        borrarHistory:function(){
            history.pushState(-1, null); // back state
            history.pushState(0, null); // main state
            history.pushState(1, null); // forward state
            //history.go(-1); // start in main state
        },
        noRetrocederWeb:function(){
            function noBack(){
                window.history.forward();
            }
            noBack();
            window.onload=noBack;
            window.onpageshow=function(evt){
                if(evt.persisted)noBack();
            }
            window.onunload=function(){
                void(0);
            }
        }, 
        noAvanzarWeb:function(){
            function noForward(){
                window.history.back();
            }
            noForward();
            window.onload=noForward;
            window.onpageshow=function(evt){
                if(evt.persisted)noForward();
            }
            window.onunload=function(){
                void(0);
            }
        },    
        convertirTiposUndefined:function(dato){
            var datoModificado = "";
            datoModificado = dato;
            if(dato==undefined){
                datoModificado = "";
            }
            if(dato==null){
                datoModificado = "";
            }
            if(dato==NaN){
                datoModificado = "";
            }
            return datoModificado;
        },
        estadoInternet1: function(){
            var mensaje = "";
                if(navigator.onLine){
                    sap.ui.core.BusyIndicator.show(0);
                  fetch(window.RootServices).then(function(response) {
                    if(!response.ok) {
                     // Parece que hay acceso a Internet,
                     // pero la respuesta no ha sido ok
                     // También se puede comprobar el código de estado con response.status
                     // Y hacer algo específico según el estado exacto recibido
                     throw Error(response.statusText);
                    }
                   }).then(function(response) {
                     // Aqui debes llamar a la opcion de imprimir
                     sap.ui.core.BusyIndicator.hide();
                     console.log("Ingreso correctamente");
                     
                   }).catch(function(error) {
                    sap.ui.core.BusyIndicator.hide();
                    //MessageToast.show("No tiene Acceso al Servidor de Impresion");
                    return mensaje = "No tiene Acceso al Servidor";
                   });
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    //MessageToast.show("No se encuentra conectado a Internet");
                    return mensaje = "No se encuentra conectado a Internet";
                }
        },
        estadoInternet: function(result, callback){
            var mensaje = "";

                if(navigator.onLine){
                    sap.ui.core.BusyIndicator.show(0);
                  fetch(window.RootServices).then(function(response) {
                    if(!response.ok) {
                     // Parece que hay acceso a Internet,
                     // pero la respuesta no ha sido ok
                     // También se puede comprobar el código de estado con response.status
                     // Y hacer algo específico según el estado exacto recibido
                     throw Error(response.statusText);
                    }
                   }).then(function(response) {
                     // Aqui debes llamar a la opcion de imprimir
                     sap.ui.core.BusyIndicator.hide();
                     console.log("Ingreso correctamente");
                     
                   }).catch(function(error) {
                    sap.ui.core.BusyIndicator.hide();
                    //MessageToast.show("No tiene Acceso al Servidor de Impresion");
                    mensaje = "No tiene Acceso al Servidor";
                    console.log("No tiene Acceso al Servidor");
                    var respuesta = { c : "e" , m : mensaje, data : result , success : false };
                    callback(respuesta);
                   });
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    //MessageToast.show("No se encuentra conectado a Internet");
                    mensaje = "No se encuentra conectado a Internet";
                    console.log("No se encuentra conectado a Internet");
                    var respuesta = { c : "e" , m : mensaje, data : result , success : false };
                    callback(respuesta);
                }
        },
        storeDsctosPrinReserva:function(self,getData,setModel,posicion){
            sessionStorage.setItem("DsctosPrinReserva"+posicion,JSON.stringify(getData));
            if(sessionStorage["DsctosPrinReserva"+posicion]=="undefined" || sessionStorage["DsctosPrinReserva"+posicion]==""){
                self.getView().getModel().setProperty(setModel,[]);
            }else{
                self.getView().getModel().setProperty(setModel,JSON.parse(sessionStorage["DsctosPrinReserva"+posicion]));
            }
            
        },
        storeDsctosOtrosReserva:function(self,getData,setModel,posicion){
            sessionStorage.setItem("DsctosOtrosReserva"+posicion,JSON.stringify(getData));
            if(sessionStorage["DsctosOtrosReserva"+posicion]=="undefined" || sessionStorage["DsctosOtrosReserva"+posicion]==""){
                self.getView().getModel().setProperty(setModel,[]);
            }else{
                self.getView().getModel().setProperty(setModel,JSON.parse(sessionStorage["DsctosOtrosReserva"+posicion]));
            }
        },
        validarDni:function(self,id,dni){
            var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (dni.length != 8 && dni.length != 11) {
                    self.getView().byId(id).setValueState("Error");
                    self.getView().byId(id).focus();
                    self.getView().byId(id).setValueStateText("No es Dni/Ruc Valido");
                }else{
                    self.getView().byId(id).setValueState("None");
                }
        },
        validarEmail:function(self,id,email){
                var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!email.match(rexMail)) {
                    self.getView().byId(id).setValueState("Error");
                    self.getView().byId(id).focus();
                    self.getView().byId(id).setValueStateText("No es un email valido");
                }else{
                    self.getView().byId(id).setValueState("None");
                }
        },
        cargarFragmentsHome:function(self){
            var dlg = utilFragments.HomeDialogsFragments();
            for (var i = 0; i < dlg.length; i++) {
                if(!self[dlg[i].idFrag]){
                self[dlg[i].idFrag] = sap.ui.xmlfragment(
                    dlg[i].ruta,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[dlg[i].idFrag]);
                }
            }
        },
        destruirFragmentsHome:function(self){
                var dlg = utilFragments.HomeDialogsFragments();
            for (var i = 0; i < dlg.length; i++) {
                if (self[dlg[i].idFrag]) {
                    try{sap.ui.getCore().byId(dlg[i].idFrag).destroy();
                    }
                    catch(ex){self[dlg[i].idFrag].destroy();}
                    delete self[dlg[i].idFrag];
                }
            }
        },
        cargarFragmentsStock:function(self){
            var dlg = utilFragments.StockDialogsFragments();
            //var split = utilFragments.DocMasterDetailFragments();
            //var fragments = dlg.concat(split);
            for (var i = 0; i < dlg.length; i++) {
                if(!self[dlg[i].idFrag]){
                self[dlg[i].idFrag] = sap.ui.xmlfragment(
                    dlg[i].ruta,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[dlg[i].idFrag]);
                }
                //self[fragments[i].idFrag].open();
            }

        },
        destruirFragmentsStock:function(self){
            var dlg = utilFragments.StockDialogsFragments();
            for (var i = 0; i < dlg.length; i++) {
                if (self[dlg[i].idFrag]) {
                    try{sap.ui.getCore().byId(dlg[i].idFrag).destroy();
                    }
                    catch(ex){self[dlg[i].idFrag].destroy();}
                    delete self[dlg[i].idFrag];
                }
            }
            
        },
        cargarFragments:function(self){
            var dlg = utilFragments.DocDialogsFragments();
            //var split = utilFragments.DocMasterDetailFragments();
            //var fragments = dlg.concat(split);
            for (var i = 0; i < dlg.length; i++) {
                if(!self[dlg[i].idFrag]){
                self[dlg[i].idFrag] = sap.ui.xmlfragment(
                    dlg[i].ruta,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[dlg[i].idFrag]);
                }
                //self[fragments[i].idFrag].open();
            }

        },
        destruirFragments:function(self){
            var dlg = utilFragments.DocDialogsFragments();
            for (var i = 0; i < dlg.length; i++) {
                if (self[dlg[i].idFrag]) {
                    try{sap.ui.getCore().byId(dlg[i].idFrag).destroy();
                        if(sap.ui.getCore().byId("txtDetBusMatNoProveedor")){
                            sap.ui.getCore().byId("txtDetBusMatNoProveedor").destroy();
                        }
                        if(sap.ui.getCore().byId("txtDetBusMatProveedor")){
                            sap.ui.getCore().byId("txtDetBusMatProveedor").destroy();
                        }
                    }
                    catch(ex){self[dlg[i].idFrag].destroy();}
                    delete self[dlg[i].idFrag];
                }
            }
            
        },
        destruirFragmentsTotal:function(){
            var dlg = utilFragments.DocDialogsFragments().concat(utilFragments.StockDialogsFragments());
            for (var i = 0; i < dlg.length; i++) {
                try{
                    sap.ui.getCore().byId(dlg[i].idFrag).destroy();
                    if(sap.ui.getCore().byId("txtDetBusMatNoProveedor")){
                        sap.ui.getCore().byId("txtDetBusMatNoProveedor").destroy();
                    }
                    if(sap.ui.getCore().byId("txtDetBusMatProveedor")){
                        sap.ui.getCore().byId("txtDetBusMatProveedor").destroy();
                    }
                }catch(ex){}
            }
            
            
        },
        abrirFragment:function(self,idFragment,rutaFragment){
            if (!self[idFragment]) {
                self[idFragment] = sap.ui.xmlfragment(
                    "pe.com.seidor.sap.decor.ventas.view."+rutaFragment,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[idFragment]);
            }
            self[idFragment].open();
            //sap.ui.getCore().byId(idFragment).open();
        },
        cerrarFragment:function(self,idFragment){
            if (self[idFragment]) {
                self[idFragment].close();
                delete self[idFragment];
            } 
        },
       /* abrirFragment:function(self, rutaFragment){
            var dialogFrafment = sap.ui.xmlfragment(
                    "pe.com.seidor.sap.decor.ventas.view."+rutaFragment,
                    self.getView().getController() // associate controller with the fragment Asocia el Fragment con el controlador            
            );
            self.getView().addDependent(dialogFrafment);
            dialogFrafment.open();
        },
        cerrarFragment:function(idFragment){
            try{
                var dialog = sap.ui.getCore().byId(idFragment);
            dialog.destroy();
            }catch(ex){}
            
        },*/
        abrirFragment2:function(self,idFragment,rutaFragment){
                self[idFragment] = sap.ui.xmlfragment(
                    "pe.com.seidor.sap.decor.ventas.view."+rutaFragment,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[idFragment]);
            self[idFragment].open();
        },
        cerrarFragment2:function(self,idFragment){
            if (self[idFragment]) {
                self[idFragment].destroy(true);
            } 
        },
        pad:function  (n, length) {//Añadir ceros a la izquierda, length tamaño final que debe tener
            var  n = n.toString();
            while(n.length < length){
                 n = "0" + n;
                 }
            return n;
        },
        convertStringSumar:function  (n, adicional) {//Añadir ceros a la izquierda, length tamaño final que debe tener
            var  numero = parseInt(n) ;
            var adic = parseInt(adicional);
            var resul ="";
            n = (numero+adic).toString();
            return n;
        },
        fechaTodoJunto:function(fechTransito,separador){
                    var anio = fechTransito.split(separador)[2];
                    var mes = this.pad(fechTransito.split(separador)[1],2);
                    var dia = fechTransito.split(separador)[0];
            return anio+mes+dia;
        },
        fechaMasProxima:function(fechTransito,nombVariable,separador){
            var anioUltimo = fechTransito[fechTransito.length-1][nombVariable].split(separador)[0];
                    var mesUltimo = fechTransito[fechTransito.length-1][nombVariable].split(separador)[1]-1;
                    var diaUltimo = fechTransito[fechTransito.length-1][nombVariable].split(separador)[2];
                    var dtUltima = new Date(anioUltimo,mesUltimo,diaUltimo);
            var fechaProxima= "";
            var fechaDate = dtUltima;
            for (var i = fechTransito.length-1; 0 <= i ; i--) {
                    var anio = fechTransito[i][nombVariable].split(separador)[0];
                    var mes = fechTransito[i][nombVariable].split(separador)[1]-1;
                    var dia = fechTransito[i][nombVariable].split(separador)[2];
                    var dt = new Date(anio,mes,dia);
                if(fechTransito.length==1){
                    fechaProxima = dia+"/"+this.pad((parseInt(mes)+1),2 )+"/"+anio;
                }else{
                    //if(i!=0){
                        if(dt<=fechaDate){
                            fechaProxima = dia+"/"+this.pad((parseInt(mes)+1),2 )+"/"+anio;
                            fechaDate = dt;
                        }
                    //}
                }
            }
            return fechaProxima;
        },
        comparacionFechas:function(fecha1,comparador,fecha2,separador){
            var comparacion = false;
            var anioFecha1 = fecha1.split(separador)[2];
            var mesFecha1 = fecha1.split(separador)[1]-1;
            var diaFecha1 = fecha1.split(separador)[0];
            var dtFecha1 = new Date(anioFecha1,mesFecha1,diaFecha1);
            //
            var anioFecha2 = fecha2.split(separador)[2];
            var mesFecha2 = fecha2.split(separador)[1]-1;
            var diaFecha2 = fecha2.split(separador)[0];
            var dtFecha2 = new Date(anioFecha2,mesFecha2,diaFecha2);
            
            if(comparador=="<"){
                if(dtFecha1<dtFecha2){
                    comparacion = true;
                }
            }
            if(comparador=="<="){
                if(dtFecha1<=dtFecha2){
                    comparacion = true;
                }
            }
            if(comparador==">"){
                if(dtFecha1>dtFecha2){
                    comparacion = true;
                }
            }
            if(comparador==">="){
                if(dtFecha1>=dtFecha2){
                    comparacion = true;
                }
            }
            if(comparador=="=="){
                if(dtFecha1==dtFecha2){
                    comparacion = true;
                }
            }
            
            return comparacion;
        },
        cambiarSelectedLista:function(self, path,idLista,visible){
            var numb = path.match(/\d/g);
            numb = numb.join("");
            var firstItem = sap.ui.getCore().byId(idLista).getItems()[numb]; 
                            sap.ui.getCore().byId(idLista).setSelectedItem(firstItem,visible);
        },
        cambiarSelectedListaFragment:function(self, path,idLista,visible){
            var numb = path.match(/\d/g);
            numb = numb.join("");
            var firstItem = self.getView().byId(idLista).getItems()[numb]; 
                            self.getView().byId(idLista).setSelectedItem(firstItem,!visible);
                            self.getView().byId(idLista).setSelectedItem(firstItem,visible);
        },
        cambiarSelectedsLista:function(self,idLista,visible){
            var path =  sap.ui.getCore().byId(idLista)._aSelectedPaths;
            for (var i = path.length-1; i >= 0; i--) {
                var numb = path[path.length-1].match(/\d/g);
                numb = numb.join("");
                var firstItem = sap.ui.getCore().byId(idLista).getItems()[numb]; 
                                sap.ui.getCore().byId(idLista).setSelectedItem(firstItem,visible);
            }
            
        },
        generarFechaActual:function(){
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var fechaif = new Date();
                var mes0 = (fechaif.getMonth() +1);
                var mes = (fechaif.getMonth() +1);
                var year0 = fechaif.getFullYear();
                var year = fechaif.getFullYear();
                if(mes>=11){
                    if(mes==11){
                        mes = 2;
                        year = year+1;
                    }
                    if(mes==12){
                        mes = 3;
                        year = year+1;
                    }
                }else{
                    mes = mes+4;
                }
                var fechaActual = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
                return fechaActual;
            },
            generarFechaPosterior:function(){
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var fechaif = new Date();
                var mes0 = (fechaif.getMonth() +1);
                var mes = (fechaif.getMonth() +1);
                var year0 = fechaif.getFullYear();
                var year = fechaif.getFullYear();
                if(mes>=11){
                    if(mes==11){
                        mes = 2;
                        year = year+1;
                    }
                    if(mes==12){
                        mes = 3;
                        year = year+1;
                    }
                }else{
                    mes = mes+4;
                }
                var fechaActual = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
                return fechaPosterior;
            },
        verificarFechaReparto:function(fechaPedido,fechaReparto){
            if(fechaPedido==fechaReparto){
                return true;
            }else{
                return false;
            }
        },
        verificarFechaRepartoModAdd:function(fechaPedido,fechaReparto){
            if(fechaPedido==fechaReparto){
                return true;
            }else{
                return false;
            }
        },
        obtenerFechaDespacho:function(fecha){
            var dia = fecha.split("/")[0];
            var mes = fecha.split("/")[1]-1;
            var anio = fecha.split("/")[2];
            var dias=["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
            var dt = new Date(anio,mes,dia);

            if(dias[dt.getUTCDay()]=="viernes"){
                dt.setDate(dt.getDate()+3);
                return moment(dt.getTime()).format('DD/MM/YYYY');
            }
            else if(dias[dt.getUTCDay()]=="sabado"){
                dt.setDate(dt.getDate()+3);
                return moment(dt.getTime()).format('DD/MM/YYYY');
            }
            else{
                dt.setDate(dt.getDate()+1);
                return moment(dt.getTime()).format('DD/MM/YYYY');
            }
        },
        compararFechaActualCon:function(fecha){
            var dia = fecha.split("/")[0];
            var mes = fecha.split("/")[1]-1;
            var anio = fecha.split("/")[2];
            var dt = new Date(anio,mes,dia);
            var date = new Date();

            var comparar = "";

            if(dt>date){
                comparar = "mayor";
            }

            if(dt==date){
                comparar = "igual";
            }
            if(dt<date){
                comparar = "menor";
            }
            return comparar;
        },
        convertDateFormat:function(string) {
          var info = string.split('/');
          return info[2] + '/' + info[1] + '/' + info[0];
        },
        convertDateFormatConGuion:function(string) {
          var info = string.split('-');
          return info[2] + '/' + info[1] + '/' + info[0];
        },
        calcularEdad:function(fecha) {
            var hoy = new Date();
            var cumpleanos = new Date(this.convertDateFormat(fecha));
            var edad = hoy.getFullYear() - cumpleanos.getFullYear();
            var m = hoy.getMonth() - cumpleanos.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                edad--;
            }

            return edad;
        },

        replace2Point: function(cadena,cadReplace) {
            return cadena.replace("::", cadReplace).replace(/:/g, '');
        },
        listAddItemSelec: function(data,etiqueta){
            if(!etiqueta){
                etiqueta = "Seleccione";
            }
            for(var i = 0; i < data.length; i++){
                if(!data[i].Codigo.replace(/ /g, '')){
                    data[i].Descripcion = etiqueta;
                }
            }
            return data;
        },
        prepareDataIni: function(){
            var data = window.dataIni;
            /*****  CANALES ****/
            /* 
            var listaCanales = data.lstCanales;
            for(var i = 0; i < listaCanales.length; i++){
                listaCanales[i].Descripcion = this.replace2Point(listaCanales[i].Descripcion,' - ');
            }
            data.lstCanales = listaCanales;
            */
            /*****  MOTIVO RECLAMOS ****/
            /*
            var listaMotReclamo = data.lstMotivoRecl;
            for(var i = 0; i < listaMotReclamo.length; i++){
                listaMotReclamo[i].Descripcion = this.replace2Point(listaMotReclamo[i].Descripcion,' - ');
            }
            data.lstMotivoRecl = listaMotReclamo;
            
            */
            /*****  OFICINAS DE VENTAS ****/
            data.lstOfVtas = this.listAddItemSelec(data.lstOfVtas);                        
            /*****  LISTA DE MONEDAS ****/
            data.lstMoneda = this.listAddItemSelec(data.lstMoneda);
            /*****  LISTA DE BANCOS ****/
            data.lstGrpCond = this.listAddItemSelec(data.lstGrpCond);
            /*****  MOTIVOS NOTA DE DEBITO / CREDITO ****/
            data.lstMotPed = this.listAddItemSelec(data.lstMotPed);            
            /*****  BLOQUEOS DE FACTURA ****/
            data.lstBloFac = this.listAddItemSelec(data.lstBloFac);            
            /*****  BLOQUEOS DE ENTREGA ****/
            data.lstBloEnt = this.listAddItemSelec(data.lstBloEnt);
            /*****  TIPOS DE DESPACHO ****/
            data.lstCondExp = this.listAddItemSelec(data.lstCondExp);
            /*****  TIPOS DE VISITA ****/
            data.lstTipoVisita = this.listAddItemSelec(data.lstTipoVisita);
            
            /*****  TIPOS DE AMBIENTES ****/
            data.lstPreguntas[5].listaResp = this.listAddItemSelec(data.lstPreguntas[5].listaResp);
            /*****  MOTIVOS DE RECHAZO PRODUCTOS ****/
            data.lstMotivosRechazo = this.listAddItemSelec(data.lstMotivosRechazo);
                       
            window.dataIni = data;            
        },
        isNumeric: function(inputValue) {
            var format = /^[0-9]+$/;
            var rpta = (inputValue.match(format)) ? true : false;
            return rpta;
        },
        isEntero: function(numero){

            if (isNaN(numero)){
                var resul = false;
            }
            else{
                if (numero % 1 == 0) {
                    var resul = true;
                }
                else{
                    var resul = false;
                }
            }
            return resul
        },
        padLeft: function(nr, n, str) {
            return Array(n - String(nr).length + 1).join(str || '0') + nr;
        },
        roundNumber: function(num, scale) {
          if(!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale)  + "e-" + scale);
          } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if(+arr[1] + scale > 0) {
              sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
          }
        }, 
        validateIsRuc: function (ruc) {
            var rpta = (ruc.length === 11) ? "X" : "";
            return rpta;
        }            
    };
});