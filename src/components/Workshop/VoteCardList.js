import React, { useState } from "react";

import { VoteCard } from "./";
import { VoteModal } from "../Modals";
import {useFigures} from "../../pages/Workshop/Hooks";

export const VoteCardList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const {figures} = useFigures()


    return (
        <>
            <div className="artwork-list">
                <div className="artwork-list__list">
                    {figures.map(item =>{
                        return (
                            <VoteCard figure={item} setIsOpen={setIsOpen} />
                        )
                    })}
                </div>
            </div>

        </>
    );
};
