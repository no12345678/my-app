import React, { useState } from "react";

const Headline = () => {
  const [greeting, setGreeting] = useState("Hello Function Component!");

  return <h1>{greeting}</h1>;
};

export default Headline;
