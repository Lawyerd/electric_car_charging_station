import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Row, Col, Button } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import base_url from "../data/base_url";
import axios from "axios";

function SearchBar({ return_station, getStation }) {
  const query_string = base_url;

  const location_options = [
    { name: "서울특별시 강남구", id: 1 },
    { name: "서울특별시 강동구", id: 2 },
    { name: "서울특별시 강북구", id: 3 },
    { name: "서울특별시 강서구", id: 4 },
    { name: "서울특별시 관악구", id: 5 },
    { name: "서울특별시 광진구", id: 6 },
    { name: "서울특별시 구로구", id: 7 },
    { name: "서울특별시 금천구", id: 8 },
    { name: "서울특별시 노원구", id: 9 },
    { name: "서울특별시 도봉구", id: 10 },
    { name: "서울특별시 동대문구", id: 11 },
    { name: "서울특별시 동작구", id: 12 },
    { name: "서울특별시 마포구", id: 13 },
    { name: "서울특별시 서대문구", id: 14 },
    { name: "서울특별시 서초구", id: 15 },
    { name: "서울특별시 성동구", id: 16 },
    { name: "서울특별시 성북구", id: 17 },
    { name: "서울특별시 송파구", id: 18 },
    { name: "서울특별시 양천구", id: 19 },
    { name: "서울특별시 영등포구", id: 20 },
    { name: "서울특별시 용산구", id: 21 },
    { name: "서울특별시 은평구", id: 22 },
    { name: "서울특별시 종로구", id: 23 },
    { name: "서울특별시 중구", id: 24 },
    { name: "서울특별시 중랑구", id: 25 },
  ];

  const charger_options = [
    {id:1,name: "B타입(5핀)"},
    {id:2,name: "C타입(5핀)"},
    {id:3,name: "BC타입(5핀)"},
    {id:4,name: "BC타입(7핀)"},
    {id:5,name: "DC차데모"},
    {id:6,name:" AC3상"},
    {id:7,name: "DC콤보"},
    {id:8,name: "DC차데모 + DC콤보"},
    {id:9,name: "DC차데모 + AC3상"},
    {id:10,name: "DC차데모 + DC콤보 + AC3상"},
  ];

  const [searchedName, setSearchedName] = useState("");

  const [stations, setStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [selected_location, setLocation] = useState([]);
  const [selected_charger, setCharger] = useState([]);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSelectLocation = (selectedList, selectedItem) => {
    setLocation(selectedList);
  };
  const onSelectCharger = (selectedList, selectedItem) => {
    setCharger(selectedList);
  };
  const onRemoveLocation = (selectedList, removedItem) => {
    setLocation(selectedList);

  };
  const onRemoveCharger = (selectedList, removedItem) => {
    setCharger(selectedList);

  };

  const handleChange = event => {
    var { value } = event.target;
    setSearchedName(value)
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setErrors(false);
    await new Promise(r => setTimeout(r, 1000));
  };

  useEffect(async() =>{
    const res_data = await axios.get(
          query_string + "type=1&option=서울"
        );
    const data = res_data.data.station;
    setAllStations(data);
  },[query_string])

  useEffect(() => {
    console.log("stations이 변경되었음으로 SearchBar에서 Map으로 전달");
    console.log(stations);
    getStation(stations);
  }, [success, getStation, stations]);

  useEffect(() => {
    if (submitting) {
      if (!errors) {
        setSubmitting(false);
        alert("Searching!");
        let filterd_array = allStations;
        console.log("start filtering")
        if(selected_location.length>0){
          let location_filterd = []
          for (const location of selected_location){
          location_filterd.push(...filterd_array.filter(station => 
          station.addr.includes(location.name)))
          }
          filterd_array = location_filterd
        }
        
        if(selected_charger.length>0){
          let charger_filterd = []
          for (const charger of selected_charger){
          charger_filterd.push(...filterd_array.filter(station => 
          station.cpTp===charger.id))
          }
          filterd_array = charger_filterd
        }

        if(searchedName.length>0){
          console.log(searchedName);
          filterd_array = filterd_array.filter(station => 
          station.csNm.includes(searchedName))
        }
        console.log(filterd_array)
        setStations(filterd_array);
        setSuccess(true);
      } else {
        alert(JSON.stringify(errors, null, 2));
        setSubmitting(false);
      }
    }
  }, [submitting, errors, stations, allStations, selected_charger, selected_location]);

  return (
    <div
      className="position-absolute w-75 mt-60"
      style={{
        top: "5%",
        left: "12.5%",
        marginTop: "25px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            placeholder="지역/충전소명 검색"
            aria-label="지역/충전소명 검색"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            vlaue={searchedName}
          />
          <Button type="submit" className="btn" disabled={submitting}>
            Search
          </Button>
        </InputGroup>
      </form>

      <Row className="mt-2" xs={2}>
        <Col>
          <div className="d-flex justify-content-center">
            <Multiselect
              options={location_options} // Options to display in the dropdown
              selectedValues={selected_location} // Preselected value to persist in dropdown
              onSelect={onSelectLocation} // Function will trigger on select event
              onRemove={onRemoveLocation} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              // singleSelect={true}
              placeholder="Location"
              style={{
                multiselectContainer: {
                  // To change css for dropdown options
                  width: "80%",
                  //   width: "40%",
                },
                searchBox: {
                  background: "white",
                },
              }}
            />
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-center">
            <Multiselect
              options={charger_options} // Options to display in the dropdown
              selectedValues={selected_charger} // Preselected value to persist in dropdown
              onSelect={onSelectCharger} // Function will trigger on select event
              onRemove={onRemoveCharger} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              // singleSelect={true}
              placeholder="Charger"
              style={{
                multiselectContainer: {
                  // To change css for dropdown options
                  width: "80%",
                  //   width: "40%",
                },
                searchBox: {
                  background: "white",
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;
