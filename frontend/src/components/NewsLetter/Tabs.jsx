import { Nav, Container } from "react-bootstrap";

const YearSelectorComponent = () => {
  const year = [2024, 2023, 2022, 2021, 2020];
  const sliced = year.slice(0, 3);
  // const remainingYear=year.slice(3)
  return (
    <Container className=" p-3 mb-3">
      <Nav variant="tabs">
        {sliced.map((year) => (
          <Nav.Item key={year}>
            <Nav.Link eventKey={year}>{year}</Nav.Link>
          </Nav.Item>
        ))}
        {/* {remainingYear.length > 0 && (<Nav.Link eventKey={year}>More...</Nav.Link>)} */}
      </Nav>
    </Container>
  );
};

export default YearSelectorComponent;
