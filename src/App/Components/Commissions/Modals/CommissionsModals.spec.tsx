import React from "react";
import { MenuMobile, MenuItemMobile } from "./MenuMobile";
import { defaultGlobalState } from "../../../../Redux/C_states";
import { renderWithReduxAndRouter } from "../../../../Tests/Helpers";
import exitIcon from "../../../../Assets/svg/close.svg";
import { Modal as MaterialModal } from "@material-ui/core";
import ModalReasons from "../../Commissions/Modals/ModalReasons";
import { DischargeImpossible, RetainedPayment } from "../../Commissions/Modals";

describe("MenuMobile", () => {

    it("DischargeImpossible", () => {
        const { container } = renderWithReduxAndRouter(<DischargeImpossible open />, { ...defaultGlobalState });
        expect(container.find(ModalReasons).exists()).toBe(true);
    });

    it("RetainedPayment", () => {
        const { container } = renderWithReduxAndRouter(<RetainedPayment open />, { ...defaultGlobalState });
        expect(container.find(ModalReasons).exists()).toBe(true);
    });

});

