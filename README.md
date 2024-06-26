# TradeHub

> Status: Developing ⚠️

## Description
A web application that simulates an investment plataform 🚀

## ⚙️Technologies
- [Next.js](https://nextjs.org/docs)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Brapi.dev API](https://brapi.dev/docs)
- [Supabase](https://supabase.com/docs)
- [Next-Auth](https://next-auth.js.org/getting-started/introduction)
- [ChartJS Library](https://www.chartjs.org/docs/latest/)
- [React Icons](https://docs.fontawesome.com/v5/web/use-with/react)
- [React Hooks](https://pt-br.legacy.reactjs.org/docs/hooks-intro.html)
- [Next Router](https://nextjs.org/docs/pages/building-your-application/routing)

## 📱Project Functionalities
### Landing Page
- Landing page which directs the user to Log In or Register.
### Login
- Login screen where it's possible to log in utilizing a name, e-mail and password or log in directly with your Google Account through Next-Auth.
- (Until now, all users access the same account on the Supabase Database)
### Stock Shares
- Carousel with highlighted stock cards, displaying the stocks with highest and lowest price variation at the moment.
- Search input where you can search by the stock's ticket, real state funds or BDR's creating a card with information about the searched stock, having a button that displays more info about the stock with a line graph generated by the ChartJS library, middle button where you can enter the buy menu and a star button where you can click to favorite or unfavorite that specific stock that will be saved or removed from the Watchlist in the My Investments section. 
- Summary that displays some important data about your account, obtained dynamically from the Supabase database.
- Most relevant News sorted from most recent.
- All the stock, real state funds or BDR's data are obtained through requisitions to the brapi.dev API, which only have stocks from the B3(The Brazillian stock exchange).
### My Investments
- Expandable Watchlist that shows the user's favorite stocks, allowing him to delete stocks that are no longer of interest.
- Expandable Transaction History where are displayed all of the user's past transactions(sell or buy), being sorted from the most recent one.
- Highlights that shows the stocks with the highest and lowest price variation at the moment. 
- Most relevant News sorted from most recent.
- Search field that allows the user to filter his stocks by typing.
- The user's stocks are kept in the Supabase database and shown in cards, displaying their current price and price variation, they also have a button that displays more info about that specific stock, a button to open the sell menu and a counter to show the user how many of that stock he has.
### Log Out
- Log out functionality 
### Database
- All application data is kept in a Supabase database, aiming to keep the application functional and dynamic so that the data interacts with each other through calculations, editing, removal and insertion.

## 💻How to Run It?
- [trade-hub-iota.vercel.app](https://trade-hub-iota.vercel.app)

```bash
# Clone this repo
$ git clone linkrepo

# Access the project's folder on your terminal
$ cd tradehub

# Install Next.js on the 14.0.3 version or higher
$ npm install next@14.0.3
# or
$ npm install next@latest

# Run the application
$ npm run dev

# The application will be hosted on the port 3000, access via browser: http://localhost:3000
```

## 🖥️Layouts
- Landing Page
![Landing Page](./tradehub/app/assets/imgs/landingPageScreen.png)
- Login
![Login](./tradehub/app/assets/imgs/loginScreen.png)
- Stock Shares
![Ações da Bolsa](./tradehub/app/assets/imgs/mainPageScreen.png)
- My Investments
![Meus Investimentos](./tradehub/app/assets/imgs/investmentPageScreen.png)
