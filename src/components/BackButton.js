import React from "react";
import { Link } from "react-router-dom";

import { ArrowBackIcon } from "../icons";

export const BackButton = ({ toHome, toAuction, toPools }) => (
    <div className="arrow-back">
        <Link
            to={`/${toHome ? "" : toAuction ? "auction" : toPools ? "pools" : ""}`}
        >
            <ArrowBackIcon /> Back
        </Link>
    </div>
);
