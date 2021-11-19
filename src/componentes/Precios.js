import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

const tiers = [
    {
        title: "Gatito negro",
        price: "0",
        description: [
            "Productividad básica",
            "Caja de arena",
            "Leche diaria",
            "Estambre incluido",
        ],
        buttonText: "Elegir",
        buttonVariant: "outlined",
    },
    {
        title: "Gato negro",
        subheader: "Sugerido",
        price: "111",
        description: [
            "Productividad moderada",
            "Salidas permitidas",
            "Ratones incluidos",
            "Árbol propio",
        ],
        buttonText: "Elegir",
        buttonVariant: "contained",
    },
    {
        title: "Pantera negra",
        price: "279",
        description: [
            "Productividad máxima",
            "Sardinas semanales",
            "Contacto con otras camadas",
            "Sabana propia",
        ],
        buttonText: "Contáctanos",
        buttonVariant: "outlined",
    },
];

function Precios() {
    return (
        <React.Fragment>
            <GlobalStyles
                styles={{ul: {margin: 0, padding: 0, listStyle: "none"}}}
            />
            <CssBaseline/>
            {/* Hero unit */}
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{pt: 8, pb: 6}}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Precios
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Productividad. Aprendizaje. Planificación.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === "Enterprise" ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{align: "center"}}
                                    action={tier.title === "Pro" ? <StarIcon/> : null}
                                    subheaderTypographyProps={{
                                        align: "center",
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            component="h2"
                                            variant="h3"
                                            color="text.primary"
                                        >
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mes
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <Precios/>;
}
