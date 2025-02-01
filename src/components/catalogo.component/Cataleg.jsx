import React, { useState, useContext, useEffect } from "react";

import "../catalogo.component/Cataleg.css";
import webService from "../../utils/dataReferences/webService.json";

import { QueryContext } from "../../context/query.context.jsx";

const Cataleg = () => {
  const { setSelectedMapsC } = useContext(QueryContext);
  const [box, setBox] = useState([]);
  const [openForms, setOpenForms] = useState({});
  const mapas = webService.wmsLayers;

  const [selectedMaps, setSelectedMaps] = useState(
    mapas.reduce((acc, mapa) => {
      acc[mapa.layer] = false;
      return acc;
    }, {})
  );

  const handleCheckboxChange = (layer) => {
    setSelectedMaps((prevState) => ({
      ...prevState,
      [layer]: !prevState[layer],
    }));
  };

  const toggleForm = (boxSelected) => {
    setOpenForms((prevState) => ({
      ...prevState,
      [boxSelected]: !prevState[boxSelected],
    }));
  };

  useEffect(() => {
    setSelectedMapsC(selectedMaps);
  }, [selectedMaps]);

  useEffect(() => {
    const list_box = [];
    mapas.forEach((item) => {
      if (!list_box.includes(item.box)) {
        list_box.push(item.box);
      }
    });
    setBox(list_box);
  }, []);

  return (
    <div className="cataleg">
      <h2>Catàleg</h2>

      <div
        className="container-over"
        style={{ overflowY: "auto", paddingRight: "20px" }}
      >
        {box.map((item) => (
          <div key={item}>
            <button className="cataleg-button" onClick={() => toggleForm(item)}>
              <div>{item}</div>
            </button>
            {openForms[item] && ( // Mostrar el formulario solo si está abierto
              <div className="cataleg-form">
                <form>
                  {mapas.map((mapa) =>
                    item === mapa.box ? (
                      <div key={mapa.layer} className="checkbox-container">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedMaps[mapa.layer]}
                            onChange={() => handleCheckboxChange(mapa.layer)}
                            style={{ marginRight: "10px" }}
                          />
                          {mapa.title}
                        </label>
                      </div>
                    ) : null
                  )}
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cataleg;
