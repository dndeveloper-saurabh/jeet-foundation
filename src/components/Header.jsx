import React from 'react';

import gkhero from '../assets/-/media/gfo/5ideas_articles/articles/20230607-goalkeepers-six-picks-thulile-khanyile/gkhero.jpg';
import spriteSVG from '../assets/Areas/GFO/assets/img/svg-sprite.svg';
import AfricanNigeria from '../assets/-/media/gfo/5ideas_articles/articles/20210423-world-immunization-week-africa/africanigeria_ga14632486_no608384new1600x1000.jpg';
import Vaccine from '../assets/-/media/gfo/5ideas_articles/articles/20230426-hpv-vaccine-access-to-prevent-cervical-cancer-senegal/hero_ideas_hpv-wiw_04262023_1600x1000.jpg';
import Cancer from '../assets/-/media/gfo/5ideas_articles/articles/20230426-hpv-vaccine-access-to-prevent-cervical-cancer-senegal/riccishryockrs_20230418-3_1600x1000.jpg';
import Immunization from '../assets/-/media/gfo/4our-work/programs/global-development/programs_globaldev_immunization_ga16086315_sc614367_1600x1000.jpg';
import Innovation from '../assets/-/media/gfo/5ideas_articles/articles/20230601-maternal-newborn-health-innovation-policy-imnhc-2023/hero_ideas_imnhc_ga1277818_fc142060_06012023.jpg';
import Intelligence from '../assets/-/media/gfo/5ideas_articles/articles/20230521-artificial-intelligence-ai-development-principles/hero_ideas_mark-ai-principles_gettyimages-539454508_05212023_1600x1000.jpg';
import OurRole from '../assets/-/media/gfo/2home/our-role.png';
import HowWeWork from '../assets/-/media/gfo/2home/how-we-work.png';
import OurStory from '../assets/-/media/gfo/2home/our-story.png';
import LogoLG from '../assets/-/media/logos/logolg.svg';

export default function Header() {

  return (
    <header>
      <div className="js-old-browser-modal modal-container">
        <div className="modal js-modal old-browser-modal__modal" id="old-browser-modal">
          <div className="modal__box-holder">
            <div className="modal__overlay" />
            <div className="modal__box">
              <div className="modal__title">
                <button type="button" className="modal__close js-modal-close" aria-label="Close modal">
                  <svg className="icon icon--close" aria-hidden="true" focusable="false" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6569 7.75792L16.2427 6.3437L6.34318 16.2432L7.75739 17.6574L17.6569 7.75792Z" fill="currentColor" />
                    <path d="M16.242 17.6568L17.6562 16.2426L7.75676 6.34314L6.34254 7.75735L16.242 17.6568Z" fill="currentColor" />
                    <path d="M14 14V10H10V14H14Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div className="modal__content">
                <section className="rich-text component">
                  <h3>Unsupported browser detected</h3>
                  <p>
                    Your browser appears to be unsupported. Because of this, portions of the site may
                    not function as intended.
                  </p>
                  <p>
                    Please install a current version of <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>, <a href="https://www.microsoft.com/en-us/edge">Edge</a>, or <a href="https://www.apple.com/safari/">Safari</a> for a better experience.
                  </p>
                  <br className="t-last-br" />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="site-header js-site-header__mount" data-model="{&quot;skipNavigation&quot;:{&quot;href&quot;:&quot;#main-content&quot;,&quot;text&quot;:&quot;Skip to main content&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:null},&quot;logo&quot;:{&quot;title&quot;:&quot;Bill & Melinda Gates Foundation&quot;,&quot;logoSm&quot;:&quot;./-/media/logos/logolg.svg&quot;,&quot;logoLg&quot;:&quot;./-/media/logos/logolg.svg&quot;},&quot;theme&quot;:&quot;base&quot;,&quot;siteName&quot;:null,&quot;sticky&quot;:false,&quot;primaryNav&quot;:[{&quot;title&quot;:&quot;About us&quot;,&quot;subtitle&quot;:&quot;Learn about our origins, how we work, committed grants, careers, and our role in fighting inequities.&quot;,&quot;link&quot;:{&quot;href&quot;:&quot;/about&quot;,&quot;text&quot;:&quot;Learn more about us&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:&quot;en&quot;},&quot;submenu&quot;:[{&quot;header&quot;:&quot;&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/about/our-story&quot;,&quot;text&quot;:&quot;Our story&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/our-role&quot;,&quot;text&quot;:&quot;Our role&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/foundation-faq&quot;,&quot;text&quot;:&quot;Foundation FAQ&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/foundation-fact-sheet&quot;,&quot;text&quot;:&quot;Foundation Fact Sheet&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/leadership&quot;,&quot;text&quot;:&quot;Leadership&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/financials&quot;,&quot;text&quot;:&quot;Financials&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/policies-and-resources&quot;,&quot;text&quot;:&quot;Policies and Resources&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]},{&quot;header&quot;:&quot;&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/about/how-we-work&quot;,&quot;text&quot;:&quot;How we work&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/committed-grants&quot;,&quot;text&quot;:&quot;Committed grants&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/diversity-equity-inclusion&quot;,&quot;text&quot;:&quot;Diversity, equity, and inclusion&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/careers&quot;,&quot;text&quot;:&quot;Careers&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/supporting-our-work&quot;,&quot;text&quot;:&quot;Supporting our work&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/offices&quot;,&quot;text&quot;:&quot;Offices&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/about/contact&quot;,&quot;text&quot;:&quot;Contact&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]}],&quot;feature&quot;:{&quot;type&quot;:&quot;person&quot;,&quot;data&quot;:{&quot;header&quot;:&quot;Leader spotlight&quot;,&quot;name&quot;:&quot;Violaine  Mitchell&quot;,&quot;title&quot;:&quot;Director, Immunization&quot;,&quot;image&quot;:{&quot;srcSet&quot;:&quot;./-/media/gfo/3about/3people/ga11631184_violaine_mitchell_20190314_0001.jpg?w=100&hash=2AF29922088D8668B138D8441C111869 100w,./-/media/gfo/3about/3people/ga11631184_violaine_mitchell_20190314_0001.jpg?w=200&hash=3E45E06030BCAF697986686B2E39DFA2 200w,./-/media/gfo/3about/3people/ga11631184_violaine_mitchell_20190314_0001.jpg?w=3000&hash=5B91EDD647CAB3FE78B7AE0EF53B5A3C 3000w&quot;,&quot;alt&quot;:&quot;Violaine Mitchell&quot;,&quot;sizes&quot;:null,&quot;height&quot;:&quot;2400&quot;,&quot;width&quot;:&quot;3000&quot;},&quot;link&quot;:{&quot;href&quot;:&quot;/about/leadership/violaine-mitchell&quot;,&quot;text&quot;:&quot;Violaine  Mitchell&quot;,&quot;title&quot;:&quot;Violaine  Mitchell&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:null}}}},{&quot;title&quot;:&quot;Our work&quot;,&quot;subtitle&quot;:&quot;Learn how our seven divisions collaborate with partners in over 130 countries to address the issues we care about and drive change.&quot;,&quot;link&quot;:{&quot;href&quot;:&quot;/our-work&quot;,&quot;text&quot;:&quot;Explore our work&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:&quot;en&quot;},&quot;submenu&quot;:[{&quot;header&quot;:&quot;Places&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/our-work/places/africa&quot;,&quot;text&quot;:&quot;Africa&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/china&quot;,&quot;text&quot;:&quot;China&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/east-asia&quot;,&quot;text&quot;:&quot;East Asia&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/europe&quot;,&quot;text&quot;:&quot;Europe&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/india&quot;,&quot;text&quot;:&quot;India&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/middle-east&quot;,&quot;text&quot;:&quot;Middle East&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/places/north-america&quot;,&quot;text&quot;:&quot;North America&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work#places&quot;,&quot;text&quot;:&quot;View all&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]},{&quot;header&quot;:&quot;Program strategies&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/our-work/programs/global-growth-and-opportunity/agricultural-development&quot;,&quot;text&quot;:&quot;Agricultural Development&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/programs/global-growth-and-opportunity/financial-services-for-the-poor&quot;,&quot;text&quot;:&quot;Financial Services for the Poor&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/programs/global-development/polio&quot;,&quot;text&quot;:&quot;Polio&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work/programs/global-growth-and-opportunity/water-sanitation-and-hygiene&quot;,&quot;text&quot;:&quot;Water Sanitation and Hygiene&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/our-work#program_strategies&quot;,&quot;text&quot;:&quot;View all&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]}],&quot;feature&quot;:{&quot;type&quot;:&quot;promo&quot;,&quot;data&quot;:{&quot;description&quot;:&quot;The Gender Equality Division funds some of the most effective advocates and programs working to advance women's economic participation and decision-making power.&quot;,&quot;link&quot;:{&quot;href&quot;:&quot;/our-work/programs/gender-equality/commitment&quot;,&quot;text&quot;:&quot;Spotlight: Gender Equality&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:null},&quot;image&quot;:{&quot;srcSet&quot;:&quot;./-/media/gfo/4our-work/programs/gender-equality/ga16671612_ca625841.jpg?w=270&hash=2CE6A90C4249630DA0B84EF476188D79 270w,./-/media/gfo/4our-work/programs/gender-equality/ga16671612_ca625841.jpg?w=540&hash=53525F8AC1BD241DCBC20F3E7E688514 540w,./-/media/gfo/4our-work/programs/gender-equality/ga16671612_ca625841.jpg?w=2000&hash=52FA919F208B882602B7FC5D613C693F 2000w&quot;,&quot;alt&quot;:&quot;Dr. Womas, a senior researcher, works in the laboratory at the Pasteur Institute in Dakar, Senegal.&quot;,&quot;sizes&quot;:null,&quot;height&quot;:&quot;1333&quot;,&quot;width&quot;:&quot;2000&quot;}}}},{&quot;title&quot;:&quot;Ideas&quot;,&quot;subtitle&quot;:&quot;Read the latest stories, research, interviews, and news from across the Gates Foundation.&quot;,&quot;link&quot;:{&quot;href&quot;:&quot;/ideas&quot;,&quot;text&quot;:&quot;Discover our ideas&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:&quot;en&quot;},&quot;submenu&quot;:[{&quot;header&quot;:&quot;Featured&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/podcast/make-me-care-about&quot;,&quot;text&quot;:&quot;Podcast: Make Me Care About&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas/campaigns/gender-equality&quot;,&quot;text&quot;:&quot;Women’s Economic Power&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas/campaigns/covid-19&quot;,&quot;text&quot;:&quot;COVID-19&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas/media-center&quot;,&quot;text&quot;:&quot;Media Center&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas/speeches&quot;,&quot;text&quot;:&quot;Speeches&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]},{&quot;header&quot;:&quot;Popular topics&quot;,&quot;numberOfColumns&quot;:1,&quot;link&quot;:{&quot;href&quot;:&quot;&quot;,&quot;text&quot;:&quot;&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},&quot;links&quot;:[{&quot;href&quot;:&quot;/ideas?tag=Agriculture#discovermore&quot;,&quot;text&quot;:&quot;Agriculture&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas?tag=Polio#discovermore&quot;,&quot;text&quot;:&quot;Polio&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas?tag=Research%20and%20Development#discovermore&quot;,&quot;text&quot;:&quot;Research and Development&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;},{&quot;href&quot;:&quot;/ideas?tag=Vaccines#discovermore&quot;,&quot;text&quot;:&quot;Vaccines&quot;,&quot;title&quot;:&quot;&quot;,&quot;type&quot;:&quot;internal&quot;,&quot;lang&quot;:&quot;en&quot;}]}],&quot;feature&quot;:{&quot;type&quot;:&quot;promo&quot;,&quot;data&quot;:{&quot;description&quot;:&quot;You’d probably rather not think about poop or where it goes, yet you might after this episode.&quot;,&quot;link&quot;:{&quot;href&quot;:&quot;/podcast/make-me-care-about/episode-1-poop&quot;,&quot;text&quot;:&quot;Make Me Care About...Poop&quot;,&quot;title&quot;:null,&quot;type&quot;:null,&quot;lang&quot;:null},&quot;image&quot;:{&quot;srcSet&quot;:&quot;./-/media/gfo/5ideas_articles/podcast/mmca_social_share_1200x600.png?w=270&hash=C0F322C0FCED83607DA26DC22101F8D8 270w,./-/media/gfo/5ideas_articles/podcast/mmca_social_share_1200x600.png?w=540&hash=1D349EDAB1F959CB8EB963588F34BE6C 540w,./-/media/gfo/5ideas_articles/podcast/mmca_social_share_1200x600.png?w=1260&hash=327C8B2454BAB499AB1A928B8E142688 1260w&quot;,&quot;alt&quot;:&quot;Make Me Care About&quot;,&quot;sizes&quot;:null,&quot;height&quot;:&quot;700&quot;,&quot;width&quot;:&quot;1260&quot;}}}}],&quot;search&quot;:{&quot;label&quot;:&quot;Search&quot;,&quot;searchUrl&quot;:&quot;/search&quot;,&quot;placeholder&quot;:&quot;Search&quot;,&quot;buttonText&quot;:&quot;Search&quot;}}" data-dictionary="{&quot;subMenuBack&quot;:&quot;Back&quot;,&quot;openMenuText&quot;:&quot;&quot;,&quot;closeMenuText&quot;:&quot;&quot;}" lang="en" dir="ltr">
        <div className="site-header__background">
          <div className="site-header__container container site-header__container--mobile"><a className="site-header__skip-nav" href="#main-content">Skip to main content</a>
            <div className="site-header__item-container site-header__item-container--search">
              <div className="site-header__toggle-menu">
                <button type="button" className="btn menu-button site-header__menu-button" aria-expanded="false" aria-haspopup="true" aria-controls="site-header__panel-41"><span /></button>
                <nav className="site-header__navigation site-header__navigation--mobile" aria-label="Primary site navigation" id="site-header__panel-41">
                  <section className="global-nav global-nav--menu global-nav--base">
                    <div className="global-nav__link-wrapper">
                      <button type="button" className="btn global-nav__menu-button js-global-nav__focus-ref" aria-expanded="false" aria-controls="global-nav-42" data-label="About us"><span>About us</span>
                        <svg focusable="false" className="icon icon--chevron-right" aria-hidden="true">
                          <use xlinkHref={spriteSVG} />
                        </svg>
                      </button>
                    </div>
                    <div className="global-nav__sub-menu" id="global-nav-42">
                      <div className="global-nav__container container">
                        <div className="global-nav__back-button-wrapper">
                          <button type="button" className="btn global-nav__back-button arrow-link arrow-link--reversed">
                            <svg focusable="false" className="icon icon--arrow-left" aria-hidden="true">
                              <use xlinkHref={spriteSVG} />
                            </svg>
                            <span>Back</span></button>
                        </div>
                        <div className="global-nav__intro-block">
                          <section className="global-nav-intro"><h2 className="global-nav-intro__title">
                            About us</h2>
                            <div className="global-nav-intro__subtitle">Learn about our origins, how
                              we work, committed grants, careers, and our role in fighting
                              inequities.
                            </div>
                            <div className="global-nav-intro__link"><a href="#" hrefLang="en" className="arrow-link  "><span>Learn more about us</span></a>
                            </div>
                          </section>
                        </div>
                        <div className="global-nav__sub-links">
                          <div className="global-nav__column">
                            <ul className="global-nav__list global-nav__list--1">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Our
                                story</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Our role</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Foundation
                                FAQ</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Foundation Fact Sheet</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Leadership</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Financials</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">Policies and Resources</a></li>
                            </ul>
                          </div>
                          <div className="global-nav__column">
                            <ul className="global-nav__list global-nav__list--1">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="#" hrefLang="en" lang="en">How we
                                work</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/committed-grants" hrefLang="en" lang="en">Committed
                                grants</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/diversity-equity-inclusion" hrefLang="en" lang="en">Diversity, equity, and inclusion</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/careers" hrefLang="en" lang="en">Careers</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/supporting-our-work" hrefLang="en" lang="en">Supporting our work</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/offices" hrefLang="en" lang="en">Offices</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/about/contact" hrefLang="en" lang="en">Contact</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="global-nav global-nav--menu global-nav--base">
                    <div className="global-nav__link-wrapper">
                      <button type="button" className="btn global-nav__menu-button js-global-nav__focus-ref" aria-expanded="false" aria-controls="global-nav-44" data-label="Our work"><span>Our work</span>
                        <svg focusable="false" className="icon icon--chevron-right" aria-hidden="true">
                          <use xlinkHref={spriteSVG} />
                        </svg>
                      </button>
                    </div>
                    <div className="global-nav__sub-menu" id="global-nav-44">
                      <div className="global-nav__container container">
                        <div className="global-nav__back-button-wrapper">
                          <button type="button" className="btn global-nav__back-button arrow-link arrow-link--reversed">
                            <svg focusable="false" className="icon icon--arrow-left" aria-hidden="true">
                              <use xlinkHref={spriteSVG} />
                            </svg>
                            <span>Back</span></button>
                        </div>
                        <div className="global-nav__intro-block">
                          <section className="global-nav-intro"><h2 className="global-nav-intro__title">
                            Our work</h2>
                            <div className="global-nav-intro__subtitle">Learn how our seven
                              divisions collaborate with partners in over 130 countries to
                              address the issues we care about and drive change.
                            </div>
                            <div className="global-nav-intro__link"><a href="/our-work" hrefLang="en" className="arrow-link  "><span>Explore our work</span></a>
                            </div>
                          </section>
                        </div>
                        <div className="global-nav__sub-links">
                          <div className="global-nav__column"><h3 className="global-nav__column-header" id="column-header-45-0">Places</h3>
                            <ul className="global-nav__list global-nav__list--1" aria-labelledby="column-header-45-0">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/africa" hrefLang="en" lang="en">Africa</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/china" hrefLang="en" lang="en">China</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/east-asia" hrefLang="en" lang="en">East Asia</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/europe" hrefLang="en" lang="en">Europe</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/india" hrefLang="en" lang="en">India</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/middle-east" hrefLang="en" lang="en">Middle East</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/places/north-america" hrefLang="en" lang="en">North America</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work#places" hrefLang="en" lang="en">View
                                all</a></li>
                            </ul>
                          </div>
                          <div className="global-nav__column"><h3 className="global-nav__column-header" id="column-header-45-1">Program
                            strategies</h3>
                            <ul className="global-nav__list global-nav__list--1" aria-labelledby="column-header-45-1">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/programs/global-growth-and-opportunity/agricultural-development" hrefLang="en" lang="en">Agricultural Development</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/programs/global-growth-and-opportunity/financial-services-for-the-poor" hrefLang="en" lang="en">Financial Services for the
                                Poor</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/programs/global-development/polio" hrefLang="en" lang="en">Polio</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work/programs/global-growth-and-opportunity/water-sanitation-and-hygiene" hrefLang="en" lang="en">Water Sanitation and Hygiene</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/our-work#program_strategies" hrefLang="en" lang="en">View all</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="global-nav global-nav--menu global-nav--base">
                    <div className="global-nav__link-wrapper">
                      <button type="button" className="btn global-nav__menu-button js-global-nav__focus-ref" aria-expanded="false" aria-controls="global-nav-46" data-label="Ideas">
                        <span>Ideas</span>
                        <svg focusable="false" className="icon icon--chevron-right" aria-hidden="true">
                          <use xlinkHref={spriteSVG} />
                        </svg>
                      </button>
                    </div>
                    <div className="global-nav__sub-menu" id="global-nav-46">
                      <div className="global-nav__container container">
                        <div className="global-nav__back-button-wrapper">
                          <button type="button" className="btn global-nav__back-button arrow-link arrow-link--reversed">
                            <svg focusable="false" className="icon icon--arrow-left" aria-hidden="true">
                              <use xlinkHref={spriteSVG} />
                            </svg>
                            <span>Back</span></button>
                        </div>
                        <div className="global-nav__intro-block">
                          <section className="global-nav-intro"><h2 className="global-nav-intro__title">
                            Ideas</h2>
                            <div className="global-nav-intro__subtitle">Read the latest stories,
                              research, interviews, and news from across the Gates Foundation.
                            </div>
                            <div className="global-nav-intro__link"><a href="/ideas" hrefLang="en" className="arrow-link  "><span>Discover our ideas</span></a>
                            </div>
                          </section>
                        </div>
                        <div className="global-nav__sub-links">
                          <div className="global-nav__column"><h3 className="global-nav__column-header" id="column-header-47-0">
                            Featured</h3>
                            <ul className="global-nav__list global-nav__list--1" aria-labelledby="column-header-47-0">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/podcast/make-me-care-about" hrefLang="en" lang="en">Podcast: Make Me Care About</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas/campaigns/gender-equality" hrefLang="en" lang="en">Women’s Economic Power</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas/campaigns/covid-19" hrefLang="en" lang="en">COVID-19</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas/media-center" hrefLang="en" lang="en">Media
                                Center</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas/speeches" hrefLang="en" lang="en">Speeches</a></li>
                            </ul>
                          </div>
                          <div className="global-nav__column"><h3 className="global-nav__column-header" id="column-header-47-1">Popular
                            topics</h3>
                            <ul className="global-nav__list global-nav__list--1" aria-labelledby="column-header-47-1">
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas?tag=Agriculture#discovermore" hrefLang="en" lang="en">Agriculture</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas?tag=Polio#discovermore" hrefLang="en" lang="en">Polio</a></li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas?tag=Research%20and%20Development#discovermore" hrefLang="en" lang="en">Research and Development</a>
                              </li>
                              <li className="global-nav__item"><a className="global-nav__sub-link link" href="/ideas?tag=Vaccines#discovermore" hrefLang="en" lang="en">Vaccines</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </nav>
              </div>
              <div className="site-header__logo">
                <div className="site-logo"><a href="/" className="site-logo__link ">
                  <picture className="site-logo__image">
                    <source srcSet={LogoLG} media="(min-width: 681px)" />
                    <img src={LogoLG} alt="Bill & Melinda Gates Foundation" />
                  </picture>
                </a><span className="site-logo__title">Bill &amp; Melinda Gates Foundation</span></div>
              </div>
              <div className="site-header__search">
                <div className="search-box js-search-box">
                  <div className="search-box__controls">
                    <button type="button" className="search-box__toggle btn js-search-box-toggle-button" aria-label="Show search input" aria-controls="site-search48" aria-expanded="false">
                      <div className="search-box__label">Search</div>
                      <svg focusable="false" className="icon icon--search icon--24x24" aria-hidden="true">
                        <use xlinkHref={spriteSVG} />
                      </svg>
                      <svg focusable="false" className="icon icon--close icon--24x24" aria-hidden="true">
                        <use xlinkHref={spriteSVG} />
                      </svg>
                    </button>
                  </div>
                  <div className="search-box__dropdown js-search-box-content" id="site-search48">
                    <form action="/search" method="GET" className="sc-form js-search-box-form search-box__form container"><label className="sc-form-item sc-form-item--optional"><input className="sc-form-item__field " aria-label="Search" id="GUID-333" type="search" placeholder="Search" name="q" defaultValue /><span role="alert" className="sc-form-item__error-msg" /></label>
                      <button type="submit" className="search-box__search-button btn btn--primary"><span>Search</span>
                        <svg focusable="false" className="icon icon--search" aria-hidden="true">
                          <use xlinkHref={spriteSVG} />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}
