import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import icon_chademo from "../icon/chademo.png";
import icon_combo from "../icon/combo.png";
import icon_bc from "../icon/bctype.png";

function Detail({ name, address, chargers }) {
  const cnt_type10 = chargers.reduce(
    (cnt, element) => cnt + (10 === element.cpTp),
    0
  );
  const cnt_type7 = chargers.reduce(
    (cnt, element) => cnt + (7 === element.cpTp),
    0
  );
  const cnt_type3 = chargers.reduce(
    (cnt, element) => cnt + (3 === element.cpTp),
    0
  );

  return (
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
                <p className="d-flex justify-content-center">N분</p>
              </Row>
            </Col>
            <Col>
              <Row className="d-flex justify-content-center">
                차데모 {cnt_type10}개
              </Row>
              <Row className="d-flex justify-content-center">
                <div className="d-flex justify-content-center">
                  <img src={icon_chademo} width="30" alt="chademo"></img>
                </div>
              </Row>
            </Col>
            <Col>
              <Row className="d-flex justify-content-center">
                DC콤보 {cnt_type7}개
              </Row>
              <Row>
                <div className="d-flex justify-content-center">
                  <img src={icon_combo} width="30" alt="combo"></img>
                </div>
              </Row>
            </Col>
            <Col>
              <Row className="d-flex justify-content-center">
                BC타입{cnt_type3}개
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
  );
}

export default Detail;
