import {Router} from "express";
import {
    createEncounter,
    deleteEncounter,
    getEncounterById,
    getEncounters,
    updateEncounter
} from "../controllers/encounterController";


const router = Router();

router.post('/', createEncounter);
router.get('/', getEncounters);
router.get('/:id', getEncounterById);
router.put('/:id', updateEncounter);
router.delete('/:id', deleteEncounter);

export default router;