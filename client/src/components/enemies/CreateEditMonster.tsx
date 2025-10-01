import {Monster} from "../../types/Monster";
import {useState} from "react";

interface CreateEditMonsterProps {
    monster: Monster;
}

const CreateEditMonster: React.FC<CreateEditMonsterProps> = ({monster}) => {
    const [data, setData] = useState<Monster>(monster);

    return (
        <>
            {data._id}
        </>
    );
};

export default CreateEditMonster;