const express = require("express")
const path = require("path")
const rootdir = require("../utils/path")
const router = express.Router()
const admin = require("./admin")

router.get("/", (req , res)=>{
// res.sendFile(path.join(rootdir , "views" , "shop.html"))
res.render("shop")
console.log(admin.product)
})

module.exports = router