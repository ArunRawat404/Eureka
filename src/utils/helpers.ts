export const calculateDiscountFromCode = async (code: string): Promise<number> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 10.0; // Mock 10% discount
};

export const calculateShippingCost = async (
    method: "standard" | "express",
    subtotal: number
): Promise<number> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return method === "standard" ? 5.99 : 12.99;
};