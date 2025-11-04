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
router.get('/', getMonsters);
router.get('/:id', getMonsterById);
router.get('/:ids', getMonstersForIds);
router.put('/:id', updateMonster);
router.delete('/:id', deleteMonster);

export default router;