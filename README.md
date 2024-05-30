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
1. Open `console.cloud.google.com` and create a new project
   ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/22ab3681-ae67-4ebf-a6ef-442ecee98cba)
2. Fill out all the necessary information to create the project.
3. Select your project.
![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/a77061f9-d4b7-4c59-b55d-674867beb6bd)
4. Select the `API & Services`.
   ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/ba3522db-4902-4747-82ec-8cdaa3d9f483)
5. Click the `ENABLE APIS AND SERVICES` button.
   ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/9f581880-020b-4da2-8009-d67490648a61)
6. Enable the `Places API`, `Maps Javascript API`, and `Directions API`.
7. After enabling all the necessary APIs, go to  `Credentials`, which can be found in the left navigation tab.
   ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/3b7069f3-86ec-45bc-9c14-5d3fe68a9c30)
8. Click the item in the API key section.
   ![image](https://github.com/10lite/davao-jeepney-guide/assets/85869308/9bc56210-654e-4b13-8a64-b45e5ec89d90)
9. Copy the API key in the right side of the page.

### Creating environment
1. Create `.env.local` in the root directory of the repository.
2. Insert `NEXT_PUBLIC_GOOGLE_MAPS_API={your_api_key}` inside the `.env.local` and replace `{your_api_key}` with the api key you copied in the credentials page.

### Run the project
1. Run the following command to run the project.
```
npm install
npm run dev
```
