const express = require("express");
const Wiki = require("../models/wiki.js");

const router = new express.Router();



// Endpoint handlers

// at least 5 endpoints

// 1 (Create a new wiki page)
// POST /api/wiki/ (Used for the new wiki view)
// - Create the new wiki object based on the data from the client. new Wiki(req.body)
// - You save the wiki and return the result
// POST https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki

router.post("/", (req, res) => {

    let newWiki = new Wiki(req.body);

    newWiki.save()
        .then(result =>{
            res.status(201).send(result);
        })
        .catch(err =>{
            res.status(400).send(err.message);
        })    

});


// 2) Search Endpoint
// The endpoint used in the Home view to search for an existing page
/*

GET (/api/wiki/search/:searchTerm)
- Create the filter object

    let filterObj = {
      $or: [
        { title: { $regex: req.params.searchTerm, $options: 'i' } },
        { html: { $regex: req.params.searchTerm, $options: 'i' } }
      ]
    }
    
- Use your wiki model to filter the results
- Wiki.find(filterObj).exec(function(err, result) {})

GET https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/search/cs157
*/

router.get("/search/:searchTerm", (req, res) => {
    let filterObj = {
        $or: [
          { title: { $regex: req.params.searchTerm, $options: 'i' } },
          { wikiContent: { $regex: req.params.searchTerm, $options: 'i' } }
        ]
    };
    
    Wiki.find(filterObj)
    .then(result => {
        if(result) {
            res.status(201).send(result);
        }
       
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
      
});



// 3 (Return a single wiki page based on the urlName)
// GET /api/wiki/:urlName (Used for the wiki edit and wiki display views)
// - query collection using the function findOne({ urlName: req.params.urlName})
// - If that page exists, increment the page count, save it result.save(), return the wiki page
// GET https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject



router.get("/:urlName", (req, res) => {
    Wiki.findOne({urlName: req.params.urlName})
        .then(result => {
            if(result) {
                //increment the page count
                // Store in database
                result.pageCount++;

                result.save()
                    .then(result =>{
                        res.status(201).send(result);
                    })
                    .catch(err =>{
                        res.status(400).send(err.message);
                    })
            }
           
        })
        .catch(err => {
            res.status(500).send(err.message);
        })

});



// 4 (Updating an existing wiki page)
// PATCH /api/wiki/:urlName/:managePassword (Used for the wiki update view)
// - Get the wiki page based on the urlName (Wiki.findOne({ urlName: req.params.urlName }))
// - If the wiki is found then we compare the password that is stored with the one client passed it
//   if (result.password == req.params.managePassword)
//      set the data item one by one and call the save() -> return result
// result.title = req.body.title
// ...
// PATCH https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject/abc123
router.patch("/:urlName/:managePassword", (req, res) => {
    Wiki.findOne({urlName: req.params.urlName})
    .then(result => {
        if(result) {
            if (result.password == req.params.managePassword){

                result.title = req.body.title;
                result.category = req.body.category;
                result.author = req.body.author;
                result.urlName = req.body.urlName;
                result.wikiContent = req.body.wikiContent;
                result.updatedDate = Date.now();


                result.save()
                    .then(result =>{
                        res.status(201).send(result);
                    })
                    .catch(err =>{
                        res.status(400).send(err.message);
                    })
            }
        }
       
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
});



// 5 (Delete a wiki page)
// DELETE /api/wiki/delete/:urlName/:managePassword
// - Get the wiki page using findOne()
// - if the page exisits, compare the stored management password with the one client sent in
//   if (result.password == req.parmas.managePassword)
//    findByIdAndDelete(result._id)

// DELETE https://cs157-pubwiki-final-project.minassn.repl.co/api/wiki/finalproject/abc123
router.delete("/delete/:urlName/:managePassword", (req, res) => {
    Wiki.findOne({urlName: req.params.urlName})
    .then(result => {
        if(result) {
            if (result.password == req.params.managePassword){
                Wiki.findByIdAndDelete(result._id)
                .exec()
                .then((result) => { 
                    res.status(201).send(result);
                 })
                .catch((err) => { 
                    res.status(400).send(err.message);
                 });
            }
        }
       
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
});

module.exports = router;