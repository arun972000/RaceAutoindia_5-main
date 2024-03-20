/* eslint-disable react/prop-types */

import { Image } from "react-bootstrap";
import { Url } from "../../url";
import LogoButtons from "../PostPage/PostLogoBtn";


const EventPage = ({ item }) => {
  // Check if item and item[0] are defined before accessing properties
  if (!item[0]) {
    console.error("Item or item[0] is undefined");
    return null; // or some fallback UI
  }



  return (
    <>
      <div key={item[0].id}>
        <h2>{item[0].title}</h2>
        <LogoButtons />
        <small className="text-muted">Date: {item[0].event_date}</small>
        <div style={{ width: "100%", maxWidth: "100%", textAlign: "center" }}>
          <Image
            src={`${Url}eventsUpload/${item[0].image_url}`}
            alt="Post Image"
            fluid
            className="my-3"
            style={{ aspectRatio: "16/9", objectFit: "fill" }}
          />

          <p style={{ width: "100%", maxWidth: "100%", textAlign: "justify" }}>
            {item[0].content}
          </p>
        </div>
      </div>
    </>
  );
};

export default EventPage;
