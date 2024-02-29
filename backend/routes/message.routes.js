import express from 'express'
import {sendMessage} from '../controllers/message.controller.js'
import protectRoute from "../middleware/protectRoute.js"
import { getMessages } from '../controllers/message.controller.js'

const router  = express.Router()

router.get("/:id", protectRoute,getMessages);

//protectROute will help for auththorize , using this 
//not everyone can jump onto the sendMessage function 
router.post("/send/:id",protectRoute, sendMessage)



export default router;