import { Router } from "express";
import usersController from "../controllers/users.js";
import validation from "../middlewares/validation.js";

const router = Router();

const {
  getUsers,
  getCurrentUser,
  getUser,
  sendCode,
  resetPassword,
  patchUser,
} = usersController;

const {
  currentUserValidation,
  userValidation,
  sendCodeValidation,
  resetPasswordValidation,
} = validation;

router.get("/", getUsers);
router.get("/me", getUser);
router.get("/:id", currentUserValidation, getCurrentUser);
router.post("/send-code", sendCodeValidation, sendCode);
router.post("/reset-password", resetPasswordValidation, resetPassword);
router.patch("/me", userValidation, patchUser);

export default router;
