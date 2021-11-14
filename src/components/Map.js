import React, { useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
// import { InputGroup, FormControl, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Detail from "./Detail";

function Map() {
  const { naver } = window;
  const markers = [];
  const [station, setStation] = useState({
    addr: "",
    chargeTp: 0,
    cpId: 0,
    cpNm: "",
    cpStat: 0,
    cpTp: 0,
    csId: 0,
    csNm: "",
    lat: 0,
    longi: 0,
    statUpdateDatetime: "",
  });
  const stationToMarker = station => {
    return (
      <Marker
        key={station._id}
        position={new naver.maps.LatLng(station.lat, station.longi)}
        // animation={2}
        onClick={() => {
          setIsSelected(true);
          setStation(station);
        }}
      />
    );
  };

  useEffect(() => {}, [station]);
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const getStations = stations => {
    console.log("stations 부모로 가져옴");
    console.log(stations);
    setStations(stations);
    setIsLoading(false);
    stations.forEach(station => {
      markers.push(stationToMarker(station));
    });
  };
  // useEffect((console.log(stations)) => {

  // }, stations);

  return (
    <div className="s">
      <RenderAfterNavermapsLoaded
        ncpClientId={"rtzaeydulr"} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
        className="position-relative"
      >
        <NaverMap
          mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
          style={{
            width: "100%", // 네이버지도 가로 길이
            height: "93vh", // 네이버지도 세로 길이
          }}
          defaultCenter={{ lat: 37.554722, lng: 126.970833 }} // 지도 초기 위치
          defaultZoom={13} // 지도 초기 확대 배율
        >
          {isLoading ? <div /> : stations.map(x => stationToMarker(x))}
        </NaverMap>

        <SearchBar
          //   className="ml-3 position-absolute w-50"
          style={{
            top: "15%",
            left: "12.5%",
          }}
          station={stations}
          getStation={getStations}
        ></SearchBar>

        {isSelected ? (
          <Detail name={station.csNm} address={station.addr} />
        ) : (
          <div />
        )}
      </RenderAfterNavermapsLoaded>
    </div>
  );
}

export default Map;
