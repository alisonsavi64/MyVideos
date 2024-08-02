function isOptional(type: string[] | string): boolean {
    return type.includes("undefined");
}

export default function validateInputControllers(input: any, requestForm: any): any {
    const messages = [];
    for (const key in requestForm) {
        let type = requestForm[key];
        if (!Array.isArray(type)) type = [type];
        if (!input.hasOwnProperty(key) && !isOptional(type)) {
            messages.push(`${key} is required`);
            continue;
        }
        const value = input[key];
        if (!type.includes(typeof value))
            messages.push(`${key} must be ${type.join(" or ")}`);
    }
    if (messages.length)
        throw new Error(messages.join(', '));
    return input;
}
