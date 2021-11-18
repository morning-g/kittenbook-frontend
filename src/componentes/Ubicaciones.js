import React from "react";

import Container from "@mui/material/Container";

export default function Ubicaciones() {
    return (
        <Container maxWidth="sm">
            <br/>
            <h3 align="center">Nuestras ubicaciones</h3>
            <div>
                <div>
                    <iframe
                        title={"Ubicaciones Tec"}
                        width="600"
                        height="500"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=Instituto%20Tecnologia%20de%20la%20Laguna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                    ></iframe>
                </div>
            </div>
        </Container>
    );
}
