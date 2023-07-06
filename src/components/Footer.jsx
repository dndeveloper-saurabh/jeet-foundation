import React from 'react';
import logoWhite from '../assets/-/media/logos/logolgwhite.svg';
import {useHistory} from "react-router-dom";

export default function Footer() {
  const history = useHistory();
  return (
    <footer>

      <section className="global-footer global-footer--dark" dir="ltr">
        <div className="global-footer__container container">
          <div className="global-footer__logo" lang="en" dir="ltr">
            <a href="/" className="global-footer__logo-link">
              <img src={logoWhite}
                   className="global-footer__logo-image" alt="Bill &amp; Melinda Gates Foundation"
                   srcSet={logoWhite}/> </a>
          </div>

          <div className="global-footer__main-content">
            <div className="global-footer__description" lang="en">
              We are a nonprofit fighting poverty, disease, and inequity around the world.
            </div>

            <nav className="global-footer__main-links global-footer__main-links--mobile" aria-label="Main areas">
              <ul className="global-footer__items">
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/about">About</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/our-work">Our work</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a href="/ideas" className="global-footer__link link">Ideas</a></li>
              </ul>
            </nav>
            <div className="global-footer__social-icons">
              <div className="social-connect-icons">
                <div className="social-connect-icons__icons">
                  <a href="https://twitter.com/gatesfoundation"
                     aria-label="follow Gates Foundation on Twitter" rel="noopener noreferrer"
                     title="follow Gates Foundation on Twitter"
                     className="social-connect-icons__button js-social-follow" target="_blank">
                    <svg className="icon icon--social-twitter icon--32x32" aria-hidden="true"
                         focusable="false">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink"
                           xlinkHref="/home/Areas/GFO/assets/img/svg-sprite.svg?v=834a7c92fa590368c2a649dc4b1ee496ea7122fc#social-twitter">

                      </use>
                    </svg>
                  </a><a href="https://www.facebook.com/gatesfoundation/"
                         aria-label="follow Gates Foundation on Facebook" rel="noopener noreferrer"
                         title="follow Gates Foundation on Facebook"
                         className="social-connect-icons__button js-social-follow" target="_blank">
                  <svg className="icon icon--social-facebook icon--32x32" aria-hidden="true"
                       focusable="false">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink"
                         xlinkHref="/home/Areas/GFO/assets/img/svg-sprite.svg?v=834a7c92fa590368c2a649dc4b1ee496ea7122fc#social-facebook">

                    </use>
                  </svg>
                </a><a href="https://www.linkedin.com/company/bill-&amp;-melinda-gates-foundation/"
                       aria-label="follow Gates Foundation on LinkedIn" rel="noopener noreferrer"
                       title="follow Gates Foundation on LinkedIn"
                       className="social-connect-icons__button js-social-follow" target="_blank">
                  <svg className="icon icon--social-linkedin icon--32x32" aria-hidden="true"
                       focusable="false">
                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                         xlinkHref="/home/Areas/GFO/assets/img/svg-sprite.svg?v=834a7c92fa590368c2a649dc4b1ee496ea7122fc#social-linkedin">

                    </use>
                  </svg>
                </a><a href="https://www.instagram.com/gatesfoundation/"
                       aria-label="follow Gates Foundation on Instagram" rel="noopener noreferrer"
                       title="follow Gates Foundation on Instagram"
                       className="social-connect-icons__button js-social-follow" target="_blank">
                  <svg className="icon icon--social-instagram icon--32x32" aria-hidden="true"
                       focusable="false">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink"
                         xlinkHref="/home/Areas/GFO/assets/img/svg-sprite.svg?v=834a7c92fa590368c2a649dc4b1ee496ea7122fc#social-instagram">

                    </use>
                  </svg>
                </a><a href="https://www.youtube.com/user/GatesFoundation/"
                       aria-label="follow Gates Foundation on YouTube" rel="noopener noreferrer"
                       title="follow Gates Foundation on YouTube"
                       className="social-connect-icons__button js-social-follow" target="_blank">
                  <svg className="icon icon--social-youtube icon--32x32" aria-hidden="true" focusable="false">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink"
                         xlinkHref="/home/Areas/GFO/assets/img/svg-sprite.svg?v=834a7c92fa590368c2a649dc4b1ee496ea7122fc#social-youtube">

                    </use>
                  </svg>
                </a></div>
              </div>

            </div>
            <nav className="global-footer__main-links global-footer__main-links--desktop" aria-label="Main areas">
              <ul className="global-footer__items">
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/about">About</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/our-work">Our work</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a href="/ideas" className="global-footer__link link">Ideas</a></li>
              </ul>
            </nav>
            <nav className="global-footer__contact-links" aria-label="Contact Us">
              <ul className="global-footer__items">
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/about/contact">Contact</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" onClick={(e) => {
                    e.preventDefault();
                    history.push('/admin')
                  }}>Admin Login</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/ideas/media-center">Media Center</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/about/careers">Careers</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" rel="noopener noreferrer"
                     href="https://www.discovergates.org/" target="_blank">Discovery Center</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" rel="noopener noreferrer"
                     href="https://www.gatesphilanthropypartners.org/" target="_blank">Gates Philanthropy
                    Partners</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" rel="noopener noreferrer"
                     href="https://www.gatesfoundation.org/goalkeepers/" target="_blank">Goalkeepers</a>
                </li>
              </ul>
            </nav>
            <nav className="global-footer__legal-links" aria-label="Legal Information">
              <ul className="global-footer__items">
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/about/contact/reporting-scams">Reporting
                    scams</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" rel="noopener noreferrer"
                     href="https://secure.ethicspoint.com/domain/media/en/gui/7589/index.html "
                     target="_blank">Ethics reporting</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/privacy-and-cookies-notice">Privacy &amp;
                    Cookies Notice</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" href="/terms-of-use">Terms of Use</a></li>
                <li className="global-footer__link-item" lang="en" dir="ltr">
                  <a className="global-footer__link link" rel="noopener noreferrer"
                     href="https://www.gatesfoundation.org/brandguidelines" target="_blank">Brand
                    guidelines</a></li>
              </ul>
            </nav>
            <div className="global-footer__copyright">
              <div className="footer-copyright" lang="en">1991-2023 Bill &amp; Melinda Gates Foundation. All
                rights reserved.
              </div>

            </div>
          </div>
        </div>
      </section>

    </footer>
  )
}
