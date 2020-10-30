import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";

import "./assets/css/style.scss";
import {Header} from "./components/header/Header";
import {HomePage} from "./pages/HomePage";
import {Pools} from "./pages/pools/Pools";
import {ContextProvider} from "./reducer";
import {InitPage} from "./pages/InitPage";
import {StakingBOT} from "./pages/pools/StakingBOT";
import {StakingETH} from "./pages/pools/StakingETH";
import {StakingUSDT} from "./pages/pools/StakingUSDT";
import {StakingMEME} from "./pages/pools/StakingMEME";
import {StakingDEGO} from "./pages/pools/StakingDEGO";
import {StakingDONUT} from "./pages/pools/StakingDONUT";
import {AvailabelArtworks} from "./pages/pools/AvailabelArtworks";
import {AboutPage} from "./pages/AboutPage";

import {AuctionPage, AuctionAccountPage} from "./pages/Auction";
import {
  WorkshopPage,
  WorkshopVoterPage,
  WorkshopArtworkPage,
  WorkshopSubmitPage,
  WorkshopAccountPage
} from "./pages/Workshop";
import {
  ExhibitionHallPage,
  ExhibitionHallPublishPage,
  ExhibitionHallCardPage,
} from "./pages/ExhibitionHall";
import {Footer} from "./components/Footer";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  useEffect(() => {
    const el = document.querySelector(".loader-container");
    if (el) {
      el.remove();
    }
  }, []);

  return (
      <ContextProvider>
        <Web3ReactProvider getLibrary={getLibrary}>

          <Router>
            <InitPage/>
            <Header/>
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>

              <Route exact path="/pools">
                <Pools/>
              </Route>

              <Route path="/staking-eth">
                <StakingETH/>
              </Route>

              <Route path="/staking-usdt">
                <StakingUSDT/>
              </Route>

              <Route path="/staking-bot">
                <StakingBOT/>
              </Route>

              <Route path="/staking-meme">
                <StakingMEME/>
              </Route>

              <Route path="/staking-dego">
                <StakingDEGO/>
              </Route>

              <Route path="/staking-donut">
                <StakingDONUT/>
              </Route>

              <Route exact path="/about" component={AboutPage}/>

              <Route exact path="/workshop" component={WorkshopPage}/>

              <Route exact path="/auction" component={AuctionPage}/>

              <Route
                  exact
                  path="/exhibition-hall"
                  component={ExhibitionHallPage}
              />

            <Route
                  exact
                  path="/exhibition-hall/publish"
                  component={ExhibitionHallPublishPage}
              />

              <Route
                  exact
                  path="/exhibition-hall/:id"
                  component={ExhibitionHallCardPage}
              />

              <Route
                  exact
                  path="/workshop/figures"
                  component={WorkshopVoterPage}
              />

              <Route
                  exact
                  path="/workshop/artwork"
                  component={WorkshopArtworkPage}
              />

              <Route
                  exact
                  path="/workshop/submit"
                  component={WorkshopSubmitPage}
              />

              <Route
                  exact
                  path="/workshop/account"
                  component={WorkshopAccountPage}
              />

              <Route
                  exact
                  path="/auction/account"
                  component={AuctionAccountPage}
              />

              <Route
                  exact
                  path="/pools/available-artworks"
                  component={AvailabelArtworks}
              />
            </Switch>
            <Footer/>
          </Router>
        </Web3ReactProvider>
      </ContextProvider>
  );
}

export default App;
