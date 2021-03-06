import React, { useState, useEffect, useCallback } from "react";
import styles from "./MainInfo.module.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined";
import CardOption from "./CardOption.js";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LanguageIcon from "@material-ui/icons/Language";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeIcon from "@material-ui/icons/Home";
import MoneyIcon from "@material-ui/icons/Money";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/he";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import CheckIcon from "@material-ui/icons/Check";
import * as moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  overrides: {
    MuiPickersCalendarHeader: {
      switchHeader: {
        direction: "ltr",
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        direction: "ltr",
      },
    },
    MuiOutlinedInput: {
      adornedEnd: {
        paddingRight: 0,
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: 0,
      },
    },
  },
});

function MainInfo(props) {
  const bodies = props.infra ? props.infra.bodies : [];
  const branches = props.infra ? props.infra.branches : [];
  const currencies = props.infra ? props.infra.currencies : [];
  const levels = props.infra ? props.infra.levels : [];
  const projects = props.infra ? props.infra.projects : [];
  const types = props.infra ? props.infra.types : [];

  // Right Side

  const [caseNumber, setCaseNumber] = useState(
    props.case ? props.case.caseNumber : ""
  );
  const [caseNumberErrorText, setCaseNumberErrorText] = useState("");
  const [caseDesc, setCaseDesc] = useState(
    props.case ? props.case.caseDescription : ""
  );
  const [caseDescErrorText, setCaseDescErrorText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(
    props.case ? props.case.branch : null
  );
  const [branchErrorText, setBranchErrorText] = useState("");
  const [selectedType, setSelectedType] = useState(
    props.case ? props.case.type : null
  );
  const [typeErrorText, setTypeErrorText] = useState("");
  const [selectedCaseLevel, setSelectedCaseLevel] = useState(
    props.case ? props.case.caseLevel : null
  );
  const [caseLevelErrorText, setCaseLevelErrorText] = useState("");
  const [selectedProjectLevel, setSelectedProjectLevel] = useState(
    props.case ? props.case.projectLevel : null
  );
  const [projectLevelErrorText, setProjectLevelErrorText] = useState("");
  const [selectedOrderLevel, setSelectedOrderLevel] = useState(
    props.case ? props.case.orderLevel : null
  );
  const [orderLevelErrorText, setOrderLevelErrorText] = useState("");
  const [selectedBodies, setSelectedBodies] = useState(
    props.case ? props.case.bodies : []
  );
  const [selectedProject, setSelectedProject] = useState(
    props.case ? props.case.project : null
  );
  const [projectErrorText, setProjectErrorText] = useState(
    "?????????? ???????????????? - ?????? ?????????? 3 ??????????"
  );
  const [projectInputValue, setProjectInputValue] = useState(
    props.case ? props.case.project.name : ""
  );
  const [percent, setPercent] = useState(props.case ? props.case.percent : "");
  const [percentErrorText, setPercentErrorText] = useState("");

  //   Left Side
  const [caseSum, setCaseSum] = useState(props.case ? props.case.caseSum : "");
  const [caseSumErrorText, setCaseSumErrorText] = useState("");
  const [implementationChecked, setImplementationChecked] = useState(
    props.case ? props.case.isImplementation : false
  );
  const [abroadChecked, setAbroadChecked] = useState(
    props.case ? props.case.isAbroad : false
  );
  const [cooperationChecked, setCooperationChecked] = useState(
    props.case ? props.case.isCooperation : false
  );
  const [houseChecked, setHouseChecked] = useState(
    props.case ? props.case.isHouse : false
  );
  const [generalChecked, setGeneralChecked] = useState(
    props.case ? props.case.isGeneral : false
  );
  const [selectedBeginningDate, setSelectedBeginningDate] = useState(
    props.case ? moment(props.case.beginningDate) : null
  );
  const [beginningDateErrorText, setBeginningDateErrorText] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState(
    props.case ? moment(props.case.endDate) : null
  );
  const [endDateErrorText, setEndDateErrorText] = useState("");
  const [actualBeginningDate, setActualBeginningDate] = useState(
    props.case
      ? props.case.actualEndDate
        ? moment(props.case.actualEndDate)
        : null
      : null
  );
  const [actualEndDate, setActualEndDate] = useState(
    props.case
      ? props.case.actualEndDate
        ? moment(props.case.actualEndDate)
        : null
      : null
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    props.case ? props.case.currency : ""
  );
  const [currencyErrorText, setCurrencyErrorText] = useState("");

  const [existingCase, setExistingCase] = useState(
    props.case && props.caseID ? { id: props.caseID, case: props.case } : null
  );
  const [submitClicked, setSubmitClicked] = useState(false);

  const [numOfRequiredFieldsToFill, setNumOfRequiredFieldsToFill] = useState(
    props.case ? 0 : 12
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.submitFormClicked) {
      setSubmitClicked(true);
    }
  }, [props.submitFormClicked]);

  const onSubmitForm = useCallback(() => {
    let valid = true;
    if (!caseNumber || caseNumber === "") {
      setCaseNumberErrorText("?????? ?????? ???????? ??????");
      valid = false;
    }
    if (!caseDesc || caseDesc === "") {
      setCaseDescErrorText("?????? ?????? ??????????");
      valid = false;
    }
    if (!selectedBranch) {
      setBranchErrorText("?????? ?????? ?????? ??????????????");
      valid = false;
    }
    if (!selectedType) {
      setTypeErrorText("?????? ?????? ?????? ??????????????");
      valid = false;
    }
    if (!selectedCaseLevel) {
      setCaseLevelErrorText("?????? ?????? ?????? ??????????????");
      valid = false;
    }
    if (!selectedProjectLevel) {
      setProjectLevelErrorText("?????? ?????? ?????? ??????????????");
      valid = false;
    }
    if (!selectedOrderLevel) {
      setOrderLevelErrorText("?????? ?????? ?????? ??????????????");
      valid = false;
    }
    if (!selectedProject) {
      setProjectErrorText(
        "?????? ?????? ???????????? ?????????????? - ?????? ?????????? 3 ?????????? ???????????? ????????????????"
      );
      valid = false;
    }
    if (!caseSum || caseSum === "") {
      setCaseSumErrorText("?????? ?????? ???????? ??????");
      valid = false;
    }
    if (!selectedCurrency) {
      setCurrencyErrorText("?????? ?????? ?????? ????????");
      valid = false;
    }
    if (!selectedBeginningDate) {
      setBeginningDateErrorText("?????? ?????? ?????????? ??????????");
      valid = false;
    }
    if (!selectedEndDate) {
      setEndDateErrorText("?????? ?????? ?????????? ????????");
      valid = false;
    }

    // in case all the required fields are filled
    if (valid) {
      console.log("form valid");
      const caseObj = {
        caseDescription: caseDesc,
        caseNumber,
        caseSum,
        beginningDate: selectedBeginningDate,
        branch: selectedBranch,
        caseLevel: selectedCaseLevel,
        currency: selectedCurrency,
        endDate: selectedEndDate,
        orderLevel: selectedOrderLevel,
        project: selectedProject,
        projectLevel: selectedProjectLevel,
        type: selectedType,
        bodies: selectedBodies,
        percent,
        actualBeginningDate,
        actualEndDate,
        isImplementation: implementationChecked,
        isAbroad: abroadChecked,
        isCooperation: cooperationChecked,
        isHouse: houseChecked,
        isGeneral: generalChecked,
      };
      if (existingCase) {
        axios
          .post(`http://localhost:3000/screen/updateCaseInFB`, {
            id: existingCase.id,
            case: caseObj,
          })
          .then((res) => {
            console.log(res);
            if (res) {
              setExistingCase((existing) => ({
                id: existing.id,
                case: caseObj,
              }));
              setOpen(true);
            } else {
              console.log("error occurred");
            }
          });
      } else {
        // Add a new document with a generated id.
        axios
          .post(`http://localhost:3000/screen/addCaseToFB`, {
            case: caseObj,
          })
          .then((res) => {
            console.log(res);
            if (res) {
              setExistingCase({ id: res.data, case: caseObj });
              setOpen(true);
            } else {
              console.log("error occurred");
            }
          });
      }
    }
  }, [
    abroadChecked,
    actualBeginningDate,
    actualEndDate,
    caseDesc,
    caseNumber,
    caseSum,
    cooperationChecked,
    existingCase,
    generalChecked,
    houseChecked,
    implementationChecked,
    percent,
    selectedBeginningDate,
    selectedBodies,
    selectedBranch,
    selectedCaseLevel,
    selectedCurrency,
    selectedEndDate,
    selectedOrderLevel,
    selectedProject,
    selectedProjectLevel,
    selectedType,
  ]);

  useEffect(() => {
    if (submitClicked) {
      onSubmitForm();
      setSubmitClicked(false);
    }
  }, [submitClicked, onSubmitForm]);

  const onCloseSnackbar = () => {
    setOpen(false);
  };

  const onChangeCaseNumber = (event) => {
    if (event.target.value !== "") {
      if (caseNumberErrorText !== "" || caseNumber === "") {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setCaseNumberErrorText("");
    } else {
      setCaseNumberErrorText("?????? ?????? ???????? ??????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setCaseNumber(event.target.value);
  };

  const onChangeCaseDesc = (event) => {
    if (event.target.value !== "") {
      if (caseDescErrorText !== "" || caseDesc === "") {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setCaseDescErrorText("");
    } else {
      setCaseDescErrorText("?????? ?????? ??????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setCaseDesc(event.target.value);
  };

  const onChangeBranch = (event, value) => {
    if (value) {
      if (branchErrorText !== "" || !selectedBranch) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setBranchErrorText("");
    } else {
      setBranchErrorText("?????? ?????? ?????? ??????????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedBranch(value);
  };

  const onChangeType = (event, value) => {
    if (value) {
      if (typeErrorText !== "" || !selectedType) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setTypeErrorText("");
    } else {
      setTypeErrorText("?????? ?????? ?????? ??????????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedType(value);
  };

  const onChangeCaseLevel = (event, value) => {
    if (value) {
      if (caseLevelErrorText !== "" || !selectedCaseLevel) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setCaseLevelErrorText("");
    } else {
      setCaseLevelErrorText("?????? ?????? ?????? ??????????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedCaseLevel(value);
  };

  const onChangeProjectLevel = (event, value) => {
    if (value) {
      if (projectLevelErrorText !== "" || !selectedProjectLevel) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setProjectLevelErrorText("");
    } else {
      setProjectLevelErrorText("?????? ?????? ?????? ??????????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedProjectLevel(value);
  };

  const onChangeOrderLevel = (event, value) => {
    if (value) {
      if (orderLevelErrorText !== "" || !selectedOrderLevel) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setOrderLevelErrorText("");
    } else {
      setOrderLevelErrorText("?????? ?????? ?????? ??????????????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedOrderLevel(value);
  };

  const onChangeProject = (event, value) => {
    if (value) {
      if (
        projectErrorText !== "?????????? ???????????????? - ?????? ?????????? 3 ??????????" ||
        !selectedProject
      ) {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setProjectErrorText("?????????? ???????????????? - ?????? ?????????? 3 ??????????");
    } else {
      setProjectErrorText(
        "?????? ?????? ???????????? ?????????????? - ?????? ?????????? 3 ?????????? ???????????? ????????????????"
      );
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setSelectedProject(value);
  };

  const onChangePercent = (event) => {
    if (event.target.value !== "") {
      if (event.target.value < 0 || event.target.value > 100) {
        setPercentErrorText("?????? ???????? ?????? ?????? 0 ??-100");
      } else {
        setPercentErrorText("");
      }
    } else {
      setPercentErrorText("");
    }
    setPercent(event.target.value);
  };

  const onBodyCardOptionClicked = (body) => {
    const bodyIndex = selectedBodies.findIndex((b) => b.id === body.id);
    let selectedBodiesCopy = [...selectedBodies];
    if (bodyIndex !== -1) {
      selectedBodiesCopy.splice(bodyIndex, 1);
    } else {
      selectedBodiesCopy.push(body);
    }
    setSelectedBodies(selectedBodiesCopy);
  };

  const onChangeCaseSum = (event) => {
    if (event.target.value !== "") {
      if (caseSumErrorText !== "" || caseSum === "") {
        setNumOfRequiredFieldsToFill((prev) => prev - 1);
      }
      setCaseSumErrorText("");
    } else {
      setCaseSumErrorText("?????? ?????? ???????? ??????");
      setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
    }
    setCaseSum(event.target.value);
  };

  const renderProjectAndOrderLevels = () => {
    return (
      <div className={styles.twoFieldsContainer}>
        {/* Project Level */}
        <Autocomplete
          id="project-level-autocomplete"
          options={levels}
          getOptionLabel={(option) => option.name}
          noOptionsText="???? ?????????? ????????????"
          onChange={onChangeProjectLevel}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="?????? ????????????"
              variant="outlined"
              error={projectLevelErrorText !== ""}
              helperText={projectLevelErrorText}
              required
              size="small"
            />
          )}
          classes={{
            option: styles.optionWrapper,
            noOptions: styles.noOptionsWrapper,
          }}
          className={styles.halfRowField}
          value={selectedProjectLevel}
        />
        {/* Order Level */}
        <Autocomplete
          id="order-level-autocomplete"
          options={levels}
          getOptionLabel={(option) => option.name}
          noOptionsText="???? ?????????? ????????????"
          onChange={onChangeOrderLevel}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="?????? ??????????"
              variant="outlined"
              error={orderLevelErrorText !== ""}
              helperText={orderLevelErrorText}
              required
              size="small"
            />
          )}
          classes={{
            option: styles.optionWrapper,
            noOptions: styles.noOptionsWrapper,
          }}
          className={styles.halfRowField}
          value={selectedOrderLevel}
        />
      </div>
    );
  };

  const renderTypeAndCaseLevel = () => {
    return (
      <div className={styles.twoFieldsContainer}>
        {/* Type */}
        <Autocomplete
          id="type-autocomplete"
          options={types}
          getOptionLabel={(option) => option.name}
          noOptionsText="???? ?????????? ????????????"
          onChange={onChangeType}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="??????"
              variant="outlined"
              error={typeErrorText !== ""}
              helperText={typeErrorText}
              required
              size="small"
            />
          )}
          classes={{
            option: styles.optionWrapper,
            noOptions: styles.noOptionsWrapper,
          }}
          className={styles.halfRowField}
          value={selectedType}
        />
        {/* Level */}
        <Autocomplete
          id="case-level-autocomplete"
          options={levels}
          getOptionLabel={(option) => option.name}
          noOptionsText="???? ?????????? ????????????"
          onChange={onChangeCaseLevel}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="?????? ??????"
              variant="outlined"
              error={caseLevelErrorText !== ""}
              helperText={caseLevelErrorText}
              required
              size="small"
            />
          )}
          classes={{
            option: styles.optionWrapper,
            noOptions: styles.noOptionsWrapper,
          }}
          className={styles.halfRowField}
          value={selectedCaseLevel}
        />
      </div>
    );
  };

  const renderProject = () => {
    return (
      <Autocomplete
        id="project-autocomplete"
        options={projects}
        getOptionLabel={(option) => option.name}
        noOptionsText="???? ?????????? ????????????"
        onChange={onChangeProject}
        inputValue={projectInputValue}
        onInputChange={(event, newInputValue) => {
          setProjectInputValue(newInputValue);
        }}
        open={
          projectInputValue.length > 2 &&
          (!selectedProject ||
            (selectedProject && selectedProject.name !== projectInputValue))
        }
        getOptionSelected={(option, value) => option.id === value.id}
        freeSolo
        renderInput={(params: Params): ReactNode => {
          return (
            <div className={styles.projectInputContainer}>
              <TextField
                {...params}
                label="????????????"
                variant="outlined"
                error={
                  projectErrorText !== "?????????? ???????????????? - ?????? ?????????? 3 ??????????"
                }
                helperText={projectErrorText}
                required
                size="small"
              />
              <InputAdornment
                position="start"
                className={styles.projectIconContainer}
              >
                <BeachAccessOutlinedIcon />
              </InputAdornment>
            </div>
          );
        }}
        classes={{
          option: styles.optionWrapper,
          noOptions: styles.noOptionsWrapper,
          endAdornment: styles.autoCompleteEndAdornment,
        }}
        className={styles.fullRowField}
        value={selectedProject}
      />
    );
  };

  const renderChooseBodies = () => {
    return (
      <div className={styles.chooseBodiesContainer}>
        <div className={styles.chooseBodiesLabelContainer}>
          <div className={styles.chooseBodiesLabel}>???????? ????????????</div>
          <div className={styles.chooseBodiesSubLabel}>
            ???????? ?????????? ???????? ?????????? ??????
          </div>
        </div>
        <div className={styles.chooseBodiesOptionsContainer}>
          {bodies.map((body) => (
            <div
              className={styles.chooseBodiesOption}
              key={body.id}
              onClick={() => onBodyCardOptionClicked(body)}
            >
              <CardOption
                title={body.name}
                relativeImagePath={body.imagePath}
                backgroundSize={body.backgroundSize}
                imageCard={true}
              />
              {selectedBodies.findIndex((b) => b.id === body.id) !== -1 ? (
                <div className={styles.bodyCheck}>
                  <CheckCircleIcon fontSize="small" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRightSide = () => {
    return (
      <div className={styles.rightSide}>
        {/* Case Number */}
        <TextField
          placeholder="????????"
          variant="outlined"
          label="????????"
          onChange={onChangeCaseNumber}
          error={caseNumberErrorText !== ""}
          helperText={caseNumberErrorText}
          required
          size="small"
          className={styles.fullRowField}
          defaultValue={caseNumber}
        />
        {/* Case Desc */}
        <TextField
          placeholder="??????????"
          variant="outlined"
          label="??????????"
          onChange={onChangeCaseDesc}
          error={caseDescErrorText !== ""}
          helperText={caseDescErrorText}
          required
          size="small"
          className={styles.fullRowField}
          defaultValue={caseDesc}
        />
        {/* Branch */}
        <Autocomplete
          id="branch-autocomplete"
          options={branches}
          getOptionLabel={(option) => option.name}
          noOptionsText="???? ?????????? ????????????"
          onChange={onChangeBranch}
          getOptionSelected={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="??????"
              variant="outlined"
              error={branchErrorText !== ""}
              helperText={branchErrorText}
              required
              size="small"
            />
          )}
          classes={{
            option: styles.optionWrapper,
            noOptions: styles.noOptionsWrapper,
          }}
          className={styles.halfRowField}
          value={selectedBranch}
        />
        {renderTypeAndCaseLevel()}
        {renderProjectAndOrderLevels()}
        {renderChooseBodies()}
        {renderProject()}
        {/* Percentage */}
        <TextField
          placeholder="????????"
          variant="outlined"
          label="????????"
          onChange={onChangePercent}
          error={percentErrorText !== ""}
          helperText={percentErrorText}
          size="small"
          className={styles.halfRowField}
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          defaultValue={percent}
        />
      </div>
    );
  };

  const renderSwitchFields = () => {
    return (
      <>
        <div className={styles.halfRowField} style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={implementationChecked}
                onChange={(event) =>
                  handleChangeChecked(event, setImplementationChecked)
                }
                name="implementationChecked"
                color="primary"
              />
            }
            label="??????????"
          />
        </div>
        <div className={styles.halfRowField} style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={abroadChecked}
                onChange={(event) =>
                  handleChangeChecked(event, setAbroadChecked)
                }
                name="abroadChecked"
                color="primary"
              />
            }
            label={
              <div className={styles.switchLabelContainer}>
                <span className={styles.switchLabelText}>????"??</span>{" "}
                <LanguageIcon />
              </div>
            }
          />
        </div>
        <div className={styles.halfRowField} style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={cooperationChecked}
                onChange={(event) =>
                  handleChangeChecked(event, setCooperationChecked)
                }
                name="cooperationChecked"
                color="primary"
              />
            }
            label={
              <div className={styles.switchLabelContainer}>
                <span className={styles.switchLabelText}>?????????? ??????????</span>{" "}
                <PeopleAltIcon />
              </div>
            }
          />
        </div>
        <div className={styles.halfRowField} style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={houseChecked}
                onChange={(event) =>
                  handleChangeChecked(event, setHouseChecked)
                }
                name="houseChecked"
                color="primary"
              />
            }
            label={
              <div className={styles.switchLabelContainer}>
                <span className={styles.switchLabelText}>?????? ??????????????</span>{" "}
                <HomeIcon />
              </div>
            }
          />
        </div>
        <div className={styles.halfRowField} style={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                checked={generalChecked}
                onChange={(event) =>
                  handleChangeChecked(event, setGeneralChecked)
                }
                name="generalChecked"
                color="primary"
              />
            }
            label="????????"
          />
        </div>
      </>
    );
  };

  const handleChangeChecked = (event, checkedVarSetState) => {
    checkedVarSetState(event.target.checked);
  };

  const handleBeginningDateChanged = (value) => {
    if (
      selectedEndDate &&
      value > selectedEndDate &&
      (value.date() !== selectedEndDate.date() ||
        value.month() !== selectedEndDate.month() ||
        value.year() !== selectedEndDate.year())
    ) {
      if (
        !selectedBeginningDate ||
        (selectedBeginningDate && beginningDateErrorText !== "")
      ) {
      } else {
        setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
      }
      setBeginningDateErrorText("?????? ?????????? ???????? ?????????? ????????");
    } else {
      if (beginningDateErrorText !== "") {
        if (endDateErrorText !== "") {
          setNumOfRequiredFieldsToFill((prev) => prev - 2);
        } else {
          setNumOfRequiredFieldsToFill((prev) => prev - 1);
        }
      } else {
        if (endDateErrorText !== "") {
          setNumOfRequiredFieldsToFill((prev) => prev - 1);
        } else {
          if (!selectedBeginningDate) {
            setNumOfRequiredFieldsToFill((prev) => prev - 1);
          }
        }
      }
      setBeginningDateErrorText("");
      setEndDateErrorText("");
    }
    setSelectedBeginningDate(value);
  };

  const handleEndDateChanged = (value) => {
    if (
      selectedBeginningDate &&
      value < selectedBeginningDate &&
      (value.date() !== selectedBeginningDate.date() ||
        value.month() !== selectedBeginningDate.month() ||
        value.year() !== selectedBeginningDate.year())
    ) {
      if (!selectedEndDate || (selectedEndDate && endDateErrorText !== "")) {
      } else {
        setNumOfRequiredFieldsToFill((prev) => Math.min(12, prev + 1));
      }
      setEndDateErrorText("?????? ?????????? ???????? ?????????? ??????????");
    } else {
      if (endDateErrorText !== "") {
        if (beginningDateErrorText !== "") {
          setNumOfRequiredFieldsToFill((prev) => prev - 2);
        } else {
          setNumOfRequiredFieldsToFill((prev) => prev - 1);
        }
      } else {
        if (beginningDateErrorText !== "") {
          setNumOfRequiredFieldsToFill((prev) => prev - 1);
        } else {
          if (!selectedEndDate) {
            setNumOfRequiredFieldsToFill((prev) => prev - 1);
          }
        }
      }
      setBeginningDateErrorText("");
      setEndDateErrorText("");
    }
    setSelectedEndDate(value);
  };

  const renderBeginningAndEndDateFields = () => {
    return (
      <div className={styles.twoFieldsContainer}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={"he"}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="beginning-date"
            label="?????????? ??????????"
            value={selectedBeginningDate}
            onChange={handleBeginningDateChanged}
            inputVariant="outlined"
            autoOk
            required
            className={styles.halfRowField}
            error={beginningDateErrorText !== ""}
            helperText={beginningDateErrorText}
            size="small"
            InputProps={{ readOnly: true }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={"he"}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="end-date"
            label="?????????? ????????"
            value={selectedEndDate}
            onChange={handleEndDateChanged}
            inputVariant="outlined"
            autoOk
            required
            className={styles.halfRowField}
            error={endDateErrorText !== ""}
            helperText={endDateErrorText}
            size="small"
            InputProps={{ readOnly: true }}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  };

  const renderActualBeginningAndEndDateFields = () => {
    return (
      <div className={styles.twoFieldsContainer}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={"he"}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="beginning-date-actual"
            label="?????????? ?????????? ??????????"
            value={actualBeginningDate}
            inputVariant="outlined"
            autoOk
            disabled
            className={styles.halfRowField}
            size="small"
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={"he"}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            margin="normal"
            id="end-date-actual"
            label="?????????? ???????? ??????????"
            value={actualEndDate}
            inputVariant="outlined"
            autoOk
            disabled
            className={styles.halfRowField}
            size="small"
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  };

  const renderCaseSumRow = () => {
    return (
      <div className={styles.caseSumRowContainer}>
        {/* Case Sum */}
        <TextField
          placeholder="????????"
          variant="outlined"
          label="????????"
          onChange={onChangeCaseSum}
          error={caseSumErrorText !== ""}
          helperText={caseSumErrorText}
          required
          size="small"
          type="number"
          className={styles.halfRowField}
          defaultValue={caseSum}
        />
        <div>
          <div className={styles.currencyOptionsContainer}>
            <div className={styles.currencyLabelContainer}>
              <span
                className={`${styles.currencyTitle} ${
                  currencyErrorText !== "" ? styles.currencyLabelError : ""
                }`}
              >
                ????????*
              </span>
              <div
                className={`${styles.currencyIconContainer} ${
                  currencyErrorText !== "" ? styles.currencyLabelError : ""
                }`}
              >
                <MoneyIcon fontSize="small" />
              </div>
            </div>
            {currencies.map((currency) => (
              <div
                className={styles.chooseCurrencyOption}
                key={currency.id}
                onClick={() => {
                  if (!selectedCurrency || currencyErrorText !== "") {
                    setNumOfRequiredFieldsToFill((prev) => prev - 1);
                  }
                  setSelectedCurrency(currency);
                  setCurrencyErrorText("");
                }}
              >
                <CardOption optionText={currency.name} />
                {selectedCurrency && selectedCurrency.id === currency.id ? (
                  <div className={styles.bodyCheck}>
                    <CheckCircleIcon fontSize="small" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {currencyErrorText !== "" ? (
            <div className={styles.currencyErrorTextContainer}>
              {currencyErrorText}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Snackbar open={open} autoHideDuration={1000} onClose={onCloseSnackbar}>
          <Alert severity="success">???????????? ?????????? ????????????</Alert>
        </Snackbar>
        <div className={styles.backgroundTitle}>
          <span>???????? ????????-</span>
          <br />
          <span>???????????? ????????????</span>
        </div>
        <Tooltip
          title={
            numOfRequiredFieldsToFill > 0
              ? "???????? ???????? ???????????? ????????"
              : "?????????? ????????"
          }
          placement="right"
        >
          <div
            className={`${styles.requiredFieldsCounterContainer}  ${
              numOfRequiredFieldsToFill === 0 ? styles.formValid : ""
            }`}
          >
            <div
              className={styles.requiredFieldsCounterText}
              style={{ paddingBottom: numOfRequiredFieldsToFill > 0 ? 3 : 0 }}
            >
              {numOfRequiredFieldsToFill > 0 ? (
                numOfRequiredFieldsToFill
              ) : (
                <div className={styles.checkIcon}>
                  <CheckIcon />
                </div>
              )}
            </div>
          </div>
        </Tooltip>
        {renderRightSide()}
        <div className={styles.leftSide}>
          {renderCaseSumRow()}
          {renderBeginningAndEndDateFields()}
          {renderActualBeginningAndEndDateFields()}
          {renderSwitchFields()}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainInfo;
