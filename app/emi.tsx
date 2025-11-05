import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { shareAsync } from "expo-sharing";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Appbar, Card, DataTable, Text, TextInput } from "react-native-paper";

export default function EMI() {
	const theme = useColorScheme();
	const router = useRouter();
	const [amount, setAmount] = useState("100000");
	const [interestRate, setInterestRate] = useState("4.5");
	const [tenure, setTenure] = useState("10");

	const onAmountChange = (text: string) => {
		const numericText = text.replace(/[^0-9.]/g, "");
		setAmount(numericText);
	};

	const onTenureChange = (text: string) => {
		const numericText = text.replace(/[^0-9.h]/g, "1");
		setTenure(numericText);
	};

	const onInterestRateChange = (text: string) => {
		const numericText = text.replace(/[^0-9.]/g, "");
		setInterestRate(numericText);
	};

	const calculateEMI = () => {
		const P = parseFloat(amount) ?? 100000;
		const R = parseFloat(interestRate) / 100 / 12;
		const N = parseFloat(tenure) * 12;

		if (
			Number.isNaN(P) ||
			Number.isNaN(R) ||
			Number.isNaN(N) ||
			R === 0 ||
			N === 0
		) {
			return "0";
		}

		const emi = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
		return emi.toFixed(2);
	};

	const calculateTotalInterest = () => {
		return (
			parseFloat(calculateEMI()) * parseFloat(tenure) * 12 -
			parseFloat(amount)
		).toFixed();
	};

	const pieData = [
		{
			value: 50,
			color: "#009FFF",
			gradientCenterColor: "#006DFF",
			focused: true,
		},
		{
			value:
				(parseFloat(calculateTotalInterest()) /
					(parseFloat(amount) + parseFloat(calculateTotalInterest()))) *
				100,
			color: "#FFA5BA",
			gradientCenterColor: "#FF7F97",
		},
	];

	return (
		<>
			<Appbar.Header mode="small">
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="EMI Calculator" />
				<Appbar.Action
					icon="export-variant"
					onPress={() => shareAsync("https://reactnativepaper.com/")}
				/>
			</Appbar.Header>
			<ScrollView className="py-4">
				<View className="flex px-4 gap-8">
					<View className="gap-2">
						<Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Principal Amount
						</Text>
						<TextInput
							mode="outlined"
							value={amount}
							onChangeText={onAmountChange}
							keyboardType="numeric"
							left={<TextInput.Icon icon="currency-inr" />}
							right={<TextInput.Affix text="INR" />}
						/>
					</View>
					<View className="gap-2">
						<Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Interest Rate
						</Text>
						<TextInput
							mode="outlined"
							value={interestRate}
							onChangeText={onInterestRateChange}
							keyboardType="numeric"
							right={<TextInput.Affix text="%" />}
						/>
					</View>
					<View className="gap-2">
						<Text className="text-lg font-medium text-gray-900 dark:text-gray-100">
							Loan Tenure (Years)
						</Text>
						<TextInput
							mode="outlined"
							value={tenure}
							onChangeText={onTenureChange}
							keyboardType="numeric"
						/>
					</View>
				</View>

				<View className="px-4 mt-12">
					<Card
						mode="contained"
						style={theme === "dark" ? { backgroundColor: "#171717" } : {}}
					>
						<Card.Title
							title="EMI"
							titleVariant="titleLarge"
							right={() => (
								<Text style={{ fontWeight: "800" }}>
									₹{" "}
									{new Intl.NumberFormat().format(
										+parseFloat(calculateEMI()).toFixed(),
									)}
								</Text>
							)}
							rightStyle={{
								marginRight: 16,
							}}
						/>
						<Card.Content>
							<View style={{ padding: 8, alignItems: "center" }}>
								<PieChart
									data={pieData}
									donut
									showGradient
									radius={90}
									innerRadius={70}
									innerCircleColor={theme === "dark" ? "#171717" : "#e9dfeb"}
									centerLabelComponent={() => {
										return (
											<View
												style={{
													justifyContent: "center",
													alignItems: "center",
													gap: 4,
												}}
											>
												<Text
													style={{
														fontSize: 16,
														fontWeight: "bold",
													}}
												>
													{`₹ ${new Intl.NumberFormat().format(parseFloat(amount) + parseFloat(calculateTotalInterest()))}`}
												</Text>
												<Text style={{ fontSize: 12 }}>Total Amount</Text>
											</View>
										);
									}}
								/>
							</View>
						</Card.Content>
						<View
							style={{
								flexDirection: "column",
								padding: 16,
								gap: 8,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{Dot("#009FFF")}
								<Text>Principal Amount</Text>
								<Text style={{ marginLeft: "auto" }}>
									₹ {new Intl.NumberFormat().format(+amount)}
								</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								{Dot("#FFA5BA")}
								<Text>Total Interest</Text>
								<Text style={{ marginLeft: "auto" }}>
									₹ {new Intl.NumberFormat().format(+calculateTotalInterest())}
								</Text>
							</View>
						</View>
					</Card>
				</View>

				<View style={{ marginVertical: 48 }}>
					<Text style={{ paddingHorizontal: 16 }} variant="headlineSmall">
						Amortization schedule
					</Text>
					<AmortizationTable />
				</View>
			</ScrollView>
		</>
	);
}

const Dot = (color: string) => {
	return (
		<View
			style={{
				height: 10,
				width: 10,
				borderRadius: 5,
				backgroundColor: color,
				marginRight: 10,
			}}
		/>
	);
};

const AmortizationTable = () => {
	const [items] = useState([
		{
			key: 1,
			month: "Jan",
			principalPaid: 356,
			interestPaid: 16,
			balance: 2376,
		},
		{
			key: 2,
			month: "Feb",
			principalPaid: 262,
			interestPaid: 16,
			balance: 2376,
		},
		{
			key: 3,
			month: "Mar",
			principalPaid: 159,
			interestPaid: 6,
			balance: 2376,
		},
		{
			key: 4,
			month: "Apr",
			principalPaid: 305,
			interestPaid: 3.7,
			balance: 2376,
		},
	]);

	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>Month</DataTable.Title>
				<DataTable.Title numeric>Principal Paid</DataTable.Title>
				<DataTable.Title numeric>Interest Paid</DataTable.Title>
				<DataTable.Title numeric>Balance</DataTable.Title>
			</DataTable.Header>

			{items.map((item) => (
				<DataTable.Row key={item.key}>
					<DataTable.Cell>{item.month}</DataTable.Cell>
					<DataTable.Cell numeric>{item.principalPaid}</DataTable.Cell>
					<DataTable.Cell numeric>{item.interestPaid}</DataTable.Cell>
					<DataTable.Cell numeric>{item.balance}</DataTable.Cell>
				</DataTable.Row>
			))}
		</DataTable>
	);
};
