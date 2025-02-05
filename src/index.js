import dotenv from "dotenv"
import connected_DB from "./db/index.js";
import express from "express";
dotenv.config({ path:'./env'})
connected_DB();
