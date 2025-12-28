import requests

def check_website(url):
    try:
        response = requests.get(url, timeout=5)
        # 200 means the site is OK
        if response.status_code == 200:
            return f"✅ {url} is online!"
        else:
            return f"⚠️ {url} returned status code: {response.status_code}"
    except requests.exceptions.RequestException:
        return f"❌ {url} appears to be offline or invalid."

if __name__ == "__main__":
    site = input("Enter website URL (with https://): ")
    print(check_website(site))
