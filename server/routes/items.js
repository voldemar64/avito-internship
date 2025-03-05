import { Router } from "express";
import itemsController from "../controllers/items.js";
import validation from "../middlewares/validation.js";

const router = Router();

const {
  getCurrentItem,
  getItems,
  getSavedItems,
  patchItem,
  postItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = itemsController;

const { currentItemValidation, itemValidation } = validation;

router.get("/", getItems);
router.get("/saved", getSavedItems);
router.get("/:id", currentItemValidation, getCurrentItem);
router.post("/", itemValidation, postItem);
router.patch("/:id", itemValidation, patchItem);
router.delete("/:id", deleteItem);

router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

export default router;
