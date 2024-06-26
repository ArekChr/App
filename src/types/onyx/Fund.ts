import CONST from '../../CONST';

type AdditionalData = {
    isBillingCard?: boolean;
    isP2PDebitCard?: boolean;
};

type AccountData = {
    additionalData?: AdditionalData;
    addressName?: string;
    addressState?: string;
    addressStreet?: string;
    addressZip?: number;
    cardMonth?: number;

    /** The masked credit card number */
    cardNumber?: string;

    cardYear?: number;
    created?: string;
    currency?: string;
    fundID?: number;
    bank?: string;
};

type Fund = {
    accountData?: AccountData;
    accountType?: typeof CONST.PAYMENT_METHODS.DEBIT_CARD;
    description?: string;
    key?: string;
    methodID?: number;
    title?: string;
};

export default Fund;
