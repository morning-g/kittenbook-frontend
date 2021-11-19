import React from "react";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export default function PoliticaPrivacidad() {
    return (
        <Container maxWidth="md">
            <div>
                <br/>
                <h3 align="center">Política de privacidad del servicio</h3>
                <br/>
                <p>Última actualización: (12/10/2021)</p>
                <p>
                    OmegaWare ("nosotros", "nos" o "nuestro") opera{" "}
                    <a href="https://kittenbook.software"> https://kittenbook.software</a>{" "}
                    (el "Sitio"). Esta página le informa de nuestras políticas relativas a
                    la recopilación, el uso y la divulgación de la información personal
                    que recibimos de los usuarios del Sitio.
                </p>
                <p>
                    Utilizamos su información personal únicamente para proporcionar y
                    mejorar el sitio. Al utilizar el Sitio, usted acepta la recopilación y
                    el uso de la información de acuerdo con esta política.{" "}
                </p>{" "}
                <br/>
                <h5>Recogida y uso de la información</h5>
                <p>
                    {" "}
                    Al utilizar nuestro Sitio, es posible que le pidamos que nos
                    proporcione cierta información de identificación personal que pueda
                    utilizarse para ponerse en contacto con usted o identificarle. La
                    información personal identificable puede incluir, pero no se limita a
                    su nombre ("Información Personal").{" "}
                </p>{" "}
                <br/>
                <h5>Datos de registro</h5>
                <p>
                    Al igual que muchos operadores de sitios web, recogemos la información
                    que su navegador envía cada vez que visita nuestro sitio ("Datos de
                    registro").{" "}
                </p>
                <p>
                    Estos datos de registro pueden incluir información como la dirección
                    del Protocolo de Internet ("IP") de su ordenador, el tipo de
                    navegador, la versión del navegador, las páginas de nuestro sitio que
                    visita, la hora y la fecha de su visita, el tiempo que pasa en esas
                    páginas y otras estadísticas.{" "}
                </p>
                <p>
                    Además, podemos utilizar servicios de terceros, como Google Analytics,
                    que recogen, supervisan y analizan esta información.
                </p>
                <br/>
                <h5>Comunicaciones</h5>
                <p>
                    Podemos utilizar sus datos personales para ponernos en contacto con
                    usted con boletines informativos, material de marketing o promocional
                    y otra información que le pueda interesar.
                </p>
                <br/>
                <h5>Cookies</h5>
                <p>
                    Las cookies son archivos con una pequeña cantidad de datos, que pueden
                    incluir un identificador único anónimo. Las cookies se envían a su
                    navegador desde un sitio web y se almacenan en el disco duro de su
                    ordenador. Al igual que muchos sitios, utilizamos "cookies" para
                    recopilar información. Usted puede indicar a su navegador que rechace
                    todas las cookies o que le indique cuándo se envía una cookie. Sin
                    embargo, si no acepta las cookies, es posible que no pueda utilizar
                    algunas partes de nuestro Sitio.
                </p>
                <br/>
                <h5>Seguridad</h5>
                <p>
                    La seguridad de su información personal es importante para nosotros,
                    pero recuerde que ningún método de transmisión por Internet o de
                    almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por
                    utilizar medios comercialmente aceptables para proteger su Información
                    Personal, no podemos garantizar su absoluta seguridad.
                </p>
                <br/>
                <h5>Cambios a esta política de privacidad</h5>
                <p>
                    Esta Política de Privacidad es efectiva a partir de (12/10/2021) y
                    permanecerá en vigor excepto en lo que respecta a cualquier cambio en
                    sus disposiciones en el futuro, que entrará en vigor inmediatamente
                    después de ser publicado en esta página.{" "}
                </p>
                <p>
                    Nos reservamos el derecho de actualizar o cambiar nuestra Política de
                    Privacidad en cualquier momento y usted debe revisar esta Política de
                    Privacidad periódicamente. Su uso continuado del Servicio después de
                    que publiquemos cualquier modificación de la Política de Privacidad en
                    esta página constituirá su reconocimiento de las modificaciones y su
                    consentimiento para acatar y estar obligado por la Política de
                    Privacidad modificada.{" "}
                </p>
                <p>
                    Si realizamos algún cambio sustancial en esta Política de Privacidad,
                    se lo notificaremos a través de la dirección de correo electrónico que
                    nos haya proporcionado o colocando un aviso destacado en nuestro sitio
                    web.
                </p>
                <br/>
                <h5>Contacto</h5>
                <p>
                    Si tiene alguna pregunta sobre esta política de privacidad,{" "}
                    <Link href="/contacto" variant="body2">
                        póngase en contacto con nosotros.
                    </Link>
                </p>
            </div>
        </Container>
    );
}
