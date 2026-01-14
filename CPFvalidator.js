/**
 * Validates if a Brazilian CPF (Tax ID) is mathematically valid.
 * @param {string} cpf - The CPF string (with or without formatting).
 */
function validateCPF(cpf) {
    // Remove non-numeric characters
    cpf = cpf.replace(/[^\d]+/g, '');

    // Check if it has 11 digits or if all digits are the same (invalid cases)
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    // Calculation for the first verification digit
    let sum = 0;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    let remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // Calculation for the second verification digit
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true; // Valid CPF
}

// Testing
console.log(validateCPF("123.456.789-01") ? "Valid ✅" : "Invalid ❌");
