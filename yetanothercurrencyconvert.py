def convert_currency(amount, rate):
    return amount * rate

def main():
    print("--- Simple Currency Converter ---")
    # Example rates (USD as base)
    rates = {
        "EUR": 0.92,
        "GBP": 0.79,
        "INR": 83.12,
        "JPY": 150.45
    }
    
    amount = float(input("Enter amount in USD: "))
    print("Available currencies: EUR, GBP, INR, JPY")
    target = input("Enter target currency: ").upper()

    if target in rates:
        converted = convert_currency(amount, rates[target])
        print(f"{amount} USD is {converted:.2f} {target}")
    else:
        print("Currency not supported.")

if __name__ == "__main__":
    main()
