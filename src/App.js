import "./App.css";
import Headline from "./Main.js";
import BottomBar from "./BottomBar.js";
import MainInfo from "./MainInfo.js";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
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

  return (
    <StylesProvider jss={jss}>
      <div className="App">
        {selectedCase || newCase ? (
          <>
            <div className="mainSectionContainer">
              <div className="pageContainer">
                <MainInfo
                  submitFormClicked={submitFormClicked}
                  infra={infra}
                  case={selectedCase ? selectedCase.case : null}
                  caseID={selectedCase ? selectedCase.id : null}
                />
              </div>
              <div className="pageContainer">
                <Headline />
              </div>
            </div>
            <div className="bottomBar">
              <BottomBar onSubmitFormClick={onSubmitFormClick} />
            </div>
          </>
        ) : (
          <div className="casesContainer">
            <div className="chooseOptionTitle">Choose a case to edit or add a new one:</div>
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
