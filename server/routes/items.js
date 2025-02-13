import { Router } from 'express';
import itemsController from '../controllers/items.js';
import validation from '../middlewares/validation.js';

const router = Router();

const {
    getCurrentItem,
    getItems,
    patchItem,
    postItem,
    deleteItem,
} = itemsController;

const {
    currentItemValidation,
    postItemValidation,
    patchItemValidation,
} = validation;

router.get('/', getItems);
router.get('/:id', currentItemValidation, getCurrentItem);
router.post('/', postItemValidation, postItem);
router.patch('/:id', patchItemValidation, patchItem);
router.delete('/:id', deleteItem);

export default router;
