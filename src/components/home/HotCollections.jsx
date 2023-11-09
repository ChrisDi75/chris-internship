import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";



const HotCollections = () => {
  const [cards, setCards] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const owlCarouselModifier = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900:{
        items: 3,
      },
      1200:{
        items: 4,
      },
    },
  };

  async function getCards () {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setCards(data);
    setSkeletonLoading(false);
  }
  
  useEffect(() => {
    getCards();
}, [])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            <div>
              {skeletonLoading? (
                new Array(1).fill(0).map((index) =>(
                  <OwlCarousel loop items={4} nav dots={false} key={index}>
                    <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton width="100%" height="93%" />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton borderRadius={50} height = {50} width={50} />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <h4>
                    <Skeleton height={20} width={20} />
                  </h4>
                </div>
              </div>
                  </OwlCarousel>
                )))
                :
                (<OwlCarousel { ...owlCarouselModifier}>
                  {cards.slice(0,6).map((cards, index) => (
                    <div  key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img src={cards.nftImage} className="lazy img-fluid" alt="" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img className="lazy pp-coll" src={cards.authorImage} alt="" />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{cards.title}</h4>
                          </Link>
                          <span>ERC-{cards.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  </OwlCarousel>
                  )}
              
          </div>
        </div>
      </div>
      </section>
  );
};

export default HotCollections;
