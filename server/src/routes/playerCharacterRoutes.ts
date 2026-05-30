import {Router} from "express";
import {
    createPlayerCharacter,
    deletePlayerCharacter,
    getPlayerCharacterById,
    getPlayerCharacters,
    getPlayerCharactersForIds,
    updatePlayerCharacter
} from "../controllers/playerCharacterController";


const router = Router();

router.post('/', createPlayerCharacter);
router.put('/', updatePlayerCharacter);
router.get('/', getPlayerCharacters);
router.get('/:id', getPlayerCharacterById);
router.get('/:ids', getPlayerCharactersForIds);
router.delete('/:id', deletePlayerCharacter);

export default router;