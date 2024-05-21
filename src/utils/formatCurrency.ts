export function formatCurrency(value: number): string {
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`; // Afficher les millions
    } else if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}K`; // Afficher les milliers
    } else {
        return `$${value.toFixed(2)}`; // Afficher les nombres en dessous de mille avec deux décimales
    }
}
