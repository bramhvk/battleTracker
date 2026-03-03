import {Router} from "express";
import {
    createMonster,
    deleteMonster,
    getMonsterById,
    getMonsters,
    getMonstersForIds,
    updateMonster
} from "../controllers/monsterController";


const router = Router();

router.post('/', createMonster);
router.put('/', updateMonster);
router.get('/', getMonsters);
router.get('/:id', getMonsterById);
router.get('/:ids', getMonstersForIds);
router.delete('/:id', deleteMonster);

export default router;