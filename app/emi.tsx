import { useColorScheme } from "@/hooks/use-color-scheme";
import { type AmortizationEntry, calculateAmortization } from "@/lib/utils";
import { printToFileAsync } from "expo-print";
import { useRouter } from "expo-router";
import { shareAsync } from "expo-sharing";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
	Appbar,
	Button,
	Card,
	DataTable,
	List,
	Text,
	TextInput,
} from "react-native-paper";

interface Data {
	principalAmount: string;
	tenureYears: string;
	rateOfInterest: string;
	emi: string;
	totalAmountWithInterest: string;
	amortizationSchedule: AmortizationEntry[];
}

const generateHtml = (data: Data) => {
	const rows = data.amortizationSchedule
		.map((it) => {
			const monthYear = `${it.month} ${it.year}`;
			return `<tr>
          <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">${monthYear}</td>
          <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${it.principalPaid}</td>
          <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${it.interestCharged}</td>
          <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${it.balance}</td>
        </tr>`;
		})
		.join("\n");

	return `
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <body>
      <div class="flex min-h-screen min-w-xl flex-col items-center pt-16">
          <h1 class="text-3xl font-medium">EMI Report</h1>
          <div class="flex p-16">
            <div class="mx-auto rounded-lg border border-gray-200">
              <table class="flex justify-center divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">Principal Amount</td>
                    <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${data.principalAmount}</td>
                  </tr>

                  <tr>
                    <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">Rate of Interest</td>
                    <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${data.rateOfInterest}</td>
                  </tr>

                  <tr>
                    <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">Tenure (in years)</td>
                    <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${data.tenureYears}</td>
                  </tr>
                  
                  <tr>
                    <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">EMI</td>
                    <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${data.emi}</td>
                  </tr>
                  
                  <tr>
                    <td class="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-800">Total Amount (with Interest)</td>
                    <td class="px-6 py-3 text-sm whitespace-nowrap text-gray-800">${data.totalAmountWithInterest}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h1 class="text-3xl font-medium">Payment Schedule</h1>
          
          <div class="pt-9">
            <div class="-m-1.5">
              <div class="inline-block p-1.5 align-middle">
                <div class="overflow-hidden rounded-lg border border-gray-200">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Month</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Principal</th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Interest</th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Balance</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                       ${rows}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
      </body>
    </html>
`;
};

export default function EMI() {
	const theme = useColorScheme();
	const router = useRouter();
	const [amount, setAmount] = useState("100000");
	const [interestRate, setInterestRate] = useState("4.5");
	const [tenure, setTenure] = useState("1");

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

	const [tableDataCount, setTableDataCount] = useState(3);
	const [tableData, setTableData] = useState<[string, AmortizationEntry[]][]>(
		[],
	);

	const loadMore = (start: number, end: number) => {
		const slicedPosts = Object.entries(
			calculateAmortization(+amount, +interestRate / 100, +tenure),
		).slice(start, end);
		setTableData(slicedPosts);
	};

	useEffect(() => {
		loadMore(0, tableDataCount);
	}, [tableDataCount, amount, interestRate, tenure]);

	const handleShowMorePosts = () => {
		setTableDataCount((curr) => curr + 3);
	};

	const printToFile = async () => {
		console.log(tableData.flatMap(([_, entries]) => entries));
		const { uri } = await printToFileAsync({
			html: generateHtml({
				principalAmount: `₹ ${new Intl.NumberFormat().format(+amount)}`,
				tenureYears: `${tenure} years`,
				rateOfInterest: `${interestRate} %`,
				emi: `₹ ${new Intl.NumberFormat().format(+parseFloat(calculateEMI()).toFixed())}`,
				totalAmountWithInterest: `₹ ${new Intl.NumberFormat().format(parseFloat(amount) + parseFloat(calculateTotalInterest()))}`,
				amortizationSchedule: tableData.flatMap(([_, entries]) => entries),
			}),
		});

		await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
	};

	return (
		<>
			<Appbar.Header mode="small">
				<Appbar.BackAction onPress={() => router.back()} />
				<Appbar.Content title="EMI Calculator" />
				<Appbar.Action icon="export-variant" onPress={printToFile} />
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
					<Text
						style={{ paddingHorizontal: 16, marginVertical: 16 }}
						variant="headlineSmall"
					>
						Amortization schedule
					</Text>
					<AmortizationTable data={tableData} />
					<Button
						style={{ marginVertical: 16, width: "auto" }}
						onPress={handleShowMorePosts}
					>
						Load More
					</Button>
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

const AmortizationTable = ({
	data,
}: {
	data: [string, AmortizationEntry[]][];
}) => {
	return (
		<List.AccordionGroup>
			{data.map(([year, entry], index) => (
				<List.Accordion title={year} id={index.toString()} key={index}>
					<DataTable>
						<DataTable.Header>
							<DataTable.Title>Month</DataTable.Title>
							<DataTable.Title numeric>Principal Paid</DataTable.Title>
							<DataTable.Title numeric>Interest Paid</DataTable.Title>
							<DataTable.Title numeric>Balance</DataTable.Title>
						</DataTable.Header>

						{entry.map((item) => (
							<DataTable.Row key={item.month}>
								<DataTable.Cell>{item.month}</DataTable.Cell>
								<DataTable.Cell numeric>₹ {item.principalPaid}</DataTable.Cell>
								<DataTable.Cell numeric>
									₹ {item.interestCharged}
								</DataTable.Cell>
								<DataTable.Cell numeric>₹ {item.balance}</DataTable.Cell>
							</DataTable.Row>
						))}
					</DataTable>
				</List.Accordion>
			))}
		</List.AccordionGroup>
	);
};
