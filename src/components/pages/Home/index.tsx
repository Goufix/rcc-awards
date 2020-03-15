import React, { useState, useEffect } from "react";
import tabletop from "tabletop";
import MemberCard from "../../MemberCard";
import SearchBar from "../../SearchBar";
import { Container, Row, Col } from "react-bootstrap";

interface Sheet {
  nick: string;
  whoVoted: string;
  STATUS: string;
}
interface UserData {
  nick: string;
  points: number;
}

export default function Home() {
  const [userData, setuserData] = useState<UserData[]>([]);
  const [filterNick, setFilterNick] = useState("");

  useEffect(() => {
    async function getSheetData() {
      await tabletop.init({
        key: "1FwYH3PzWkwC9FBMnp2xPRlrG-FY7kJUpl4oC1GpOllU",
        callback: (data: Sheet[]) => {
          const users = [...new Set(data.map(value => value.nick))];
          const userDataTemp: any[] = [];
          users.forEach(user => {
            const points = data
              .filter(line => line.STATUS === "APROVADO")
              .filter(line => line.nick === user).length;
            if (points === 0) {
              return;
            }
            userDataTemp.push({ nick: user, points });
          });
          setuserData(
            userDataTemp
              .filter(line => line.nick.includes(filterNick))
              .sort((a, b) => a.points - b.points)
              .reverse()
          );
        },
        simpleSheet: true
      });
    }
    getSheetData();
  }, [filterNick]);

  if (userData.length === 0) {
    return <h1> Loading...</h1>;
  }

  return (
    <>
      <Container>
        <SearchBar handleChange={e => setFilterNick(e.currentTarget.value)} />
        <Row>
          {userData.map((user, index) => {
            return (
              <Col sm={4} key={index}>
                <MemberCard
                  key={index}
                  name={user.nick}
                  points={user.points}
                  color={
                    index === 0
                      ? "#f5f500"
                      : index === 1
                      ? "#ccc"
                      : index === 2
                      ? "#f5bc00"
                      : "#f5f5f5"
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
