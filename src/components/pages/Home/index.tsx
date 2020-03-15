import React, { useState, useEffect } from "react";
import tabletop from "tabletop";
import MemberCard from "../../MemberCard";
import SearchBar from "../../SearchBar";
import { Container, Row, Col } from "react-bootstrap";

interface Sheet {
  Nick: string;
  whoVoted: string;
  STATUS: string;
}
interface UserData {
  Nick: string;
  points: number;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState<UserData[]>([]);
  const [filterNick, setFilterNick] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    async function getSheetData() {
      await tabletop.init({
        key: "1FwYH3PzWkwC9FBMnp2xPRlrG-FY7kJUpl4oC1GpOllU",
        callback: (data: Sheet[]) => {
          const users = [
            ...new Set(data.map(value => value.Nick.toLowerCase()))
          ];
          const userDataTemp: any[] = [];
          setTotalPoints(
            data.filter(line => line.STATUS === "APROVADO").length
          );
          users.forEach(user => {
            const points = data
              .filter(line => line.STATUS === "APROVADO")
              .filter(line => line.Nick.toLowerCase() === user).length;
            if (points === 0) {
              return;
            }
            userDataTemp.push({ Nick: user, points });
          });
          if (loading) {
            setLoading(false);
          }
          setuserData(
            userDataTemp
              .filter(line => line.Nick.includes(filterNick))
              .sort((a, b) => a.points - b.points)
              .reverse()
          );
        },
        simpleSheet: true
      });
    }
    getSheetData();
  }, [filterNick, loading]);

  if (loading) {
    return <h1> Loading...</h1>;
  }

  return (
    <>
      <Container>
        <SearchBar
          handleChange={e => setFilterNick(e.currentTarget.value.toLowerCase())}
        />
        <h2>
          Os policiais já conseguiram <strong>{totalPoints}</strong> votos!
        </h2>
        <br />
        <Row>
          {userData.map((user, index) => {
            return (
              <Col sm={4} key={index}>
                <MemberCard
                  key={index}
                  name={user.Nick}
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
