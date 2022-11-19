import { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import { Fixed } from "../images/icons/icons";

const notes = [
  {
    id: 1,
    title: "Bob Jones",
    description: "Javascript",
  },
  {
    id: 12,
    title: "Bob Jasdasdones",
    description: "Javascript",
  },
  {
    id: 3,
    title: "Bobasdasdas Jones",
    description: "Javascrasdasdadaipt",
  },
  {
    id: 4,
    title: "sdasdasdasdasds",
    description: "Javascriasdasdasdasdasdpt",
  },
  {
    id: 6,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 7,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 8,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
  {
    id: 9,
    title: "asdasdasdasdnes",
    description: "asaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    title: "asdasdasdasdnes",
    description: "Javascaaaaaaaaaaaaaaaaipt",
  },
];

function Note() {
  return (
    <>
    {<NavBar />}
    

    </>
  );
}

export default Note;
