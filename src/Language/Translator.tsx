import React, { Fragment } from "react"
import { useTranslation } from "react-i18next"

interface IConfigurationText {
    text: string
}

const Translator: React.FC<IConfigurationText> = (configurationText: IConfigurationText) => {
    const { t } = useTranslation();
    return (
        <Fragment>
            {t(configurationText.text)}
        </Fragment>
    )
}

export { Translator };