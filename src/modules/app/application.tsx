import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { Draw } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";

useGeographic();

const drawingVectorSource = new VectorSource();
const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 13 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: drawingVectorSource,
      style: [
        new Style({
          image: new Circle({
            radius: 10,
            stroke: new Stroke({ color: "white", width: 2 }),
            fill: new Fill({ color: "blue" }),
          }),
        }),
        new Style({
          image: new Circle({
            radius: 12,
            stroke: new Stroke({ color: "black", width: 2 }),
          }),
        }),
      ],
    }),
  ],
});

interface DrawPointButtonProps {
  map: Map;
  source: VectorSource;
}

function DrawPointButton({ map, source }: DrawPointButtonProps) {
  function handleClick() {
    map.addInteraction(new Draw({ type: "Point", source }));
  }

  return <button onClick={handleClick}>Add point</button>;
}

export function Application() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);
  return (
    <>
      <DrawPointButton map={map} source={drawingVectorSource} />
      <div ref={mapRef}></div>
    </>
  );
}
