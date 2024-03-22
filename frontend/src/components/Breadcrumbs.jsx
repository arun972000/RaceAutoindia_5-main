import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((item, index, array) => {
      const isLast = index === array.length - 1;
      const crumbLink = `/${item}`;
      return (
        <BreadcrumbItem key={item}>
          {isLast ? item : <Link to={crumbLink}>{item}</Link>}
        </BreadcrumbItem>
      );
    });

  return <Breadcrumb>{paths}</Breadcrumb>;
};

export default Breadcrumbs;
