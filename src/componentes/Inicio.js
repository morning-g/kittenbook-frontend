//<Resumen>
//Clase Inicio la cual nos aparece al ingersar a la página web
//Contiene una funciones para las asignacion de las imagenes que se muestran el interfaz
//</Resumen>
//<para> En esta clase se encuentra informacion del inicio junto con la asignacion
//de imagenes
//<Autor>Omegaware</Autor>
//<Fecha de creacion> 11 de octubre de 2021 </Fecha de creacion>

//**********************Imports*************************
import React from "react";

import Container from "@mui/material/Container";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Carousel from "react-bootstrap/Carousel";
//*******************************************************

//Funcion que asigna las imagenes dentro del interfaz de inicio
function srcSet(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

//Creacion de una variable constante la cual contiene todas las imagenes utilizadas
const itemData = [
  {
    img: "https://images.pexels.com/photos/7517/animal-sitting-animals-inside.jpg?auto=compress&cs=tinysrgb&h=350",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://i1.pickpik.com/photos/815/460/1004/cat-eyes-cat-s-eyes-face-thumb.jpg",
    title: "Burger",
  },
  {
    img: "https://i1.pickpik.com/photos/224/711/745/cat-animal-pet-mieze-thumb.jpg",
    title: "Camera",
  },
  {
    img: "https://c.pxhere.com/photos/6d/ee/cat_cat_portrait_animal_cat's_eyes_domestic_cat_eyes_head_cute-1055378.jpg!s",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://www.guideposts.org/sites/default/files/styles/bynder_webimage/public/story/blackcat_marquee_0.jpg",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://images.pexels.com/photos/416088/pexels-photo-416088.jpeg?auto=compress&cs=tinysrgb&h=350",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c4.wallpaperflare.com/wallpaper/969/866/525/cat-look-muzzle-black-background-wallpaper-thumb.jpg",
    title: "Basketball",
  },
  {
    img: "https://pixnio.com/free-images/2017/03/01/2017-03-01-16-28-35.jpg",
    title: "Fern",
  },
  {
    img: "https://c4.wallpaperflare.com/wallpaper/839/157/113/cat-gravel-gray-wallpaper-thumb.jpg",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://c4.wallpaperflare.com/wallpaper/648/247/811/cat-animals-photography-wallpaper-thumb.jpg",
    title: "Tomato basil",
  },
  {
    img: "https://c4.wallpaperflare.com/wallpaper/678/169/152/animals-hands-cat-wallpaper-thumb.jpg",
    title: "Sea star",
  },
  {
    img: "https://c.pxhere.com/photos/94/66/cat_feline_pet_playful_portrait_friendship_cute_cat_black-582217.jpg!s",
    title: "Bike",
    cols: 2,
  },
];

//Funcion para determinar el estandar de las imagenes, es decir,
//la medida que tendran las imagenes
function StandardImageList() {
  return (
    <ImageList variant="quilted" cols={4} rowHeight={121}>
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcSet(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

//Funcion principal en la que se colocan las imagenes en forma de carousel, es decir,
//hacen que se visualicen las imagenes en forma de banner y estas pueden ir cambiando
//y cada una de las imagenes se les agrega una poqueña informacion.
export default function Inicio() {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <br />
        <Carousel>
          {/*Primera imagen del grupo del banner*/}
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wallpapercave.com/wp/1WXEEWF.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>1</h3>
              <p>
                {/*Información de la primera imagen*/}
                Hay más de 500 millones de gatos domésticos en el mundo, con
                aproximadamente 40 razas reconocidas.
              </p>
            </Carousel.Caption>
            {/*Segunda imagen del grupo del banner*/}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.redd.it/vpfzenk5rac31.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>2</h3>
              <p>
                {/*Información de la segunda imagen*/}
                Un gato no puede bajar de cabeza de un árbol porque todas las
                garras de un gato apuntan en la misma dirección. Para bajar de
                un árbol, un gato debe retroceder.
              </p>
            </Carousel.Caption>
            {/*Tercera imagen del grupo del banner*/}
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
                {/*Información de la tercera imagen*/}A diferencia de los
                perros, los gatos no son golosos. Los científicos creen que esto
                se debe a una mutación en un receptor gustativo clave.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br />
        <StandardImageList />
      </Container>
    </React.Fragment>
  );
}
