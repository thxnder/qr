sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";
	return {
		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		usuario: function () {
			return {
				Cuenta: undefined,
				Clave: undefined	
			}
		},
		ZonasGeneral: function() {
        	var listaZonas = [];
        	
        	listaZonas.push({ Codigo: "Z1", Descripcion: "ZONA 001"});
        	listaZonas.push({ Codigo: "Z2", Descripcion: "ZONA 002"});
        	listaZonas.push({ Codigo: "Z3", Descripcion: "ZONA 003"});
        	listaZonas.push({ Codigo: "Z4", Descripcion: "ZONA 004"});
        	listaZonas.push({ Codigo: "Z5", Descripcion: "ZONA 005"});
        	listaZonas.push({ Codigo: "Z6", Descripcion: "ZONA 006"});
        	
            return listaZonas;
        },
        ZonasSalida: function() {
        	var listaZonas = [];
        	
        	listaZonas.push({ Codigo: "ZE", Descripcion: "ELIMINAR"});
        	listaZonas.push({ Codigo: "ZD", Descripcion: "DESMEDRO"});
        	
            return listaZonas;
        },
        Muebles: function() {
            var listaMuebles = [];
            
        	listaMuebles.push({ Codigo: "", Descripcion: "NO ASIGNADO"});
        	listaMuebles.push({ Codigo: "M1", Descripcion: "MUEBLE 001"});
        	listaMuebles.push({ Codigo: "M2", Descripcion: "MUEBLE 002"});
        	listaMuebles.push({ Codigo: "M3", Descripcion: "MUEBLE 003"});
        	listaMuebles.push({ Codigo: "M4", Descripcion: "MUEBLE 004"});
        	listaMuebles.push({ Codigo: "M5", Descripcion: "MUEBLE 005"});
        	listaMuebles.push({ Codigo: "M6", Descripcion: "MUEBLE 006"});
        	
            return listaMuebles;
        },
        Secciones: function() {
            var listaSecciones = [];
            
        	listaSecciones.push({ Codigo: "", Descripcion: "NO ASIGNADO"});
        	listaSecciones.push({ Codigo: "S1", Descripcion: "SECCION 001"});
        	listaSecciones.push({ Codigo: "S2", Descripcion: "SECCION 002"});
        	listaSecciones.push({ Codigo: "S3", Descripcion: "SECCION 003"});
        	listaSecciones.push({ Codigo: "S4", Descripcion: "SECCION 004"});
        	listaSecciones.push({ Codigo: "S5", Descripcion: "SECCION 005"});
        	listaSecciones.push({ Codigo: "S6", Descripcion: "SECCION 006"});
        	
            return listaSecciones;
        },
        Materiales: function() {
            return [{
				CodMaterial: "MR3021",
				Material: "Material 001",
				Cantidad: 20,
				UM: "KG",
				NUbicaciones: 0,
				Ubicacion: "DUROTRIA01"
			}, {
				CodMaterial: "MR3025",
				Material: "Material 002",
				Cantidad: 5,
				UM: "KG",
				NUbicaciones: 0,
				Ubicacion: "DUROTRIA02"
			}, {
				CodMaterial: "MT3021",
				Material: "Material 003",
				Cantidad: 10,
				UM: "KG",
				NUbicaciones: 0,
				Ubicacion: "DUROTRIA03"
			}, {
				Seleccionado: false,
				CodMaterial: "MR3026",
				Material: "Material 004",
				Cantidad: 57,
				UM: "KG",
				NUbicaciones: 0,
				Ubicacion: "HIDRCOMB00"
			}, {
				Seleccionado: false,
				CodMaterial: "MR3077",
				Material: "Material 005",
				Cantidad: 32,
				UM: "KG",
				NUbicaciones: 0,
				Ubicacion: "HIDRSPA000"
			}];
        }
	};
});