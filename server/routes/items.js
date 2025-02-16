import { Router } from "express";
import itemsController from "../controllers/items.js";
import validation from "../middlewares/validation.js";

const router = Router();

const { getCurrentItem, getItems, patchItem, postItem, deleteItem } =
  itemsController;

const { currentItemValidation, itemValidation } = validation;

router.get("/", getItems);
router.get("/:id", currentItemValidation, getCurrentItem);
router.post("/", itemValidation, postItem);
router.patch("/:id", itemValidation, patchItem);
router.delete("/:id", deleteItem);

export default router;
