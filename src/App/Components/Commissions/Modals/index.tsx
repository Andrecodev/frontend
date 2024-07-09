import React, { } from "react";
import moneyIcon from "../../../../Assets/svg/money.svg";
import coinsIcon from "../../../../Assets/svg/coins.svg";
import padlockIcon from "../../../../Assets/svg/padlock.svg";
import toolsIcon from "../../../../Assets/svg/tools.svg";
import paperCoinIcon from "../../../../Assets/svg/paper-coin.svg";

import ModalCard from "../../public/Cards/ModalCard";
import ModalReasons, { ModalProps } from "./ModalReasons";
import ModalFilters from "./ModalFilters";

const DischargeImpossible = ({ ...props }: ModalProps) => (
    <ModalReasons {...props} width={760} height={590} title={"Commissions.Modal.Title.IsNotPossibleDischarge"}>
        <div >
            <ModalCard text={"Commissions.Modal.Reason.Amount"} imagePath={coinsIcon} />
            <ModalCard text={"Commissions.Modal.Reason.Discounts"} imagePath={moneyIcon} />
        </div>
        <div>
            <ModalCard text={"Commissions.Modal.Reason.Key"} imagePath={padlockIcon} />
            <ModalCard text={"Commissions.Modal.Reason.Embargo"} imagePath={toolsIcon} />
        </div>
    </ModalReasons>
);

const RetainedPayment = ({ ...props }: ModalProps) => (
    <ModalReasons {...props} width={760} height={450} title={"Commissions.Modal.Title.ReteinedPayment"}>
        <div>
            <ModalCard text={"Commissions.Modal.Reason.Billing"} imagePath={paperCoinIcon} sidePadding={25} />
            <ModalCard text={"Commissions.Modal.Reason.Portfolio"} imagePath={coinsIcon} sidePadding={25} imageStyles={{ width: 44 }} />
            <ModalCard text={"Commissions.Modal.Reason.Obligations"} imagePath={moneyIcon} sidePadding={25} />
        </div>
    </ModalReasons>
);

export { DischargeImpossible, RetainedPayment, ModalFilters }