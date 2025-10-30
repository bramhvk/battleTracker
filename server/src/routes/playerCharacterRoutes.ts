import {Router} from "express";
import {
    createPlayerCharacter,
    deletePlayerCharacter,
    getPlayerCharacterById,
    getPlayerCharacters,
    updatePlayerCharacter
} from "../controllers/playerCharacterController";


const router = Router();

router.post('/', createPlayerCharacter);
router.get('/', getPlayerCharacters);
router.get('/:id', getPlayerCharacterById);
router.put('/:id', updatePlayerCharacter);
router.delete('/:id', deletePlayerCharacter);

export default router;