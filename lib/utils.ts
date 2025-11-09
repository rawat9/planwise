import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface AmortizationEntry {
    month: string;
    year: number;
    principalPaid: number;
    interestCharged: number;
    balance: number;
}

const round = (v: number) => parseFloat(v.toFixed(2));

/**
 * Generate amortization schedule grouped by year.
 *
 * @param principal Loan principal amount
 * @param interestRate - Annual interest rate (e.g. 0.12 for 12%)
 * @param tenure - in years
 */
export function calculateAmortization(principal: number, interestRate: number, tenure: number) {
    // if (principal <= 0) throw new Error("Principal must be > 0");
    // if (interestRate < 0) throw new Error("Interest Rate must be >= 0");
    // if (tenure <= 0) {
    //     throw new Error("Tenure must be a positive integer");
    // }

    const r = interestRate / 12;

    const result: AmortizationEntry[] = []

    const emi = calculateEMI(principal, interestRate, tenure);
    let balance = principal;

    let m = new Date().getMonth() + 1

    while (balance > 0) {
        const interest = balance * r;
        let principalPaid = emi - interest;

        balance -= principalPaid;

        const currentYear = new Date().getFullYear();

        const entry: AmortizationEntry = {
            month: yearLookup[(m % 12) + 1],
            year: currentYear + Math.floor(m / 12),
            principalPaid: parseFloat(principalPaid.toFixed()),
            interestCharged: parseFloat(interest.toFixed()),
            balance: parseFloat(Math.max(balance, 0).toFixed()),
        };

        result.push(entry);
        m++;
    }

    return result.reduce((acc, entry) => {
        if (!acc[entry.year]) acc[entry.year] = [];
        acc[entry.year].push(entry);
        return acc;
    }, {} as Record<number, AmortizationEntry[]>)
}

/**
 * Calculate EMI (Equated Monthly Installment)
 *
 * @param principal
 * @param interestRate - Annual interest rate (e.g. 0.12 for 12%)
 * @param tenure - in years
 */
export function calculateEMI(principal: number, interestRate: number, tenure: number) {
    const r = interestRate / 12;
    const n = tenure * 12;

    return r === 0
        ? principal / n
        : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

const yearLookup: Record<number, string> = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}
