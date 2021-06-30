// import "./App.css";
import { Link } from "react-scroll";
import { useState } from "react";
import MainInfo from "./MainInfo.js";

function Try() {
  const [selectedScrollElement, setSelectedScrollElement] = useState(0);

  const scrollElements = [
    {
      elementID: "home",
      title: "Home",
    },
    {
      elementID: "about",
      title: "About",
    },
    {
      elementID: "contact",
      title: "Contact",
    },
    {
      elementID: "service",
      title: "Service",
    },
  ];
  const useScrollElementsArray = true;

  const selectScrollElement = (index) => {
    setSelectedScrollElement(index);
  };

  if (useScrollElementsArray) {
    return (
      <>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-around",
            flexDirection: "column",
            position: "fixed",
            right: 0,
          }}
        >
          {scrollElements.map((element, index) => {
            return (
              <div key={index}>
                <li>
                  <Link to={element.elementID} spy={true} smooth={true}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: "red",
                          borderRadius: "50%",
                          marginRight: 5,
                          position: "relative",
                          cursor: "pointer",
                        }}
                        className={
                          selectedScrollElement === index
                            ? "selectedScrollElement"
                            : ""
                        }
                        onClick={() => selectScrollElement(index)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}{" "}
                        </div>
                      </div>
                      {element.title}{" "}
                    </div>
                  </Link>
                </li>
                {index + 1 < scrollElements.length ? (
                  <div
                    style={{
                      width: 20,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 2,
                        height: "90%",
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                ) : null}{" "}
              </div>
            );
          })}{" "}
        </ul>
        {/* <div id="home" style={{ height: "100vh" }}>
          <h1>This is Home section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div> */}
        <div className="pageContainer" id="home">
          <MainInfo
            submitFormClicked={() => {console.log("")}}
            infra={null}
            case={null}
            caseID={null}
          />
        </div>
        <div id="about" style={{ height: "100vh" }}>
          <h1>This is About section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
        <div id="contact" style={{ height: "100vh" }}>
          <h1>This is Contact section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
        <div id="service" style={{ height: "100vh" }}>
          <h1>This is Service section</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus. Totam nihil similique a repellat minus dolor amet quasi.
          Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
        </div>
      </>
    );
  }

  return (
    <>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "space-around",
          flexDirection: "column",
          position: "fixed",
          right: 0,
        }}
      >
        <li>
          <Link activeClass="node" to="home" spy={true} smooth={true}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginRight: 5,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  1
                </div>
              </div>
              Home2
            </div>
          </Link>
        </li>
        <div
          style={{
            width: 20,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 2,
              height: "90%",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <li>
          <Link to="about" activeClass="node" spy={true} smooth={true}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginRight: 5,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  2
                </div>
              </div>
              About
            </div>
          </Link>
        </li>
        <div
          style={{
            width: 20,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 2,
              height: "90%",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <li>
          <Link to="contact" activeClass="node" spy={true} smooth={true}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginRight: 5,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  3
                </div>
              </div>
              Contact
            </div>
          </Link>
        </li>
        <div
          style={{
            width: 20,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 2,
              height: "90%",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <li>
          <Link to="service" activeClass="node" spy={true} smooth={true}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  marginRight: 5,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  4
                </div>
              </div>
              Service
            </div>
          </Link>
        </li>
      </ul>
      <div id="home" style={{ height: "100vh" }}>
        <h1>This is Home section</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
        repellendus. Totam nihil similique a repellat minus dolor amet quasi.
        Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
      </div>
      <div id="about" style={{ height: "100vh" }}>
        <h1>This is About section</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
        repellendus. Totam nihil similique a repellat minus dolor amet quasi.
        Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
      </div>
      <div id="contact" style={{ height: "100vh" }}>
        <h1>This is Contact section</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
        repellendus. Totam nihil similique a repellat minus dolor amet quasi.
        Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
      </div>
      <div id="service" style={{ height: "100vh" }}>
        <h1>This is Service section</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
        repellendus. Totam nihil similique a repellat minus dolor amet quasi.
        Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
      </div>
    </>
  );
}

export default Try;
