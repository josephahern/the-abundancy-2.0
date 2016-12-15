<?php include 'header.php'; ?>

<div id="contact">
    <section class="row clearfix" id="contact-form">
        <div class="bouncing-logo icon-1"></div>
        <div class="bouncing-logo icon-2"></div>
        <div class="bouncing-logo icon-3"></div>
        <div class="column">
            <h1>Contact Us</h1>
            <h2>Let's be friends.</h2>
            <div class="vertical-title">
                <span class="number">01</span>
                <span class="line"></span>
                <span class="text">A Handy Form</span>
            </div>
            <form action="mail.php" method="post" id="contact-us-form">
                <div class="error-overlay">
                    <div class="message">Oops. Missed your email address!</div>
                </div>
                <div class="fields">
                    <div class="left">
                    <span class="input" id="input-name">
					    <input class="input-field" type="text" id="name-input" name="contact_name">
					    <label class="input-label" for="input-10">
                            <span class="input-content">Name</span>
                        </label>
				    </span>
                    <span class="input" id="input-email">
					    <input class="input-field" type="email" id="email-input" name="contact_email">
					    <label class="input-label" for="input-10">
                            <span class="input-content">Email Address</span>
                        </label>
				    </span>
                    <span class="input select">
					    <select class="dropdown" id="input-subject" name="contact_subject">
                            <option value="">Subject</option>
                            <option>General Inquiry</option>
                            <option>New Business</option>
                            <option>Careers</option>
                        </select>
				    </span>
                    <span class="input select">
					    <select class="dropdown" id="input-iama" name="contact_iama">
                            <option value="">I am a</option>
                            <option>Backseat Driver</option>
                            <option>Shower Singer</option>
                            <option>Beer Snob</option>
                            <option>Stamp Collector</option>
                            <option>Early Riser</option>
                            <option>Human Being</option>
                        </select>
				    </span>
                    </div>
                    <div class="right">
                        <div class="success-overlay">
                            <div class="message">
                                <span class="title">Success!</span>
                                <span class="subtitle">Talk to you soon.</span>
                            </div>
                        </div>
                        <textarea name="contact_message" id="contact-message" placeholder="Type message here"></textarea>
                    </div>
                </div>
                <div class="bottom">
                    <input type="submit" value="Submit" class="btn contact submit-btn" id="contact-submit" />
                </div>
            </form>

        </div>
    </section>
    <section class="row" id="careers">
        <div class="column">
            <div class="vertical-title">
                <span class="number">02</span>
                <span class="line"></span>
                <span class="text">Get Paid</span>
            </div>
            <div class="recruiter-box">
                <div class="left">
                    <h2>We've got jobs.</h2>
                    <ul class="openings"></ul>
                </div>
                <div class="right">
                    <div class="top">
                        <address>
                            <span>The Abundancy</span>
                            111 E. Wacker Drive<br />
                            Suite 300<br />
                            Chicago, IL 60601
                        </address>
                        <a href="https://goo.gl/maps/vuXLgEUjv2B2" class="directions" target="_blank">Get Directions</a>
                    </div>
                    <div class="bottom">
                        <hr>
                        <span class="digits-title">Our Digits</span>
                        <span class="digits">312.787.8787</span>
                        <hr>
                        <span class="follow">Follow Us</span>
                        <div class="social">
                            <a href="https://www.linkedin.com/company/10785212" target="_blank" class="linkedin"><span class="icon"></span></a>
                            <a href="https://www.facebook.com/TheAbundancy/" target="_blank" class="facebook"><span class="icon"></span></a>
                            <a href="https://twitter.com/theabundancy" target="_blank" class="twitter"><span class="icon"></span></a>
                            <a href="https://www.instagram.com/theabundancy/" target="_blank" class="instagram"><span class="icon"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include 'footer.php'; ?>