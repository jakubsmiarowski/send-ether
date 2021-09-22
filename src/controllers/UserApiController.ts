import axios from "axios";
import {AdminTransactionObject} from "../assets/types/adminTransactionObject";

class UserApiController {

    async checkPaymentGateStatus(widgetToken: string | undefined): Promise<string> {
        try {
            const result = await axios.get(`http://localhost:5000/payment-gates/status/${widgetToken}`)
            return JSON.stringify(result.data);
        }
        catch (error: any) {
            throw new Error(error)
        }
    }

    async registerTransactionInAdmin(transactionObject: AdminTransactionObject): Promise<any> {
        try {
            const { to, from, product, value, gasUsed, status } = transactionObject;
            const result = await axios.post('http://localhost:5000/transactions',{
                to: to,
                from: from,
                status: status,
                product: product,
                value: value,
                widgetToken: transactionObject.widgetToken,
                gasUsed: gasUsed
            })
            return result.data
        }
        catch (error: any) {
            throw new Error(error)
        }
    }

}
const userApiController = new UserApiController();
export default userApiController;
