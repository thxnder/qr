sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/app",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "pe/com/seidor/sap/decor/ventas/services/userServices"
], function(Controller, JSONModel, app, Button, Dialog, Text,MessageBox,MessageToast,UIComponent,userServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.App", {
        onInit: function() {
            /*var oEventBus = sap.ui.core.Component.getOwnerComponentFor(this.getView()).getEventBus();
        oEventBus.subscribe(
                "MyEvent",
                this.goHome,
                this
        );*/   
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onMyEvent: function(sChannelId, sEventId, oData){
        console.log(oData.dataKey1);
        },
        onRouteMatched: function (oEvent) {
            //Inicio Eliminar Event Zoom
            /*$(function () {
              if (!(/iPad|iPhone|iPod/.test(navigator.userAgent))) return
              $(document.head).append(
                '<style>*{cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}</style>'
              )
              $(window).on('gesturestart', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('gesturechange', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('gestureend', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSGestureStart', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSGestureEnd', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSGestureTap', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSGestureHold', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSGestureChange', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              $(window).on('MSInertiaStart', function (evt) {
                if (evt.originalEvent.scale !== 1) {
                  evt.originalEvent.preventDefault()
                  document.body.style.transform = 'scale(1)'
                }
              })
              
            })*/
                                //End Eliminar Event Zoom
            var oData = {
                tituloPrincipal:"",

                infoUsuario: {
                    "Usuario": window.dataIni.person.Uname,
                    "extcomp1007": window.dataIni.person.PerNr,
                    "extcomp1008": window.dataIni.person.Descripcion,
                    "extcomp1009": window.dataIni.person.OrgVentas,
                    "extcomp1010": window.dataIni.person.CanalDist,
                    "extcomp1011": window.dataIni.person.Email,
                    "curPassword": "",
                    "newPassword": "",
                    "newPassword2": ""
                }
            
            };
            this.getView().setModel(new JSONModel(oData));
            this.getView().getModel().setProperty("/usuarioWeb", window.dataIni.person.UsuarioWEB);

            /*var self = this;
            setInterval(function(){ 
                        var OfVentas = window.dataIni.person.OfVentas;
                        var datosUser = self.getView().getModel().getProperty("/infoUsuario");
                        var result = userServices.cambioPassword(datosUser, OfVentas);
                        if (result.c === "s") {
                            
                        } else {
                            //sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                        }
                     }, 60000);*/
        },
        goHome:function(){
            window.IsDocNuevo = false;
            window.IsDocModificar = false;
            window.IsDocVisualizar = false;
            window.IsDocInstalacion = false;
            sessionStorage.clear();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },

        logout:function(){
             var bOpenInNewWindow= false; //false if you want it in the same window
                localStorage.clear();
                sessionStorage.clear();
                sap.m.URLHelper.redirect("index.html", bOpenInNewWindow);
        },
        goUser:function(){
            
        }
    });
});