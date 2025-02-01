import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  WMSTileLayer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet"; // Componentes de react-leaflet

import "leaflet/dist/leaflet.css"; // Importa los estilos de Leaflet
import "../components/Mapa.css";

import Cataleg from "./catalogo.component/Cataleg";
import BaseMapSelector from "./baseMapSelector.component/BaseMapSelector.jsx";

import webService from "../utils/dataReferences/webService.json"; // Este archivo contiene las URLs de los WMS
import basemapsjson from "../utils/dataReferences/basemaps.json";

import { QueryContext } from "../context/query.context.jsx";

const Mapa = () => {
  const [isCatalogVisible, setCatalogVisible] = useState(false);
  const [layers, setLayers] = useState([]);
  const [baseMapM, setBaseMapM] = useState([]);

  const { selectedMapsC } = useContext(QueryContext);
  const { baseMap } = useContext(QueryContext);

  const baseMapsLayers = basemapsjson.baseMapsWmsLayers;

  const mapas = webService.wmsLayers;

  const flagCatalog = () => {
    setCatalogVisible(!isCatalogVisible);
  };

  useEffect(() => {
    const activatedLayers = mapas.filter((item) => selectedMapsC[item.layer]);

    setLayers(activatedLayers);
  }, [selectedMapsC]);

  useEffect(() => {
    const activatedBaseMap = baseMapsLayers.find(
      (item) => item.layer === baseMap
    );

    setBaseMapM(activatedBaseMap);
  }, [baseMap]);

  return (
    <div className="Map">
      <div className="container-nav">
        <div className="Navbar" style={{ color: "black", height: "70px" }}>
          <div className="icon-navbar">
            <ion-icon name="trail-sign-outline"></ion-icon>
          </div>{" "}
          Visor
        </div>
      </div>
      <button
        className="close-btn"
        onClick={flagCatalog}
        style={{ left: isCatalogVisible ? "430px" : "15px" }}
      >
        {isCatalogVisible ? "<" : ">"}
      </button>

      {isCatalogVisible && <Cataleg />}
      <BaseMapSelector />

      <MapContainer
        center={[41.345713, 2.035808]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        <WMSTileLayer
          key={baseMapM.layer}
          url={baseMapM.url}
          layers={baseMapM.layer}
          format="image/png"
          transparent={true}
          zIndex={0}
        />
        {layers.map((layer) => (
          <WMSTileLayer
            key={layer.layer}
            url={layer.url}
            layers={layer.layer}
            format="image/png"
            transparent={true}
            attribution="Grupo 2 Màster en Geoinformació UAB | ICGC"
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
