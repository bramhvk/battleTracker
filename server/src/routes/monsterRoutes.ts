import {Router} from "express";
import {
    createMonster,
    deleteMonster,
    getMonsterById,
    getMonsters,
    updateMonster
} from "../controllers/monsterController";


const router = Router();

router.post('/', createMonster);
router.get('/', getMonsters);
router.get('/:id', getMonsterById);
router.put('/:id', updateMonster);
router.delete('/:id', deleteMonster);

export default router;