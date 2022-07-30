import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Cards({ imgUrl, onAddToFavorites }) {
  return (
    <Card>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Button variant="primary" onClick={onAddToFavorites}>
          add to favorites
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
