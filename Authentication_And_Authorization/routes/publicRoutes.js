import {Router} from 'express';

export const router=Router();

router.get("/home", (req, res) => { 
    res.json({message: "Welcome to Home Page"});
 })

router.get("/about", (req, res) => { 
    res.json({message: "Welcome to About Page"});
 })

router.get("/contact", (req, res) => { 
    res.json({message: "Welcome to Contact Us Page"});
 })
