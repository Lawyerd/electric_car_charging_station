import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import icon_chademo from "../icon/chademo.png";
import icon_combo from "../icon/combo.png";
import icon_bc from "../icon/bctype.png";
import axios from "axios";

function Detail({ name, address, location, chargers, expected_time }) {
  const [cnt, setCnt] = useState([
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [all, setAll] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [extime, setExtime] = useState(0);

  async function getCurrentTime() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes(); // 분

    const base_date = year * 10000 + month * 100 + date;
    const base_time = hours * 100 + minutes;

    return [base_date, base_time];
  }

  async function isRainnny(lat, long, base_date, base_time) {
    var _base_time = Math.round(base_time / 100) * 100 - 200;
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=KMhCKx0%2B2s%2FD4mxtPlLVNVpCdKQwz7Os%2F6nayGki458lJbruAsjOA%2BaKj4sKpBNmgGwgZl87KQvBJn17E%2BsoEQ%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=${_base_time}&nx=${lat}&ny=${long}`;
    const res_data = await axios.get(url);
    var isRain = false;
    try {
      var weathers = res_data.data.response.body.items.item;
      var rain = weathers.filter(
        weather =>
          weather.category === "RN1" &&
          Number(weather.fcstTime) === _base_time + 200
      );
      isRain = rain[0].fcstValue !== "1.0mm 미만";
    } catch (error) {
      isRain = false;
      console.error(error);
    }
    return isRain;
  }

  async function getWaittime(time, isRain) {
    // const weather = isRain ? 2 : 1;
    const weather = 1;
    const url = `http://sub.dev-whoan.xyz/expect?time=${time}&weather=${weather}`;

    const res_data = await axios.get(url);
    console.log("대기 시간을 조회합니다.");
    const wait_time = res_data.data.expect;

    return wait_time;
    // return weather;
  }

  useEffect(async () => {
    var cnt_type10 = chargers.reduce(
      (cnt, element) => cnt + (10 === element.cpTp),
      0
    );

    var cnt_type7 = chargers.reduce(
      (cnt, element) => cnt + (7 === element.cpTp),
      0
    );

    var cnt_type3 = chargers.reduce(
      (cnt, element) => cnt + (3 === element.cpTp),
      0
    );

    var cnt_type10_empty = chargers.reduce(
      (cnt, element) => cnt + (10 === element.cpTp && element.cpStat !== 1),
      0
    );

    var cnt_type7_empty = chargers.reduce(
      (cnt, element) => cnt + (7 === element.cpTp && element.cpStat !== 1),
      0
    );

    var cnt_type3_empty = chargers.reduce(
      (cnt, element) => cnt + (3 === element.cpTp && element.cpStat !== 1),
      0
    );

    setCnt([
      [cnt_type10, cnt_type7, cnt_type3],
      [cnt_type10_empty, cnt_type7_empty, cnt_type3_empty],
    ]);
    setAll(cnt_type10_empty + cnt_type7_empty + cnt_type3_empty);
    console.log("set all: ", all);
    if (all !== 0) {
      console.log(cnt);
      console.log("all1 :", all);
      setExtime(0);
    } else {
      console.log(cnt);

      console.log("all2 :", all);

      console.log("사용가능한 충전기 없음, 탐색 시작");
      const lat = Math.round(location[0]);
      const long = Math.round(location[1]);
      const base_datetime = await getCurrentTime();
      const isRain = await isRainnny(
        lat,
        long,
        base_datetime[0],
        base_datetime[1]
      );
      console.log(isRain);

      // var isRain = false;

      const wait_time = await getWaittime(base_datetime[1], isRain);
      // console.log(wait_time);
      setExtime(wait_time);
    }
    setIsLoading(false);
  }, [chargers, all, isLoading, extime]);

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div
          className="position-absolute w-75"
          style={{
            bottom: "0",
            left: "12.5%",
          }}
        >
          <Card>
            <Card.Body>
              <Card.Title className="d-flex justify-content-center">
                {name}
              </Card.Title>
              <Card.Text className="d-flex justify-content-center fs-6">
                {address}
              </Card.Text>
              <Row>
                <Col>
                  <Row>
                    <p
                      className="d-flex justify-content-center"
                      style={{
                        fontSize: "10px",
                        margin: "2px",
                      }}
                    >
                      예상 대기 시간
                    </p>
                  </Row>
                  <Row>
                    <p className="d-flex justify-content-center">{extime}분</p>
                  </Row>
                </Col>
                <Col>
                  <Row className="d-flex justify-content-center">
                    차데모 {cnt[1][0]} /{cnt[0][0]}개
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center">
                      <img src={icon_chademo} width="30" alt="chademo"></img>
                    </div>
                  </Row>
                </Col>
                <Col>
                  <Row className="d-flex justify-content-center">
                    DC콤보 {cnt[1][1]} /{cnt[0][1]}개
                  </Row>
                  <Row>
                    <div className="d-flex justify-content-center">
                      <img src={icon_combo} width="30" alt="combo"></img>
                    </div>
                  </Row>
                </Col>
                <Col>
                  <Row className="d-flex justify-content-center">
                    BC타입 {cnt[1][2]} /{cnt[0][2]}개
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center">
                      <img src={icon_bc} width="30" alt="bc"></img>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Detail;
