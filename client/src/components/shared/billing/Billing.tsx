import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useGetTransactionsQuery } from "@/state/api";
import { getFormattedPrice } from "@/lib/utils";

import Loading from "../Loading";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type BillingProps = {
	type?: "user" | "teacher";
};
type PaymentType = "all" | "stripe" | "paypal";

const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
	{
		value: "all",
		label: "All Types",
	},
	{
		value: "stripe",
		label: "Stripe",
	},
	{
		value: "paypal",
		label: "PayPal",
	},
];
const TABLE_HEAD_CONFIG = ["Date", "Amount", "Payment Method"];

function Billing({ type = "user" }: BillingProps) {
	const { user, isLoaded } = useUser();
	const [paymentType, setPaymentType] = useState<PaymentType | string>("all");
	const { data: transactions, isLoading: isLoadingTransactions } =
		useGetTransactionsQuery(user?.id || "", {
			// Api does not get called if user does not exists or is being loaded
			skip: !isLoaded || !user,
		});

	const filteredTransactions =
		transactions?.filter((transaction) => {
			const matchesTypes =
				paymentType === "all" || transaction.paymentProvider === paymentType;
			return matchesTypes;
		}) || [];

	if (!isLoaded) return <Loading />;
	if (!user) return <div>Please sign in to view your billing information.</div>;

	return (
		<div className="space-y-8">
			<div className="space-y-6 bg-customgreys-secondarybg">
				{/* TITLE */}
				<h1 className="text-2xl font-semibold">
					{type === "user" ? "" : "Teacher "}Payment History
				</h1>
				{/* PAYMENT TYPE FILTER */}
				<div className="flex space-x-4">
					<Select
						value={paymentType}
						onValueChange={setPaymentType}
					>
						<SelectTrigger className="w-[180px] border-none bg-customgreys-primarybg">
							<SelectValue placeholder="Payment Type" />
						</SelectTrigger>

						<SelectContent className="bg-customgreys-primarybg">
							{PAYMENT_TYPES.map((paymentType) => (
								<SelectItem
									key={paymentType.value}
									className="cursor-pointer hover:!bg-white-50 hover:!text-customgreys-primarybg"
									value={paymentType.value}
								>
									{paymentType.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* PAYMENT HISTORY TABLE */}
				<div className="h-[400px] w-full">
					{isLoadingTransactions ? (
						<Loading />
					) : (
						<Table className="text-customgreys-dirtyGrey min-h-[200px]">
							<TableHeader className="bg-customgreys-darkGrey">
								<TableRow className="border-none text-white-50">
									{TABLE_HEAD_CONFIG.map((head) => (
										<TableHead
											key={head}
											className="bg-customgreys-darkGrey"
										>
											{head}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>

							<TableBody className="bg-customgreys-primarybg min-h-[200px]">
								{filteredTransactions.length > 0 ? (
									filteredTransactions.map((transaction) => (
										<TableRow
											key={transaction.transactionId}
											className="border-none"
										>
											<TableCell className="border-none p-4">
												{new Date(transaction.dateTime).toLocaleDateString()}
											</TableCell>
											<TableCell className="border-none p-4">
												{getFormattedPrice(transaction.amount)}
											</TableCell>
											<TableCell className="border-none p-4">
												{transaction.paymentProvider}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow className="border-none">
										<TableCell
											className="border-none p-4 text-center"
											colSpan={3}
										>
											No transactions to display.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					)}
				</div>
			</div>
		</div>
	);
}
export default Billing;
