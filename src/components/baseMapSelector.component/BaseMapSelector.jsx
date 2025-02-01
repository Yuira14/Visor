import React, { useContext } from "react";
import "../baseMapSelector.component/BaseMapSelector.css";
import basemaps from "../../utils/dataReferences/basemaps.json";
import { QueryContext } from "../../context/query.context.jsx";

const BaseMapSelector = () => {
  const baseMapsLayers = basemaps.baseMapsWmsLayers;
  const { baseMap, setBaseMap } = useContext(QueryContext);
  const handleClickBasemap = (layer) => {
    setBaseMap(layer);
  };
  return (
    <div className="basemap">
      <div className="basemap-container">
        {baseMapsLayers.map((item) => (
          <div
            key={item.layer}
            className={`basemap-item ${baseMap === item.layer ? "active" : ""}`}
          >
            <button
              className="basemap-button"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleClickBasemap(item.layer)}
            >
              <span className="basemap-title">{item.title}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseMapSelector;
