import "./App.css";
import Headline from "./Main.js";
import BottomBar from "./BottomBar.js";
import MainInfo from "./MainInfo.js";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { useState, useEffect, useRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  const [submitFormClicked, setSubmitFormClicked] = useState(null);
  const [loadingInfra, setLoadingInfra] = useState(true);
  const [loadingCase, setLoadingCase] = useState(true);
  const [infra, setInfra] = useState(null);
  const [casesFromFB, setCasesFromFB] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [newCase, setNewCase] = useState(false);

  const [selectedScrollElement, setSelectedScrollElement] = useState(0);
  const mainInfoRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);

  const scrollElements = [
    {
      elementRef: mainInfoRef,
      title: "Home",
    },
    {
      elementRef: aboutRef,
      title: "About",
    },
    {
      elementRef: contactRef,
      title: "Contact",
    },
    {
      elementRef: serviceRef,
      title: "Service",
    },
  ];

  const selectScrollElement = (index) => {
    setSelectedScrollElement(index);
  };

  useEffect(() => {
    fetch("http://localhost:3000/screen/getInfraFromFB").then(
      async (result) => {
        if (result) {
          const data = await result.json();
          setInfra(data);
          setLoadingInfra(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    fetch(`http://localhost:3000/screen/getAllCasesIDs`).then(
      async (result) => {
        if (result) {
          const data = await result.json();
          setCasesFromFB(data);
          setLoadingCase(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const onSubmitFormClick = () => {
    setSubmitFormClicked((val) => {
      if (val) {
        return val + 1;
      }
      return 1;
    });
  };

  if (loadingInfra || loadingCase) {
    return (
      <div className="spinnerContainer">
        <CircularProgress size={100} />
      </div>
    );
  }

  const renderPageScroll = () => {
    return (
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "space-around",
          flexDirection: "column",
          position: "fixed",
          right: 10,
          zIndex: 99,
          top: "calc(50vh - 25px)",
          transform: "translateY(-50%)",
        }}
      >
        {scrollElements.map((element, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <li>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                  }}
                >
                  <div
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: "#797171",
                      borderRadius: "50%",
                      marginRight: 5,
                      position: "relative",
                      cursor: "pointer",
                      color: "white",
                      transition: "all .3s ease-in-out",
                    }}
                    className={
                      selectedScrollElement === index
                        ? "selectedScrollElement"
                        : ""
                    }
                    onClick={() => {
                      selectScrollElement(index);
                      element.elementRef.current.scrollIntoView();
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
                      {index + 1}
                    </div>
                  </div>
                  {element.title}
                </div>
              </li>
              {index + 1 < scrollElements.length ? (
                <div
                  style={{
                    width: 20,
                    height: scrollElements.length > 4 ? 50 : 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
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
              ) : null}
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <StylesProvider jss={jss}>
      <div className="App">
        {selectedCase || newCase ? (
          <>
            <div className="mainSectionContainer">
              {renderPageScroll()}
              <div className="pageContainer" ref={mainInfoRef}>
                <MainInfo
                  submitFormClicked={submitFormClicked}
                  infra={infra}
                  case={selectedCase ? selectedCase.case : null}
                  caseID={selectedCase ? selectedCase.id : null}
                />
              </div>
              <div className="pageContainer" ref={aboutRef}>
                <Headline title="About screen" />
              </div>
              <div className="pageContainer" ref={contactRef}>
                <Headline title="Contact screen" />
              </div>
              <div className="pageContainer" ref={serviceRef}>
                <Headline title="Service screen" />
              </div>
            </div>
            <div className="bottomBar">
              <BottomBar onSubmitFormClick={onSubmitFormClick} />
            </div>
          </>
        ) : (
          <div className="casesContainer">
            <div className="chooseOptionTitle">
              Choose a case to edit or add a new one:
            </div>
            {casesFromFB.map((caseObj) => (
              <div
                key={caseObj.id}
                onClick={() => setSelectedCase(caseObj)}
                className="caseOption"
              >
                {caseObj.id}
              </div>
            ))}
            <div className="addNewCaseButton" onClick={() => setNewCase(true)}>
              Add
            </div>
          </div>
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
