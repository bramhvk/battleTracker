import {Router} from "express";
import {
    createCampaign,
    deleteCampaign,
    getCampaignById,
    getCampaigns,
    updateCampaign
} from "../controllers/campaignController";


const router = Router();

router.post('/', createCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;