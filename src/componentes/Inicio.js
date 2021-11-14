import React from "react";

import Container from "@mui/material/Container";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Carousel from "react-bootstrap/Carousel";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function StandardImageList() {
    return (
        <ImageList
            variant="quilted"
            cols={4}
            rowHeight={121}>
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://s3.amazonaws.com/petcentral.com/wp-content/uploads/2016/09/01160419/black-cat-1.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555295760/shape/mentalfloss/istock_70404513_small.jpg',
        title: 'Burger',
    },
    {
        img: 'https://1.bp.blogspot.com/-uRzGQMQMT3c/XboZEzxfAYI/AAAAAAAAAW8/x5ih3hNW9xcIjdu-RxftDnd4QGIgwK69QCEwYBhgL/s1600/0.jpg',
        title: 'Camera',
    },
    {
        img: 'https://myminipanther.com/wp-content/uploads/2020/09/117638244_1186002988430051_1773905469144139956_o.jpg',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://www.guideposts.org/sites/default/files/styles/bynder_webimage/public/story/blackcat_marquee_0.jpg',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'http://cdn0.wideopenpets.com/wp-content/uploads/2018/02/AdobeStock_137892129.jpeg',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://www.petmoo.com/wp-content/uploads/2018/07/Black-Cat-Breed-990x556.jpg',
        title: 'Basketball',
    },
    {
        img: 'http://cdn0.wideopenpets.com/wp-content/uploads/2018/02/bigstock-Cute-Black-Cat-Under-A-Newspap-5003454.jpg',
        title: 'Fern',
    },
    {
        img: 'https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/VhMpQkPilil163b9e/young-black-cat-is-resting-in-the-forest_vogteh1pig_thumbnail-1080_01.png',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://fthmb.tqn.com/Ltj-tDlYoAgVB_IAI43_ORK75mc=/1920x1277/filters:fill(auto,1)/egypt-59b7224c6f53ba00114fa958-59bae4346f53ba0010439047.jpg',
        title: 'Tomato basil',
    },
    {
        img: 'https://1.bp.blogspot.com/-oEKOysdY6R8/UPO89obgTaI/AAAAAAAAAhU/a-TTBiptDXA/s1600/back+cat+06.jpg',
        title: 'Sea star',
    },
    {
        img: 'https://www.rover.com/blog/wp-content/uploads/2019/12/black-cat-outside-unsplash-min.jpg',
        title: 'Bike',
        cols: 2,
    },
];

export default function Inicio(props) {
    return (
        <React.Fragment>
            <Container maxWidth="md">
                <br/>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://wallpapercave.com/wp/1WXEEWF.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>1</h3>
                            <p>Hay más de 500 millones de gatos domésticos en el mundo, con aproximadamente 40 razas
                                reconocidas.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.redd.it/vpfzenk5rac31.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>2</h3>
                            <p>Un gato no puede bajar de cabeza de un árbol porque todas las garras de un gato apuntan
                                en la
                                misma dirección. Para bajar de un árbol, un gato debe retroceder.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://wallpaperfx.com/view_image/black-and-white-cat-1920x1080-wallpaper-16598.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>3</h3>
                            <p>
                                A diferencia de los perros, los gatos no son golosos. Los científicos creen que esto se
                                debe
                                a una mutación en un receptor gustativo clave.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br/>
                <StandardImageList/>
            </Container>
        </React.Fragment>
    );
}
