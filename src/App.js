import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  const getPosts = async () => {
    let initialData = [];

    for (let i = 0; i < 6; i++) {
      const res = await fetch("https://random.dog/woof.json");
      const response = await res.json();

      if (isImage(response.url)) {
        initialData.push(response);
        if (i == 5) setData(initialData);
      } else i--;
    }
  };

  const addToFavoritesHandler = (item) => {
    let currentStorage = [];
    if (localStorage.getItem("dogImages"))
      currentStorage = JSON.parse(localStorage.getItem("dogImages"));

    currentStorage.push(item);

    localStorage.setItem("dogImages", JSON.stringify(currentStorage));
  };

  const refreshHandler = () => {
    setData([]);
    getPosts();
  };

  return (
    <Container>
      <Row>
        {data.length > 0 &&
          data.map((item, index) => (
            <Col md={4} sm={6} className="mb-4" key={index}>
              <Cards
                imgUrl={item.url}
                onAddToFavorites={() => addToFavoritesHandler(item)}
              />
            </Col>
          ))}
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={refreshHandler}>
            Refresh
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
