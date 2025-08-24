import { Cross1Icon } from "@radix-ui/react-icons";
import { SetStateAction } from "react";

export function TermsCondition({modal} : {modal:React.Dispatch<SetStateAction<boolean>>}) {

    return <div onClick={function (eVobj) {
            let className = String((eVobj.target as HTMLElement).className) ;
            if(className.includes("non-main")) {
                modal(false)
            } 
    }} className="non-main bg-gray-600/60 h-screen absolute top-0 flex items-end overflow-hidden m-0 p-0">
        <div >
            <div>
                {/* //shadow */}
            </div>
            <div className=" rounded-t-3xl bg-white p-4 ">
                <div className="flex justify-between mr-2">
                    <h2 className="text-xl font-semibold">Terms and Condition <span className="text-red-800">*</span></h2>
                    <Cross1Icon onClick={function () {modal(m => !m)}} className="bg-gray-500/10" />
                </div>
                <div className="overflow-y-scroll max-h-78 bg-white">
                    <h3>1. Registration & Account</h3>
                    <p>1.1 You must provide accurate business details, including legal entity name, tax ID, and contact information.</p>
                    <p>1.2 You are responsible for maintaining account security and confidentiality.</p>
                    <p>1.3 We reserve the right to suspend or terminate accounts violating these terms.</p>

                    <h3>2. Product Listings & Pricing</h3>
                    <p>2.1 You must ensure all product descriptions, prices, and availability are accurate.</p>
                    <p>2.2 Prices must be transparent and include or clearly specify applicable taxes and fees.</p>
                    <p>2.3 Discounts, offers, and bulk pricing must be honoured as advertised.</p>

                    <h3>3. Payment Terms</h3>
                    <p>3.1 Payments will be processed as per agreed terms (e.g., prepaid, COD, or net payment terms).</p>

                    <h3>4. Legal Disputes</h3>
                    <p>4.1 Any disputes regarding payments must be raised within 1 day after delivery.</p>
                    <p>4.2 Late payments may incur penalties or interest charges as per the agreement</p>
                </div>
            </div>
        </div>
    </div>
}