import React from "react";

import Container from "@mui/material/Container";

export default function Ubicaciones(props) {
  return (
    <Container maxWidth="sm">
      <br />
        <h1 align="center">Nuestras ubicaciones</h1>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Instituto%20Tecnologia%20de%20la%20Laguna&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
