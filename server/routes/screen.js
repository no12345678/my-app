const express = require("express");
const router = express.Router();
const db = require("../firebase.config");
// import db from "./firebase.config";

router.post("/testPost", async (req, res) => {
  var user = req.body.user;
});

router.get("/getFromFB", async (req, res) => {
  db.collection("orders")
    .doc("dAsos5aCJEHPHwgAxTfS")
    .get()
    .then(function (response) {
      const responseData = response.data();
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.post("/postToFB", async (req, res) => {
  var order = req.body.order;
  //   let userBook = {};
  //   userBook["authors"] = [authorName];
  //   userBook["categories"] = null;
  //   userBook["description"] = description;
  //   userBook["pageCount"] = pageCount;
  //   userBook["title"] = bookName;
  //   userBook["imageLinks"] = { thumbnail: url };
  //   userBook["publishedDate"] = "";
  //   userBook["id"] = bookName;

  // db.collection("orders")
  //   // .doc(bookName)
  //   .add(order)
  //   .then(() => {
  //     console.log("added order");
  //   })
  //   .catch((e) => {
  //     console.log("unable to add new book1");
  //     setLoading(false);
  //   });
});

router.get("/getBranchesFromFB", async (req, res) => {
  db.collection("branches")
    .get()
    .then(function (response) {
      if (response) {
        response.docs.map((doc) => {
          const responseData = doc.data();
        });
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/getInfraFromFB", async (req, res) => {
  Promise.all([
    db.collection("branches").get(),
    db.collection("types").get(),
    db.collection("levels").get(),
    db.collection("projects").get(),
    db.collection("bodies").get(),
    db.collection("currencies").get(),
  ]).then((values) => {
    if (values) {
      let branches = [];
      let types = [];
      let levels = [];
      let projects = [];
      let bodies = [];
      let currencies = [];
      const infraArray = [
        branches,
        types,
        levels,
        projects,
        bodies,
        currencies,
      ];

      for (let index = 0; index < values.length; index++) {
        values[index].docs.map((doc) => {
          const responseData = doc.data();
          infraArray[index].push(responseData);
        });
      }
      const infra = { branches, types, levels, projects, bodies, currencies };
      res.send(infra);
    }
  });
});

router.post("/addCaseToFB", async (req, res) => {
  let caseObj = req.body.case;
  db.collection("cases")
    .add(caseObj)
    .then(function (docRef) {
      res.send(docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      res.send(false);
    });
});

router.post("/updateCaseInFB", async (req, res) => {
  let caseID = req.body.id;
  let caseObj = req.body.case;
  db.collection("cases")
    .doc(caseID)
    .update(caseObj)
    .then(function () {
      res.send(true);
    })
    .catch(function (error) {
      console.error("Error updating document: ", error);
      res.send(false);
    });
});

router.get("/getCaseFromFB/:caseID", async (req, res) => {
  const caseID = req.params.caseID;
  db.collection("cases")
    .doc(caseID)
    .get()
    .then(function (response) {
      const responseData = response.data();
      res.send(responseData);
    })
    .catch(function (error) {
      console.error(error);
      res.send(false);
    });
});

router.get("/getAllCasesIDs", async (req, res) => {
  db.collection("cases")
    .get()
    .then(function (response) {
      let cases = [];
      response.docs.map(doc => {
        cases.push({id: doc.id, case: doc.data()});
      });
      res.send(cases);

    })
    .catch(function (error) {
      console.error(error);
      res.send(false);
    });
});

module.exports = router;
