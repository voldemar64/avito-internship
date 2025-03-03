import Item from "../models/item.js";
import NotFound from "../../backend_auth/errors/NotFound.js";
import ValidationError from "../../backend_auth/errors/ValidationError.js";

const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const getSavedItems = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const savedItems = await Item.find({ likes: userId });

    res.status(200).json(savedItems);
  } catch (err) {
    if (err.name === "CastError") {
      next(new ValidationError("Передан некорректный _id объявления."));
    } else {
      next(err);
    }
  }
};

const getCurrentItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      throw new NotFound("Объявление по указанному _id не найдено.");
    }
    res.status(200).json(item);
  } catch (err) {
    if (err.name === "CastError") {
      next(new ValidationError("Передан некорректный _id объявления."));
    } else {
      next(err);
    }
  }
};

const postItem = async (req, res, next) => {
  try {
    const { name, description, location, type, owner, ...rest } = req.body;

    const item = new Item({
      name,
      description,
      location,
      type,
      owner,
      ...rest,
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new ValidationError("Некорректные данные для создания объявления."));
    } else {
      next(err);
    }
  }
};

const patchItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      throw new NotFound("Объявление по указанному _id не найдено.");
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      next(
        new ValidationError("Некорректные данные при обновлении объявления."),
      );
    } else {
      next(err);
    }
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new NotFound("Объявление по указанному _id не найдено.");
    }

    res.status(204).send("Item deleted");
  } catch (err) {
    if (err.name === "CastError") {
      next(new ValidationError("Передан некорректный _id объявления."));
    } else {
      next(err);
    }
  }
};

const likeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      throw new NotFound("Объявление по указанному _id не найдено.");
    }

    if (item.likes.includes(userId)) {
      return res.status(400).json({ message: "Вы уже поставили лайк на это объявление" });
    }

    item.likes.push(userId);
    await item.save();

    res.status(200).json(item);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      next(new ValidationError("Некорректные данные для лайка."));
    } else {
      next(err);
    }
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      throw new NotFound("Объявление по указанному _id не найдено.");
    }

    const likeIndex = item.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "Вы не ставили лайк на это объявление" });
    }

    item.likes.splice(likeIndex, 1);
    await item.save();

    res.status(200).json(item);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      next(new ValidationError("Некорректные данные для дизлайка."));
    } else {
      next(err);
    }
  }
};

export default {
  getItems,
  getSavedItems,
  getCurrentItem,
  postItem,
  patchItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
