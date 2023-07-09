import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Box({
  children,
  title,
  subtitle,
  link,
  url,
  linkTwo,
  onClick,
}) {
  return (
    <Card style={{ height: "12rem" }} className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{children}</Card.Text>
        {link === "Em aberto" ? (
          <Card.Link>
            <Link to={url}>{link}</Link>
          </Card.Link>
        ) : (
          <Card.Text>Questionário Respondido!</Card.Text>
        )}

        <Card.Link>
          <div onClick={onClick}>{linkTwo}</div>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
