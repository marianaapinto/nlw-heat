import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetLast3MessagesController } from "../controllers/GetLast3MessagesController";
import { UserProfileController } from "../controllers/UserProfileController";
import { checkAuthentication } from "../middleware/checkAuthentication";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.get("/messages/last3", new GetLast3MessagesController().handle);

router.post(
  "/messages",
  checkAuthentication,
  new CreateMessageController().handle
);

router.get("/profile", checkAuthentication, new UserProfileController().handle);

export { router };
