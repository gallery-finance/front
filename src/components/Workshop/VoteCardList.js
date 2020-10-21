import React, { useState } from "react";

import { VoteCard } from "./";
import { VoteModal } from "../../components/Modals";

export const VoteCardList = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="artwork-list">
                <div className="artwork-list__list">
                    <VoteCard setIsOpen={setIsOpen} />
                    <VoteCard setIsOpen={setIsOpen} />
                    <VoteCard setIsOpen={setIsOpen} />
                </div>
            </div>

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <VoteModal setIsOpen={setIsOpen} />
                    </div>
                </div>
            )}
        </>
    );
};
