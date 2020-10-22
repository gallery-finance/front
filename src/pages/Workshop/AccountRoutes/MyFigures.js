import React, { useState } from "react";

import { VoteFigureModal } from "../../../components/Modals";
import {useMyProposals} from "../Hooks";
import {formatAmount} from "../../../utils/format";

export const MyFigures = () => {

    const {myProposals} = useMyProposals()

    const [voteOpen, setVoteOpen] = useState(false);
    return (
        <div className="tabs__item">
            <div className="voter-table">
                <table>
                    <thead>
                        <tr>
                            <th>Proposed</th>
                            <th>Name</th>
                            <th className="voter-table__col-max-width hidden-sm">
                                Details
                            </th>
                            <th>Total Votes</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {myProposals.map(item => (
                            <tr key={item.id}>
                                <td>{new Date(item.createAt * 1000).toLocaleDateString()}</td>
                                <td>{item.name}</td>
                                <td className="hidden-sm">
                                    <div className="voter-table__details">
                                        <p className="voter-table__details-inner">
                                            {item.info}
                                        </p>
                                    </div>
                                </td>
                                <td>{formatAmount(item.votes)} GLF</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {voteOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <VoteFigureModal setVoteOpen={setVoteOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};
