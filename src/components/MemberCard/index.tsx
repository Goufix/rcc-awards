import React from "react";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  name: string;
  points: number;
  color: string;
}

export default function MemberCard(props: Props) {
  return (
    <Card style={{ margin: "3px" }}>
      <Card.Header style={{ backgroundColor: props.color }}>
        <Row>
          <Col>
            <strong>{props.name}</strong>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <strong>
              {props.color === "#f5f500"
                ? "1°"
                : props.color === "#ccc"
                ? "2°"
                : props.color === "#f5bc00"
                ? "3°"
                : ""}
            </strong>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <p>
              <strong>Pontos: </strong>
              {props.points}
            </p>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <img
              src={`https://www.habbo.com.br/habbo-imaging/avatarimage?hb=image&user=${props.name}&headonly=1&direction=4&head_direction=4&action=&gesture=&size=m`}
              alt="Avatar"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
