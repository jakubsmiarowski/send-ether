import axios from "axios";
import {AdminTransactionObject} from "../assets/types/adminTransactionObject";

class AdminApiController {

    async checkPaymentGateStatus(widgetToken: string | undefined): Promise<string> {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment-gates/status/${widgetToken}`)
            return JSON.stringify(result.data);
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async registerTransactionInAdmin(transactionObject: AdminTransactionObject): Promise<any> {
        try {
            const {to, from, product, value, gasUsed, status} = transactionObject;
            const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/transactions`, {
                to: to,
                from: from,
                status: status,
                product: product,
                value: value,
                widgetToken: transactionObject.widgetToken,
                gasUsed: gasUsed
            })
            return result.data
        } catch (error: any) {
            throw new Error(error)
        }
    }

}

const userApiController = new AdminApiController();
export default userApiController;
