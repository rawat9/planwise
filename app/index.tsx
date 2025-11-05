import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ResponsiveGrid } from "react-native-flexible-grid";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const router = useRouter();

	const data = [
		{
			imageUrl: "https://picsum.photos/200/300?random=1",
			text: "Item 1",
			id: 1,
		},
		{
			imageUrl: "https://picsum.photos/200/300?random=2",
			text: "Item 2",
			id: 2,
		},
		{
			imageUrl: "https://picsum.photos/200/300?random=3",
			text: "Item 3",
			id: 3,
		},
		{
			imageUrl: "https://picsum.photos/200/300?random=3",
			text: "Item 3",
			id: 4,
		},
	];

	const renderItem = () => (
		<TouchableOpacity
			onPress={() => router.push("/emi")}
			className="bg-white rounded-2xl dark:bg-slate-900 p-4 flex-1 m-2 items-center shadow-sm border border-gray-100 dark:border-gray-700"
			activeOpacity={0.7}
		>
			<View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mb-2">
				<IconSymbol
					size={24}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
				/>
			</View>
			<Text className="text-gray-800 font-medium text-center">EMI</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="">
				<View className="p-4">
					<Text variant="headlineLarge">EMI</Text>
				</View>
				<View style={{ flex: 1, paddingHorizontal: 8 }}>
					<ResponsiveGrid
						keyExtractor={(item) => item.id.toString()}
						maxItemsPerColumn={3}
						data={data}
						renderItem={renderItem}
						style={{ gap: 1 }}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
