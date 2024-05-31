## 🚙 Davao Commute Guide
Davao Commute Guide is a final project for an academic course CMSC 186 (Web Services and Service-Oriented Architecture). Full documentation will be iteratively added.

### ⚙️ **Tech Stack**
- Next.JS 14
- TypeScript
- Tailwind
- ShadCN UI
- Google Maps API (Directions)

## Manual

### Generate API Key in Google Console
| Instruction|Image|
|---|---|
|Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project |![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/22ab3681-ae67-4ebf-a6ef-442ecee98cba)|
| Fill out all the necessary information to create the project |   |
| Select your project | ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/a77061f9-d4b7-4c59-b55d-674867beb6bd)|
| Select the `API & Services` |![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/ba3522db-4902-4747-82ec-8cdaa3d9f483) |
| Click the `ENABLE APIS AND SERVICES` button | ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/9f581880-020b-4da2-8009-d67490648a61)|
| Enable the `Places API`, `Maps Javascript API`, and `Directions API` |   |
| After enabling all the necessary APIs, go to  `Credentials`, which can be found in the left navigation tab | ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/3b7069f3-86ec-45bc-9c14-5d3fe68a9c30)|
| Click the item in the API key section |  ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/9bc56210-654e-4b13-8a64-b45e5ec89d90) |
| Copy the API key in the right side of the page. |

### Generating OpenWeather API
| Instruction|Image|
|---|---|
| Go to [OpenWeather API](https://openweathermap.org/) and create an account|![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/88df0eed-fdad-4271-a3d5-024eae4d7036)|
| Proceed `API Keys` tab |   |
| Copy the `default` API Key |   |

### Creating environment
1. Create `.env.local` in the root directory of the repository.
2. Insert `NEXT_PUBLIC_GOOGLE_MAPS_API={your_api_key}` inside the `.env.local` and replace `{your_api_key}` with the api key you copied in the credentials page.
3. Insert `NEXT_PUBLIC_OPEN_WEATHER_API_KEY={your_api_key` inside the `.env.local` and replay `{your_api_key}` with the api key you copied in the Open Weather page.

### Run the project
1. Run the following command to run the project.
```
npm install
npm run dev
```
